import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet,  Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { AuthContent } from '../../components/GlobalDataComponents/AuthProvider';

const Login = () => {

  const { setUserToken, setIsLoggedIn } = useContext(AuthContent);

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

    const userLoginData = {
      email: email,
      password: password
    };

    if (email !== "" && password !== "") {
      axios.post("http://192.168.205.188:8888/login-user", userLoginData)
        .then(res => {
          if (res.data.status === 'ok') {
            console.log("Login Successful");
            setUserToken(res.data.data);
            setIsLoggedIn(true);
            navigation.navigate('Essentia');
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={{flexDirection: 'row',gap: 10}}>
        <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0099cc',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;