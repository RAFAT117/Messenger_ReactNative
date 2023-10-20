import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';

function ChatScreen({ route }) {
    const [messages, setMessages] = useState([]);

    const { friendUID } = route.params;
    const auth = getAuth();
    const currentUserUID = auth.currentUser.uid;
    const db = getFirestore();

    // Listen for new messages from Firebase
    useEffect(() => {
        const messagesRef = collection(db, 'messages');
        const q = query(
            messagesRef,
            where('chatId', '==', [currentUserUID, friendUID].sort().join('_')),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const firebaseMessages = snapshot.docs.map(doc => ({
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate() // Convert Firebase timestamp to JavaScript Date object
            }));
            setMessages(firebaseMessages);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const onSend = async (newMessages = []) => {
        const message = newMessages[0];
        const messagesRef = collection(db, 'messages');
        await addDoc(messagesRef, {
            ...message,
            chatId: [currentUserUID, friendUID].sort().join('_'),
            user: {
                ...message.user,
                _id: currentUserUID // Set current user's UID
            }
        });
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={{
                _id: currentUserUID,
                // You can add additional user properties like name, avatar, etc.
            }}
        />
    );
}

export default ChatScreen;
