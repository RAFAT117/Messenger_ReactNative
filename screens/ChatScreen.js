import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { getAuth } from 'firebase/auth';
import { getFirestore, onSnapshot, arrayUnion, setDoc, doc } from 'firebase/firestore';

function ChatScreen({ route }) {
    const [messages, setMessages] = useState([]);

    const { friendUID } = route.params;
    const auth = getAuth();
    const currentUserUID = auth.currentUser.uid;
    const db = getFirestore();

    

    const chatId = [currentUserUID, friendUID].sort().join('_'); // Compute chatId
    
    // Listen for new messages from Firebase
    useEffect(() => {
        const messagesRef = doc(db, 'chats', chatId);
    
        const unsubscribe = onSnapshot(messagesRef, (documentSnapshot) => {
            if (documentSnapshot.exists()) {
                const firebaseMessages = documentSnapshot.data().messages.map(message => ({
                    ...message,
                    createdAt: message.createdAt.toDate() 
                }));
                setMessages(firebaseMessages.reverse());
            }
        });
    
        return () => unsubscribe();
    }, []);
    
    const onSend = async (newMessages = []) => {
        const message = newMessages[0];
        
        const chatRef = doc(db, 'chats', chatId);
        
        await setDoc(chatRef, {
            messages: arrayUnion({
                ...message,
                user: {
                    ...message.user,
                    _id: currentUserUID 
                }
            })
        }, { merge: true });
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={{
                _id: currentUserUID,
                // Other user properties here
            }}
        />
    );
}

export default ChatScreen;
