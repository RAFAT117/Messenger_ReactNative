import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';



function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput 
        placeholder="Email" 
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput 
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
            navigation.navigate('Conversations');
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

export default LoginScreen;
