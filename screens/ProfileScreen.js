import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStyles from '../Styling/AppStyles';

function ProfileScreen({ navigation }) { 
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState({});

    // Fetch user and profile data when component mounts
    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        setUser(currentUser);

        // Fetch profile data from Firestore if user is authenticated
        if (currentUser) {
            const db = getFirestore();
            const userDoc = doc(db, 'users', currentUser.uid);
            getDoc(userDoc).then(documentSnapshot => {
                if (documentSnapshot.exists()) {
                    setProfileData(documentSnapshot.data());
                }
            });
        }
    }, []);

    // Handle user logout
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(async () => {
            Alert.alert("Logged out", "You have been logged out successfully!");

            // Remove the choice of staying logged in from local storage
            await AsyncStorage.removeItem('@keep_logged_in');

            navigation.navigate('Welcome');
        }).catch((error) => {
            Alert.alert("Error", "An error occurred while logging out.");
        });
    };
    
    return (
        <View style={AppStyles.container}>
          <Text style={AppStyles.header}>Profile</Text>
          {user && (
            <>
              <Text style={AppStyles.infoText}>Email: {user.email}</Text>
              <Text style={AppStyles.infoText}>Name: {profileData.name}</Text>
              <Text style={AppStyles.infoText}>Username: {profileData.username}</Text>
            </>
          )}
          <TouchableOpacity style={AppStyles.button_logout} onPress={handleLogout}>
                <Text style={AppStyles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
    );
}

export default ProfileScreen;
