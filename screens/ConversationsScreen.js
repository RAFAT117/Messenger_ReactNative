import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ConversationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Conversations Screen</Text>
      <Button 
        title="Go to Chat" 
        onPress={() => navigation.navigate('Chat')} 
      />
    </View>
  );
}
