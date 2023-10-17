import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Validera lösenord
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registreringen lyckades
        const user = userCredential.user;
        console.log("User registered:", user);
        // Här kan du eventuellt omdirigera användaren till en annan sida, etc.
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error registering user:", errorCode, errorMessage);
        alert(errorMessage);
      });
};


  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder="Email" 
        onChangeText={setEmail}
        value={email}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password" 
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TextInput 
        style={styles.input}
        placeholder="Confirm Password" 
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Already have an account? Log in</Text>
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

export default RegisterScreen;
