import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFirestore, doc, getDoc } from "firebase/firestore";

function SelectFriendScreen({ route, navigation }) {
    const { friends } = route.params;
    const [usernames, setUsernames] = useState([]);
    const [friendName, setFriendName] = useState("");


    useEffect(() => {
        const fetchUsernames = async () => {
            const db = getFirestore();
            let usernamesList = [];

            for (let uid of friends) {
                const userDoc = doc(db, 'users', uid);
                const userData = await getDoc(userDoc);

                if (userData.exists()) {
                    usernamesList.push({
                        uid: uid,
                        username: userData.data().username
                    });
                }
            }

            setUsernames(usernamesList);
        };

        fetchUsernames();
    }, [friends]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList 
                data={usernames}
                keyExtractor={item => item.uid}
                renderItem={({ item }) => (
                    <Text 
                        style={{ padding: 10 }}
                        onPress={() => navigation.navigate('Chat', { friendUID: item.uid })}
                    >
                        {item.username}
                    </Text>
                )}
            />
        </View>
    );
}

export default SelectFriendScreen;
