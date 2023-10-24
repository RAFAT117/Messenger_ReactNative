// AppStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20

  },

  freinds_container: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    backgroundColor: '#f2f2f2',
    padding: 20

  },

  header: {
    fontSize: 46,
    fontWeight: 'bold',
    marginBottom: 100,
    marginTop: -100,
    color: '#333',
  }, 
  headerText: {
    marginTop: 26,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  }, 

  loginButton: {
    width: '70%', // Button width
    padding: 15,
    backgroundColor: '#3498db',
    marginBottom: 25,
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  registerButton: {
    width: '70%',
    padding: 15,
    backgroundColor: '#9b59b6', // Purple color for Register button
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  f_request_Button: {
    marginTop: 10,
    width: '70%',
    padding: 15,
    backgroundColor: '#6495ED',
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'

  },

  buttonTextDecline: {
    color: '#FFF',
    fontSize: 20

},

buttonTextAccept: {
  color: '#FFF',
  fontSize: 20
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
    },

    noFriendsText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
    },

    friendName: {
      padding: 10,
      fontSize: 20,
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      marginVertical: 5
    },

    listItem: {
      marginTop: 10,
      borderBottomWidth: 1, 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between'
    },

    listItemText: {
      fontSize: 24,
    },

    buttonContainer: {
      marginTop: 10,
      padding: 10, 
      flexDirection: 'row'
    },

    acceptButton: {
      backgroundColor: 'blue',  // Red color for the decline button
      padding: 15,
      borderRadius: 4,
      marginLeft: 10,
      marginRight: 10
    
    },

    declineButton: {
      backgroundColor: 'red',  // Red color for the decline button
    padding: 15,
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10
    },

    infoText: {
      fontSize: 21,
      marginBottom: 10,
      color: '#555'
  },

  button_logout: {
    width: '70%', // Button width
    padding: 15,
    backgroundColor: 'red',
    marginBottom: 60,
    marginTop: 60,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    alignItems: 'center',

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  buttonText: {
      fontSize: 25,
      color: '#FFF' 
  }
});




export default styles;
