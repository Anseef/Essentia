import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    const navigation = useNavigation();

    return (
            <SafeAreaView style = {{ flex: 1,backgroundColor: '#fff'}}>
                <LinearGradient colors={['#836cdd', '#f0e6fa']} style={styles.container}>
                    <StatusBar backgroundColor={ '#836cdd' } barStyle = "dark-content"/>
                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={styles.mainText}>Welcome</Text>
                        <Text style={styles.subText}>Essentia, your daily companion for mindful living and holistic well-being.</Text>
                    </View>
                </LinearGradient>
                    <Image style={{width: 430, height: 400,alignSelf:'center',marginTop: 15}} source={require('../../assets/images/berries.png')} />
                    <View style={{alignItems: 'center',marginTop: 40}}>
                        <Pressable style = {[styles.buttonStyle, {backgroundColor: '#836cdd', borderColor: '#836cdd'}]} onPress={()=> navigation.navigate("Login")}>
                            <Text style={[styles.buttonText, {color: '#fff'}]}>Login</Text>
                        </Pressable>
                        <Pressable style={[styles.buttonStyle, { borderColor: '#836cdd' }]} onPress={()=> navigation.navigate("Signup")}>
                            <Text style={[styles.buttonText, {color: '#836cdd'}]}>Sign Up</Text>
                        </Pressable>
                    </View>
            </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 190,
        alignItems: 'center',
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
        padding: 15,
        paddingTop:0
    },
    mainText: {
        fontFamily:"ExtraBold",
        fontSize: 48,
        marginBottom:-30,
        paddingLeft: 20,
        marginTop: 15
    },
    subText: {
        fontFamily: 'SemiBold',
        fontSize: 14,
        color: 'grey',
        padding: 20
    },
    buttonStyle: {
        padding: 12,
        borderRadius: 30,
        marginBottom: 20,
        
        borderWidth: 2,
        width: 250,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Bold',
        fontSize: 16
    }
})

export default Signup
