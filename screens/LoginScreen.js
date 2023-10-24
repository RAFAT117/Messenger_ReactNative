import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { View,TouchableOpacity, Text, TextInput, Button, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStyles from '../Styling/AppStyles'; 


function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigation = useNavigation();

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('@keep_logged_in');
      if(value === 'true') {
        navigation.navigate('Main', { screen: 'Conversations' }); // Automatically navigate if they chose to remain logged in before
      }
    } catch(e) {
      // error reading value
      console.error("Failed to read keep_logged_in status", e);
    }
  }
  
  useEffect(() => {
    checkLoginStatus();
  }, []);
  
  return (
    <View style={AppStyles.container}>
      <TextInput
        style={AppStyles.input}
        placeholder="Email" 
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={AppStyles.input}
        placeholder="Password" 
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <View style={AppStyles.switchContainer}>
<Switch
trackColor={{ false: "#767577", true: "#81b0ff" }}
thumbColor={keepLoggedIn ? "#f5dd4b" : "#f4f3f4"}
onValueChange={() => setKeepLoggedIn(previousState => !previousState)}
value={keepLoggedIn}
/>
<Text> keep me logged in</Text>
</View>

<TouchableOpacity style={AppStyles.loginButton} onPress={() => {
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful login
        if (keepLoggedIn) {
          AsyncStorage.setItem('@keep_logged_in', 'true');
        } else {
          AsyncStorage.removeItem('@keep_logged_in');
        }
        navigation.navigate('Main', { screen: 'Conversations' });
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
          errorMessage = "Incorrect email or password. Try again.";
        }
        
        alert(errorMessage);
      });
  }}>
      <Text style={AppStyles.buttonText}>Login</Text>
      </TouchableOpacity>


  <Text onPress={() => navigation.navigate('Register')}>Don't have an account? Register</Text>
</View>
);
}


export default LoginScreen;
