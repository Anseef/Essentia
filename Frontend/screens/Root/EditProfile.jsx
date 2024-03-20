import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import axios from 'axios'
import { AuthContent } from '../../components/GlobalDataComponents/AuthProvider';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

const EditProfile = () => {
    const navigation = useNavigation();
    const { userData, localIP, setIsUpdated } = useContext(AuthContent);

    let initialName = '';
    if (userData) {
        initialName = userData?.name || '';
    }

    let initialEmail = '';
    if (userData) {
        initialEmail = userData?.email || '';
    }

    let initialAge = 0;
    if (userData) {
        initialAge = userData?.age || 0;
    }

    let initialHeight = 0;
    if (userData) {
        initialHeight = userData?.height || 0;
    }

    let initialWeight = 0;
    if (userData) {
        initialWeight = userData?.weight || 0;
    }

    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [age, setAge] = useState(initialAge);
    const [height, setHeight] = useState(initialHeight);
    const [weight, setWeight] = useState(initialWeight);
    const [error, setError] = useState(null);

    const handleUpdateProfile = async () => {
        if (!name || !email || !age || !height || !weight ) {
        setError('Please fill all required fields.');
        return;
        }
  
        try {
        const userData = {
            _id: userData?._id,
            name: name,
            email: email,
            age: parseInt(age),
            height: parseInt(height),
            weight: parseInt(weight),
            password: userData?.password
        };
    
        // Inserting Habit data to the DB 
        const response = await axios.post(`http://${localIP}:8888/updateUserData`, { userData : userData });

        if(response.data.status === 'ok'){
            setIsUpdated(true);
            navigation.goBack();
        }

        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ position: 'relative' }}>
                <Pressable onPress={()=> navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Icon name='chevron-back-outline' size={ 25 } style={{paddingBottom: 5}}/>
                    <Text style={{ fontFamily: 'Bold', fontSize: 28}}>Edit Profile</Text>
                </Pressable>

                <View>
                    <Text style={{ fontFamily: 'SemiBold', fontSize: 16, paddingVertical: 5}}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        autoCapitalize="none"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <View>
                    <Text style={{ fontFamily: 'SemiBold', fontSize: 16, paddingVertical: 5}}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View>
                    <Text style={{ fontFamily: 'SemiBold', fontSize: 16, paddingVertical: 5}}>Age</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        autoCapitalize="none"
                        value={age.toString()}
                        onChangeText={(text) => setAge(text)}
                    />
                </View>

                <View>
                    <Text style={{ fontFamily: 'SemiBold', fontSize: 16, paddingVertical: 5}}>Height</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Height"
                        autoCapitalize="none"
                        value={height.toString()}
                        onChangeText={(text) => setHeight(text)}
                    />
                </View>

                <View>
                    <Text style={{ fontFamily: 'SemiBold', fontSize: 16, paddingVertical: 5}}>Weight</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Weight"
                        autoCapitalize="none"
                        value={weight.toString()}
                        onChangeText={(text) => setWeight(text)}
                    />
                </View>

            </View>

            {error && <Text>{ error }</Text>}
        
            <Pressable
                style={[styles.buttonStyle, { backgroundColor: '#836cdd', borderColor: '#836cdd' }]}
                onPress={ handleUpdateProfile }
            >
                <Text style={[styles.buttonText, { color: '#fff' }]}>Update</Text>
            </Pressable>


        </View>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    width: '100%',
    height: 60,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
    backgroundColor: '#efeefe',
    fontFamily: 'SemiBold',
    fontSize: 15,
    color: '#73549e',
    borderRadius: 10,
  },
  habitText: {
    fontFamily: 'SemiBold',
    fontSize: 15,
    color: '#5e5a65',
  },
  fieldContainer: {
    padding: 20,
    backgroundColor: '#e8defa',
    marginBottom: 15,
    borderRadius: 15,
    gap: 10
  },
  buttonStyle: {
    padding: 11,
    borderRadius: 10,
    borderWidth: 2,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'SemiBold',
    alignSelf: 'center'
  }

});
