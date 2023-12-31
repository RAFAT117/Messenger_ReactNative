import React from 'react';
import { initializeApp } from "firebase/app";
import firebaseConfig from "./screens/firebaseConfig";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ConversationsScreen from './screens/ConversationsScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddFriendScreen from './screens/AddFriendScreen';
import WelcomeScreen from './screens/WelcomeScreen';

// Initialize Firebase with the given config
const firebaseApp = initializeApp(firebaseConfig);

// Create a stack navigator for screen transitions
const Stack = createStackNavigator();

// Create a bottom tab navigator for the main app interface
const Tab = createBottomTabNavigator();

// Define the structure for the bottom tabs
function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Friends" 
        component={ConversationsScreen}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="AddFriend" 
        component={AddFriendScreen}
        options={{
          tabBarLabel: 'Add Friend',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main app component with the navigation structure
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
