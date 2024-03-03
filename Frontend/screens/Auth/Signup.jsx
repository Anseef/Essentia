import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, StatusBar } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";

const Signup = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPassError, setConfirmPassError] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidCharacters = /[\x00-\x1F\x7F<>!#$%^&*`{}|\\]/g;
    const consecutiveDots = /\.{2,}/g;

    return email !== '' &&
      !invalidCharacters.test(email) &&
      !consecutiveDots.test(email) &&
      emailRegex.test(email);
  };


  const handleRegister = async () => {
    setError('');
    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);
    setConfirmPassError(false);

    if (!username) {
      setError('Please enter a username.');
      setUsernameError(true);
    }

    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address.');
      setEmailError(true);
    }

    if (!password) {
      setError('Please enter a password.');
      setPasswordError(true);
    }

    if (password != confirmPassword) {
      setError('Passwords do not match.');
      setConfirmPassError(true);
    }

    const passwordRegex = /^(?=.*\W)[a-zA-Z\d\W]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one special character.');
      setPasswordError(true);
    }

    const userData = {
      name: username,
      email,
      password,
    };
    
    if(error === '') {
      try {
        const response = await axios.post("http://192.168.222.188:8888/register", userData);
    
        if (response.data.status === 'ok') {
          navigation.navigate("Login");
        } else {
          setError(response.data.data);
        }
      } catch (error) {
        console.error('Registration error:', error);
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
        <LinearGradient colors={["#bf9cf0", "#d0cae9" ]} style={styles.container}>
          <StatusBar backgroundColor={ '#bf9cf0' } barStyle = "dark-content"/>
          <View style={{ width: '100%' ,alignItems: 'flex-start'}}>
            <Pressable onPress={()=>navigation.goBack()} style = {{marginLeft: -15}}>
              <Ionicons name='chevron-back-outline' size={ 30 }/>
            </Pressable>
          </View>

          <Text style={styles.title}>Create your Account</Text>
          <View style={styles.inputContainer}>
            <FontAwesomeIcons name="user" size={20} color="#73549e" style={styles.iconStyle}/>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#73549e"
              autoCapitalize="none"
              onChangeText={(text) => setUsername(text)}
            />
            {usernameError && <AntIcon name='exclamationcircle' style={styles.errorIcon} size={ 17 } color={ 'crimson' }/>}
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={17} color="#73549e" style={[styles.iconStyle, {marginLeft:-2}]}/>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#73549e"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            {emailError && <AntIcon name='exclamationcircle' style={styles.errorIcon} size={ 17 } color={ 'crimson' }/>}
          </View>

          <View style={styles.inputContainer}>
            <FontAwesomeIcons name="lock" size={20} color="#73549e" style={styles.iconStyle}/>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#73549e"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
            {passwordError && <AntIcon name='exclamationcircle' style={styles.errorIcon} size={ 17 } color={ 'crimson' }/>}
          </View>

          <View style={styles.inputContainer}>
            <FontAwesomeIcons name="lock" size={20} color="#73549e" style={styles.iconStyle}/>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#73549e"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) => setConfirmPassword(text)}
            />
            {confirmPassError && <AntIcon name='exclamationcircle' style={styles.errorIcon} size={ 17 } color={ 'crimson' }/>}
          </View>

          <View style={{ width: '100%'}}>
            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>

            <View style={{flexDirection: 'row', justifyContent: 'center',marginTop: 150}}>
              <Text style={{fontFamily: 'SemiBold', color: '#30293b'}}>Already have an account? </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#73549e',fontFamily:'SemiBold' }}>Login</Text>
              </Pressable>
            </View>

          </View>

      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontFamily: 'Bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginTop:60
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 10
  },
  iconStyle: {
    position: 'absolute',
    zIndex: 1,
    top: 19.5,
    left:14,
  },
  errorIcon: {
    position: 'absolute',
    top: 19.5,
    right: 15,
  },
  input: {
    height: 60,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    paddingLeft:40,
    marginBottom: 10,
    backgroundColor: '#e8defa',
    fontFamily: 'SemiBold',
    fontSize: 15,
    color: '#73549e'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ad8df0',
    padding: 15,
    borderRadius:10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontFamily:'SemiBold'
  }
});

export default Signup;
