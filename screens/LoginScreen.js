import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';




function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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

      <Button title="Log in" onPress={() => {
        const auth = getAuth();
        
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Inloggningen lyckades
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
  link: {
    marginTop: 15,
    color: '#007BFF'
  }
});


export default LoginScreen;
