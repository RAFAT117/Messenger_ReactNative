import React, { useState } from 'react';
import { View, Text,TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query,where,getDocs, doc, setDoc } from 'firebase/firestore';
import AppStyles from '../Styling/AppStyles'; 


function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Check if email is valid
const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

// Check if password is valid
const isValidPassword = (password) => {
  return password.length >= 6;
};

  const handleRegister = async () => {
    // Validate password
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

     // Validate password
  if (!isValidPassword(password)) {
    alert('Password should be at least 6 characters long.');
    return;
  }

   // Validate email
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
};
  
    // Check if the username is already taken
    const db = getFirestore();
    const usernameQuery = query(collection(db, 'users'), where('username', '==', username));
    const usernameSnapshot = await getDocs(usernameQuery);
  
    if (!usernameSnapshot.empty) {
      alert('This username is already taken. Please choose another.');
      return;
    }
  
    const auth = getAuth();
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Registration succeeded
        const user = userCredential.user;
  
        // Write user data to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: email,
          name: name,
          username: username
        });
  
        console.log("User registered:", user);
        navigation.navigate('Main', { screen: 'Conversations' });
  
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error registering user:", errorCode, errorMessage);
        alert(errorMessage);
      });
  };
  


  return (
    <View style={AppStyles.container}>
      <TextInput 
        style={AppStyles.input}
        placeholder="Email" 
        onChangeText={setEmail}
        value={email}
      />
       <TextInput 
        style={AppStyles.input}
        placeholder="Name" 
        onChangeText={setName}
        value={name}
      />
       <TextInput 
        style={AppStyles.input}
        placeholder="Username" 
        onChangeText={setUsername}
        value={username}
      />
      <TextInput 
        style={AppStyles.input}
        placeholder="Password" 
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TextInput 
        style={AppStyles.input}
        placeholder="Confirm Password" 
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

<TouchableOpacity style={AppStyles.registerButton} onPress={handleRegister}>
                <Text style={AppStyles.buttonText}>Register</Text>
                </TouchableOpacity>

      <Text style={AppStyles.link} onPress={() => navigation.navigate('Login')}>Already have an account? Log in</Text>
    </View>
  );
};

export default RegisterScreen;
