import { View, Text, TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import CommonNavBar from '../../components/Navbar/CommonNavBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import CalorieCard from '../../components/CalorieCard'
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from 'react-native-progress'
import SelectedFoods from '../../components/FoodBlock/SelectedFoods'

const FoodDetails = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <CommonNavBar value = { "Breakfast"}/>

        <LinearGradient colors={["#836cdd", "#d0cae9" ]} style = {[ styles.innerDivContainer, styles.shadowProp ]}>
            <View style = {{ flexDirection: 'row'}}>
                <TextInput
                    placeholder="Search Food"
                    style={ styles.searchField }
                />
                 <TouchableOpacity  autoFocus={false} style={ { position: 'absolute',top: 14,left: 12}} onPress={() => console.log('Button pressed')}>
                     <Text style={{ color: '#57636c' }}>.</Text>
                </TouchableOpacity >
            </View>

            <View style = {{ paddingTop: 10,paddingBottom: 15}}>
                <View style = {{ flexDirection: 'row',justifyContent:'space-between',paddingBottom: 10}}>
                    <Text style = { styles.progressBarText } > Daily intake</Text>
                    <Text  style = { styles.progressBarText } >1278/2974kcal</Text>
                </View>

                <Progress.Bar 
                    progress={0.6}
                    width={375}
                    color = { '#836cdd'}
                    unfilledColor={ '#d9d4f6'}
                    height ={ 9 }
                    borderRadius = { 10 }
                    borderWidth = { 0 }
                    animated = { true } 
                />

            </View>

            <View style={{ paddingTop: 10 }}>
                <CalorieCard/>
            </View>
            
        </LinearGradient>

        {/* Main portion */}

        <View style = { styles.selectedFoodContainer }>

            <Text style = { { fontFamily: 'SemiBold', fontSize:14,paddingBottom: 10} }>You have Tracked</Text>

            {/* Food items added */}

            <View style = {{gap: 15}}>
                <SelectedFoods />
                <SelectedFoods />
                <SelectedFoods />
                <SelectedFoods />
            </View>

            <TouchableOpacity  style={[styles.button]} onPress={() => console.log('Button pressed')}>
                <Text style={{ color: '#d9d4f6',fontFamily:'SemiBold',fontSize: 14 }}>Done</Text>
            </TouchableOpacity >

        </View>


    </SafeAreaView>
  )
}

const  styles = StyleSheet.create({

    innerDivContainer: {
        padding: 20,
        width:'100%',
        height:'31%',
        backgroundColor:'#836cdd',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        opacity: 0.95,
    },
    searchField: {
        height: 45,
        width:'100%',
        borderRadius: 24,
        borderWidth: 0,
        backgroundColor: '#d9d4f6',
        paddingLeft: 30,
        paddingRight:15,
        color: '#57636c',
        fontFamily:'Medium'
    },
    progressBarText: {
        fontFamily: 'SemiBold',
        color: '#dcd6f3',
        fontSize: 13
    },

    selectedFoodContainer: {
        padding: 20
    },

    button: {
        zIndex: 1,
        backgroundColor: '#8b71db',
        padding: 11,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    }

})
export default FoodDetails
