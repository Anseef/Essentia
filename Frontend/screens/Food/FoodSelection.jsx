import { View, Text, StyleSheet,StatusBar } from 'react-native'
import React from 'react'
import CalorieCard from '../../components/CalorieCard'
import FoodBlock from '../../components/FoodBlock/FoodBlock'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const FoodSelection = () => {
  return (
    <SafeAreaView style = {styles.container}>
        <StatusBar backgroundColor={ '#836cdf' } />
        <LinearGradient colors={["#836cdd", "#d0cae9" ]} style = { styles.innerDivContainer }>
            <View style = { styles.innerDivContents }>
                <View style={{ flexDirection: 'row',alignItems: 'baseline',paddingTop: 5}}>
                    <Text style = {[styles.headerDivColor,styles.MiniBoldText]}>Eaten</Text>
                    <Text style = {[{ paddingLeft:5 },styles.headerDivColor,styles.MiniBoldText]}>776</Text>
                    <Text style = {[ { fontFamily: 'SemiBold', fontSize: 10},styles.headerDivColor]}>kcal</Text>
                </View>

                <View style = {{ flexDirection: 'row',alignItems: 'baseline',marginTop: -8}}>
                    <Text style = {[styles.highlightText, styles.headerDivColor ]} >2176</Text>
                    <Text style = {[ {fontFamily: 'SemiBold', fontSize: 14 } , styles.headerDivColor]}>kcal left</Text>
                </View>

                <CalorieCard/>

            </View>
        </LinearGradient>

        {/* Main Body outside the upper portion*/}

        <View>
            <View style={ {flexDirection: 'row',justifyContent:'space-between',padding:20} }>
                <Text style = {styles.dateBar}> {"<"} </Text>
                <Text style = {styles.dateBar}> TODAY, <Text>25 JAN</Text></Text> 
                <Text style = {styles.dateBar}> {">"} </Text>
            </View>

            <View style={ styles.foodSessionContainer }>
                <FoodBlock/>
                <FoodBlock/>
                <FoodBlock/>
                <FoodBlock/>
            </View>

        </View>

    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f1f4f8'
    },
    innerDivContainer: {
        width:'100%',
        height:'30%',
        backgroundColor:'#836cdd',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    highlightText: {
        fontFamily:'ExtraBold',
        fontSize:58,
        
    },
    MiniBoldText: {
        fontFamily: 'Bold',
        fontSize: 17
    },
    innerDivContents: {
        paddingLeft: 20,
        paddingRight:20,
    },
    headerDivColor: {
        color: '#cdc6f3'
    },

    // Main Session

    dateBar: {
        fontFamily: 'SemiBold',
    },
    foodSessionContainer: {
        paddingLeft:20,
        paddingRight:20,
        gap: 10,
    }

})

export default FoodSelection