import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, query, where, getDocs, getDoc, doc, updateDoc, arrayUnion, arrayRemove, collection } from 'firebase/firestore';
import AppStyles from '../Styling/AppStyles';

function AddFriendScreen() {
    const [searchUsername, setSearchUsername] = useState('');
    const [friendRequestsData, setFriendRequestsData] = useState([]);
    const auth = getAuth();
    const db = getFirestore();
    const currentUser = auth.currentUser;

    // Fetch friend requests for the logged-in user
    useEffect(() => {
        if (currentUser) {
            const userDoc = doc(db, 'users', currentUser.uid);
            getDoc(userDoc).then(documentSnapshot => {
                if (documentSnapshot.exists() && documentSnapshot.data().friendRequests) {
                    const uids = documentSnapshot.data().friendRequests;
                    fetchFriendRequestUsersData(uids);
                }
            });
        }
    }, []);

    // Fetch user data for each friend request UID
    const fetchFriendRequestUsersData = async (uids) => {
        let usersData = [];
        for (let uid of uids) {
            const userDoc = doc(db, 'users', uid);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                usersData.push({
                    uid: uid,
                    username: userData.username
                });
            }
        }
        setFriendRequestsData(usersData);
    };

    // Handle sending friend request
    const handleSendFriendRequest = async () => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("username", "==", searchUsername));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            if (userDoc.id !== currentUser.uid) {
                await updateDoc(doc(db, 'users', userDoc.id), {
                    friendRequests: arrayUnion(currentUser.uid)
                });
                Alert.alert("Success", "Friend request sent!");
            } else {
                Alert.alert("Error", "You cannot send a friend request to yourself.");
            }
        } else {
            Alert.alert("Error", "No user found with that username.");
        }
    };

    return (
        <View style={AppStyles.container}>
            <TextInput
                value={searchUsername}
                onChangeText={setSearchUsername}
                placeholder="Enter username to search"
                style={AppStyles.input}
            />

            <TouchableOpacity style={AppStyles.f_request_Button} onPress={handleSendFriendRequest}>
                <Text style={AppStyles.buttonText}>Send Friend Request</Text>
            </TouchableOpacity>

            <Text style={AppStyles.headerText}>Friend Requests:</Text>

            <FlatList
                data={friendRequestsData}
                keyExtractor={item => item.uid}
                renderItem={({ item }) => (
                    <View style={AppStyles.listItem}>
                        <Text style={AppStyles.listItemText}>{item.username}</Text>
                        <View style={AppStyles.buttonContainer}>
                            <TouchableOpacity
                                style={AppStyles.acceptButton}
                                onPress={async () => {
                                    try {
                                        // Process the friend request acceptance
                                        await updateDoc(doc(db, 'users', currentUser.uid), {
                                            friendRequests: arrayRemove(item.uid),
                                            friends: arrayUnion(item.uid)
                                        });
                                        await updateDoc(doc(db, 'users', item.uid), {
                                            friends: arrayUnion(currentUser.uid)
                                        });

                                        // Update the UI by removing the accepted request
                                        setFriendRequestsData(prevData => prevData.filter(request => request.uid !== item.uid));

                                        Alert.alert(`Accepted friend request from ${item.username}`);
                                    } catch (error) {
                                        console.error("Error accepting friend request:", error);
                                        Alert.alert("Error", "There was an error while processing the friend request.");
                                    }
                                }}>
                                <Text style={AppStyles.buttonTextAccept}>Accept</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={AppStyles.declineButton}
                                onPress={async () => {
                                    try {
                                        // Process the friend request decline
                                        await updateDoc(doc(db, 'users', currentUser.uid), {
                                            friendRequests: arrayRemove(item.uid)
                                        });

                                        // Update the UI by removing the declined request
                                        setFriendRequestsData(prevData => prevData.filter(request => request.uid !== item.uid));

                                        Alert.alert(`Declined friend request from ${item.username}`);
                                    } catch (error) {
                                        Alert.alert("Error", "There was an error while processing the friend request.");
                                    }
                                }}>
                                <Text style={AppStyles.buttonTextDecline}>Decline</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

export default AddFriendScreen;
