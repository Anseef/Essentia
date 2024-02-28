import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, StatusBar } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { AuthContent } from '../../components/GlobalDataComponents/AuthProvider';
import { LinearGradient } from "expo-linear-gradient";

const Login = () => {
  const { setUserToken, setIsLoggedIn } = useContext(AuthContent);

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
    setError('');
    setEmailError(false);
    setPasswordError(false);

    if (!email) {
      setError('Please enter your email.');
      setEmailError(true);
    }

    if(!password) {
      setError('Please enter your password.')
      setPasswordError(true);
    }

    const userLoginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://192.168.205.188:8888/login-user",
        userLoginData
      );

      if (response.data.status === 'ok') {
        console.log("Login Successful");
        setUserToken(response.data.data);
        setIsLoggedIn(true);
        navigation.navigate('Essentia');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <LinearGradient colors={["#bf9cf0", "#d0cae9" ]} style={styles.container}>
      <StatusBar backgroundColor={ '#bf9cf0' } barStyle = "dark-content"/>
      <View style={{ width: '100%' ,alignItems: 'flex-start'}}>
        <Pressable onPress={()=>navigation.goBack()} style = {{marginLeft: -15, marginBottom: 80}}>
          <Ionicons name='chevron-back-outline' size={ 30 }/>
        </Pressable>
      </View>

      <View style={{ justifyContent: 'center', marginBottom: 50}}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subTitle}>Sign in to your account</Text>
      </View>
      
      <View style={{ height: 325 }}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={17} color="#73549e" style={[styles.iconStyle, {marginLeft:-2}]}/>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError && <AntIcon name='exclamationcircle' style={styles.errorIcon} size={ 17 } color={ 'crimson' }/>}
        </View>

        <View style={styles.inputContainer}>
          <FontAwesomeIcons name="lock" size={20} color="#73549e" style={styles.iconStyle}/>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
          />
          {passwordError && <AntIcon name='exclamationcircle' style={styles.errorIcon} size={ 17 } color={ 'crimson' }/> }
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center',marginTop: 150}}>
        <Text style={{fontFamily: 'SemiBold', color: '#30293b'}}>Don't have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#73549e',fontFamily:'SemiBold' }}>Sign Up</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 25,
  },
  title: {
    fontSize: 50,
    fontFamily: 'Bold',
    marginBottom: -10,
    alignSelf: 'center',
    marginTop:30
  },
  subTitle: {
    fontFamily: 'SemiBold',
    alignSelf: 'center',
    fontSize: 16
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 10,
  },
  iconStyle: {
    position: 'absolute',
    zIndex: 1,
    top: 19.5,
    left:14,
  },
  input: {
    width: '100%',
    height: 60,
    padding: 10,
    paddingLeft:40,
    marginBottom: 10,
    backgroundColor: '#e8defa',
    fontFamily: 'SemiBold',
    fontSize: 15,
    color: '#73549e',
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  errorIcon: {
    position: 'absolute',
    top: 19.5,
    right: 15,
  },
  button: {
    backgroundColor: '#ad8df0',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'SemiBold',
  }
});

export default Login;
