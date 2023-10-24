import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email" 
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password" 
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <View style={styles.switchContainer}>
<Switch
trackColor={{ false: "#767577", true: "#81b0ff" }}
thumbColor={keepLoggedIn ? "#f5dd4b" : "#f4f3f4"}
onValueChange={() => setKeepLoggedIn(previousState => !previousState)}
value={keepLoggedIn}
/>
<Text>Håll mig inloggad</Text>
</View>
<Button title="Log in" onPress={() => {
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
          errorMessage = "Fel e-post eller lösenord. Försök igen.";
        }
        
        alert(errorMessage);
      });
  }} />

  <Text onPress={() => navigation.navigate('Register')}>Don't have an account? Register</Text>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
padding: 20
},
input: {
width: '100%',
padding: 15,
marginBottom: 10,
borderColor: '#ccc',
borderWidth: 1,
borderRadius: 5
},
switchContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 20
},
link: {
marginTop: 15,
color: '#007BFF'
}
});

export default LoginScreen;
