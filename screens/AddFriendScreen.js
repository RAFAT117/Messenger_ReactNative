import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, query, where, getDocs, getDoc, collection, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';


function AddFriendScreen() {
  const [searchUsername, setSearchUsername] = useState('');
  const [friendRequestsData, setFriendRequestsData] = useState([]);  // array to store user data of friend requests
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;

  // Fetch friend requests for the logged-in user
  useEffect(() => {
      if (currentUser) {
          const userDoc = doc(db, 'users', currentUser.uid);
          getDoc(userDoc).then(documentSnapshot => {
              if (documentSnapshot.exists() && documentSnapshot.data().friendRequests) {
                  const uids = documentSnapshot.data().friendRequests;  // this is an array of UIDs
                  fetchFriendRequestUsersData(uids);
              }
          });
      }
  }, []);

  const fetchFriendRequestUsersData = async (uids) => {
      let usersData = [];
      for(let uid of uids) {
          const userDoc = doc(db, 'users', uid);
          const userSnapshot = await getDoc(userDoc);
          if(userSnapshot.exists()) {
              const userData = userSnapshot.data();
              usersData.push({
                  uid: uid,
                  username: userData.username  // or any other data you need
              });
          }
      }
      setFriendRequestsData(usersData);
  }

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
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput 
                value={searchUsername}
                onChangeText={setSearchUsername}
                placeholder="Enter username to search"
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Button title="Send Friend Request" onPress={handleSendFriendRequest} />

            <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>Friend Requests:</Text>
            
            <FlatList 
     data={friendRequestsData}
     keyExtractor={item => item.uid}
     renderItem={({ item }) => (
         <View style={{ padding: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
             <Text>{item.username}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Button 
                     title="Accept"
                     onPress={async () => { 
                         try {
                             // Remove UID from friendRequests of current user
                             await updateDoc(doc(db, 'users', currentUser.uid), {
                                 friendRequests: arrayRemove(item.uid) 
                             });
                
                        // Add UID to friends of current user
                        await updateDoc(doc(db, 'users', currentUser.uid), {
                            friends: arrayUnion(item.uid) 
                        });
                
                        // Add currentUser.uid to friends of the user who sent the request
                        await updateDoc(doc(db, 'users', item.uid), {
                            friends: arrayUnion(currentUser.uid) 
                        });

                         // Update the local UI by filtering out the accepted request
                      setFriendRequestsData(prevData => prevData.filter(request => request.uid !== item.uid));

                
                        Alert.alert(`Accepted friend request from ${item.username}`);
                      } catch (error) {
                          console.error("Error accepting friend request:", error);
                          Alert.alert("Error", "There was an error while processing the friend request.");
                      }
                  }}
              />
                <Button 
                    title="Decline"
                    color="red"
                    onPress={async () => { 
                      try {
                          // Remove UID from friendRequests of current user
                          await updateDoc(doc(db, 'users', currentUser.uid), {
                              friendRequests: arrayRemove(item.uid)
                          });
                
                            // Update the local UI by filtering out the declined request
                            setFriendRequestsData(prevData => prevData.filter(request => request.uid !== item.uid));
                            
                            Alert.alert(`Declined friend request from ${item.username}`);
                        } catch (error) {
                            Alert.alert("Error", "There was an error while processing the friend request.");
                        }
                    }}
                />
                
            </View>
        </View>
    )}
/>

        </View>
    );
}

export default AddFriendScreen;
