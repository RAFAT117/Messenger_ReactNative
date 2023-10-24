import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { View, Text, FlatList } from 'react-native';
import { getFirestore, onSnapshot, doc, getDoc } from 'firebase/firestore';
import AppStyles from '../Styling/AppStyles'; 

function ConversationsScreen({ navigation }) {
    const [friendsData, setFriendsData] = useState([]);
    const auth = getAuth();
    const db = getFirestore();
    const currentUser = auth.currentUser;

    // Fetch the names of friends
    const fetchFriendNames = async () => {
        if (currentUser) {
            const userDoc = doc(db, 'users', currentUser.uid);
            const userData = (await getDoc(userDoc)).data();
            const friendsUIDs = userData.friends || [];
            const fetchedFriendsData = [];

            for (let friendUID of friendsUIDs) {
                const friendDoc = doc(db, 'users', friendUID);
                const friendData = (await getDoc(friendDoc)).data();
                fetchedFriendsData.push({
                    uid: friendUID,
                    name: friendData.name
                });
            }

            setFriendsData(fetchedFriendsData);
        }
    };

    // Set up a snapshot listener to update friends list in real-time
    useEffect(() => {
        const userDoc = doc(db, 'users', currentUser.uid);

        const unsubscribe = onSnapshot(userDoc, () => {
            fetchFriendNames();
        });

        return () => unsubscribe();  // Clean up the listener on unmount

    }, [db, currentUser]);

    return (
        <View style={AppStyles.freinds_container}>
            {
                // Conditional rendering based on whether there are friends or not
                friendsData.length === 0 ?
                <Text style={AppStyles.noFriendsText}>No friends available.</Text> :
                <FlatList
                    data={friendsData}
                    keyExtractor={(item) => item.uid}
                    renderItem={({ item }) => (
                        <View>
                            <Text
                                style={AppStyles.friendName}
                                onPress={() => navigation.navigate('Chat', { friendUID: item.uid })}
                            >
                                {item.name}
                            </Text>
                        </View>
                    )}
                />
            }
        </View>
    );
}

export default ConversationsScreen;
