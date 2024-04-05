import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContent } from '../../components/GlobalDataComponents/AuthProvider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/FontAwesome'
import Logouticon from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome6'

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const { userData, clearToken, setIsLoggedIn } = useContext(AuthContent);
  

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const handleLogOut = async () => {
    try {
      clearToken();
      setIsLoggedIn(false);
      navigation.navigate('Auth', { screen: 'Login' });
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.titleStyle}>Profile</Text>

        <View style={styles.profileImageContainer}>
          <Image source={require('../../assets/images/profile.png')}
            style={styles.profileImage} 
          />
        </View>
        {user && ( // Conditionally render based on user being not null
          <View>
            <Text style={{ fontFamily: 'SemiBold', fontSize: 20, textAlign: 'center', paddingTop: 10, marginBottom: -5}}>{user.name}</Text>
            <Text style={{ fontFamily: 'Medium', fontSize: 16, textAlign: 'center', color: 'grey'}}>{user.email}</Text>
          </View>
        )}

        <View style={styles.userDetailsContainer}>
          {user && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.userDetailBlock}>
                <Text style={styles.userContent}>Age</Text>
                <Text style={styles.userContentText}>{user.age}</Text>
              </View>

              <View style={styles.userDetailBlock}>
                <Text style={styles.userContent}>Height</Text>
                <Text style={styles.userContentText}>{user.height}cm</Text>
              </View>

              <View style={styles.userDetailBlock}>
                <Text style={styles.userContent}>Weight</Text>
                <Text style={styles.userContentText}>{user.weight}kg</Text>
              </View>
            </View>
          )}
        </View>

        <View style={{ backgroundColor: '#f5f5fc', paddingVertical: 10, borderRadius: 20, marginTop: 20}}>
            
            <Pressable onPress={()=>navigation.navigate('Edit Profile')} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 20}}>
                <User style={{paddingLeft: 2}}name='user' size={ 20 }/>
                <Text style={styles.bottomContainerText}>Edit Profile</Text>
              </View>
              <Icon name='arrow-forward-ios' size={ 20 }/>
            </Pressable>

            <Pressable onPress={()=> navigation.navigate('Terms and Conditions')} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 20}}>
                <FontAwesomeIcons style={{paddingLeft: 2}} name='clipboard-check' size={ 20 }/>
                <Text style={styles.bottomContainerText}>Terms & Conditions</Text>
              </View>
              <Icon name='arrow-forward-ios' size={ 20 }/>
            </Pressable>

            <Pressable onPress={()=> navigation.navigate('About Us')} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 20}}>
                <FontAwesomeIcons name='circle-exclamation' size={ 19 }/>
                <Text style={styles.bottomContainerText}>About us</Text>
              </View>
              <Icon name='arrow-forward-ios' size={ 20 }/>
            </Pressable>

            <Pressable onPress={handleLogOut} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 20}}>
                <Logouticon name='log-out' size={ 24 }/>
                <Text style={styles.bottomContainerText}>Logout</Text>
              </View>
              <Icon name='arrow-forward-ios' size={ 20 }/>
            </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = new StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  profileImageContainer: {
    borderRadius: 50,
    marginTop: 10
  },
  profileImage: {
    width: 130,
    height: 130,
    alignSelf:'center',
    marginTop: 15,
    borderRadius: 70
  },
  titleStyle: {
    fontFamily: 'Bold',
    fontSize: 32,
  },
  userDetailsContainer: {
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'space-between'
  },

  userDetailBlock: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#f5f5fc',
    padding: 15,
    borderRadius: 10,
    paddingHorizontal: 30
  },
  userContent: {
    fontFamily: 'SemiBold',
    fontSize: 16,
    paddingBottom: 5
  },
  userContentText: {
    fontFamily: 'Medium',
    fontSize: 15,
    paddingBottom: 5,
    textAlign: 'center'
  },
  bottomContainerText: {
    fontFamily: 'SemiBold',
    fontSize: 17,
    paddingTop: 4
  }
})
export default Profile;