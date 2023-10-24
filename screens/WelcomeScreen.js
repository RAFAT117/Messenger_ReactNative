import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppStyles from '../Styling/AppStyles';  // Adjust the path accordingly


const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Welcome</Text>
      <TouchableOpacity style={AppStyles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={AppStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={AppStyles.registerButton} onPress={() => navigation.navigate('Register')}>
        <Text style={AppStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
export default WelcomeScreen;
