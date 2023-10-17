import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';


function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
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
      .then(async (userCredential) => {
        // Registreringen lyckades
        const user = userCredential.user;

        // Skriv användardata till Firestore
        const db = getFirestore();
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
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder="Email" 
        onChangeText={setEmail}
        value={email}
      />
       <TextInput 
        style={styles.input}
        placeholder="Name" 
        onChangeText={setName}
        value={name}
      />
       <TextInput 
        style={styles.input}
        placeholder="Username" 
        onChangeText={setUsername}
        value={username}
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
