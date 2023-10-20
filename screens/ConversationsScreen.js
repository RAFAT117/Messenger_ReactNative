import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { View, Text, Button, FlatList } from 'react-native';

function ConversationsScreen({ navigation }) {
    const [friends, setFriends] = useState([]);
    const [conversations, setConversations] = useState([]);
    const auth = getAuth();
    const db = getFirestore();
    const currentUser = auth.currentUser;

    // Fetch friends for the logged-in user
    useEffect(() => {
        if (currentUser) {
            const userDoc = doc(db, 'users', currentUser.uid);
            getDoc(userDoc).then(documentSnapshot => {
                if (documentSnapshot.exists() && documentSnapshot.data().friends) {
                    setFriends(documentSnapshot.data().friends);
                }
            });
        }
    }, []);

    useEffect(() => {
      const fetchConversations = async () => {
          try {
              // Adjusted the query structure
              const q = query(collection(db, "messages"), where("participants", "array-contains", currentUser.uid));
              const querySnapshot = await getDocs(q);
              const chatData = [];
              querySnapshot.forEach(doc => {
                  chatData.push({ ...doc.data(), id: doc.id });
              });
              console.log("Fetched chat data:", chatData);
              setConversations(chatData);
          } catch (error) {
              console.error("Error fetching chat data:", error);
          }
      }
  
      if (currentUser) fetchConversations();
  }, [currentUser]);
  

    return (
        <View style={{ flex: 1 }}>
            <Button 
                title="New Chat" 
                onPress={() => navigation.navigate('SelectFriend', { friends })}
            />
            {
                conversations.length === 0 ? 
                <Text>No conversations available.</Text> : 
                <FlatList 
                    data={conversations}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <Text 
                          style={{ padding: 10 }}
                          onPress={() => navigation.navigate('ChatScreen', { chatId: item.id })}
                      >
                          Chat with {item.participants.filter(uid => uid !== currentUser.uid)[0]}
                      </Text>
                  )}
              />
          }
      </View>
  );
}

export default ConversationsScreen;

