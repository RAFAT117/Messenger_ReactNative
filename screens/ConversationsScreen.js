import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { View, Text, FlatList } from 'react-native';
import { getFirestore, doc, getDoc } from "firebase/firestore";

function ConversationsScreen({ navigation }) {
    const [friendsData, setFriendsData] = useState([]);
    const auth = getAuth();
    const db = getFirestore();
    const currentUser = auth.currentUser;

    useEffect(() => {
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
                        name: friendData.name // assuming the friend's name is stored under "name" in the database
                    });
                }

                setFriendsData(fetchedFriendsData);
            }
        };

        fetchFriendNames();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {
                friendsData.length === 0 ?
                    <Text>No friends available.</Text> :

                    <FlatList
                        data={friendsData}
                        keyExtractor={(item) => item.uid}
                        renderItem={({ item }) => (
                            <View>
                                <Text
                                    style={{ padding: 10 }}
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
