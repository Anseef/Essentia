import axios from 'axios';
import { View, Text, StyleSheet,StatusBar, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import CalorieCard from '../../components/CalorieCard'
import FoodBlock from '../../components/FoodBlock/FoodBlock'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const FoodSelection = () => {
    
    const [totalCalorie,setTotalCalorie] = useState(0);
    const [trackedItems, setTrackedItems] = useState([])
    const [filteredTrackedFoods, setFilteredTrackedFoods] = useState([]);
    const [todayDate,setTodayDate] = useState('')
    
    //fetch tracked foods from DB
    const fetchTrackedFoods = async () => {
        try {
            const response = await axios.post("http://192.168.186.188:8000/trackedFoods");
            setTrackedItems(response.data);
            
        } catch (e) {
            console.log(e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchTrackedFoods();
        }, [])
    );

    //Filtering the foods based on current date and mealtime
    const filterTrackedItems = (foodTime) => {
        return trackedItems.filter(item => item.foodItem.MealTime === foodTime && item.foodItem.date === todayDate);
    };
    useEffect(() => {
        const todayTrackedItem = trackedItems.filter(item => item.foodItem.date === todayDate);
        setFilteredTrackedFoods(todayTrackedItem);
    }, [trackedItems, todayDate]);
    

    const fetchTotalCalorie = (calorie) =>{
        setTotalCalorie(calorie);
    }

    //Fetch date 
    useEffect(()=>{
        const getTodayDate = () => {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            setTodayDate(formattedDate);
        };
        getTodayDate();
    },[])


    return (
        <SafeAreaView style = {styles.container}>
            <StatusBar backgroundColor={ '#836cdf' } />
            <LinearGradient colors={["#836cdd", "#d0cae9" ]} style = { styles.innerDivContainer }>
                <View style = { styles.innerDivContents }>
                    <View style={{ flexDirection: 'row',alignItems: 'baseline',paddingTop: 5}}>
                        <Text style = {[styles.headerDivColor,styles.MiniBoldText]}>Eaten</Text>
                        <Text style = {[{ paddingLeft:5 },styles.headerDivColor,styles.MiniBoldText]}>{ totalCalorie }</Text>
                        <Text style = {[ { fontFamily: 'SemiBold', fontSize: 10},styles.headerDivColor]}>kcal</Text>
                    </View>

                    <View style = {{ flexDirection: 'row',alignItems: 'baseline',marginTop: -8}}>
                        <Text style = {[styles.highlightText, styles.headerDivColor ]} >2176</Text>
                        <Text style = {[ {fontFamily: 'SemiBold', fontSize: 14 } , styles.headerDivColor]}>kcal left</Text>
                    </View>

                    <CalorieCard trackedFoodArray={ filteredTrackedFoods } sendTotalCalorie={ fetchTotalCalorie }/>

                </View>
            </LinearGradient>

            {/* Main Body outside the upper portion */}

            <View>
                <View style={ {flexDirection: 'row',justifyContent:'space-between',padding:20} }>
                    <Text style = {styles.dateBar}> {"<"} </Text>

                    <Text style={styles.dateBar}>
                        TODAY, 
                        <Text>
                            {new Date(todayDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase()}
                        </Text>
                    </Text>

                    <Text style = {styles.dateBar}> {">"} </Text>
                </View>

                <ScrollView style={styles.foodSessionContainer} showsVerticalScrollIndicator={false}>
                    <FoodBlock FoodTime={'Breakfast'} trackedItems={filterTrackedItems('Breakfast')} currentDate = { todayDate } />
                    <FoodBlock FoodTime={'Lunch'} trackedItems={filterTrackedItems('Lunch')} currentDate = { todayDate }/>
                    <FoodBlock FoodTime={'Dinner'} trackedItems={filterTrackedItems('Dinner')} currentDate = { todayDate }/>
                    <FoodBlock FoodTime={'Snacks'} trackedItems={filterTrackedItems('Snacks')} currentDate = { todayDate }/>
                </ScrollView>

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
        height: 460
    }

})

export default FoodSelection