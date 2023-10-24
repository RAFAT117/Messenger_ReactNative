import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStyles from '../Styling/AppStyles'; 


function ProfileScreen({ navigation }) { // 
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        setUser(currentUser);

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

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(async () => {
            // Sign-out successful.
            Alert.alert("Logged out", "You have been logged out successfully!");
    
            // Remove the @keep_logged_in key from AsyncStorage
            await AsyncStorage.removeItem('@keep_logged_in');
            
            navigation.navigate('Welcome');
        }).catch((error) => {
            // An error happened.
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    infoText: {
        fontSize: 18,
        marginVertical: 5,
        color: '#333',
    },
    button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
    },
    buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
    }
    });
    

export default ProfileScreen;

