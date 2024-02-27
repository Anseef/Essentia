import axios from 'axios';
import { View, Text, StyleSheet,StatusBar, ScrollView,Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import CalorieCard from '../../components/CalorieCard'
import FoodBlock from '../../components/FoodBlock/FoodBlock'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import IoniIcons from 'react-native-vector-icons/Ionicons'

const FoodSelection = () => {
    
    const [totalCalorie,setTotalCalorie] = useState(0);
    const [trackedItems, setTrackedItems] = useState([])
    const [filteredTrackedFoods, setFilteredTrackedFoods] = useState([]);
    const [todayDate,setTodayDate] = useState(new Date())
    
    //fetch tracked foods from DB
    const fetchTrackedFoods = async () => {
        try {
            const response = await axios.post("http://192.168.205.188:8000/trackedFoods");
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


    //Session for handle the date backward and forward

    const handleBackPress = () => {
        const [year, month, day] = todayDate.split('-').map(Number);
        const previousDate = new Date(year, month - 1, day - 1);
        setTodayDate(formatDate(previousDate));
    };
      
    const handleForwardPress = () => {
        const [year, month, day] = todayDate.split('-').map(Number);
        const nextDate = new Date(year, month - 1, day + 1);
        setTodayDate(formatDate(nextDate));
    };
      
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    return (
        <SafeAreaView style = {styles.container}>
            <StatusBar backgroundColor={ '#836cdf' } />
            <LinearGradient colors={["#836cdd", "#d0cae9" ]} style = { styles.innerDivContainer }>
                <View style = { styles.innerDivContents }>
                    <View style={{ flexDirection: 'row',alignItems: 'baseline',paddingTop: 5}}>
                        <Text style = {[styles.headerDivColor,styles.MiniBoldText]}>Eaten</Text>
                        <Text style = {[{ paddingLeft:5 },styles.headerDivColor,styles.MiniBoldText]}>{ totalCalorie }</Text>
                        <Text style = {[{ fontFamily: 'SemiBold', fontSize: 10},styles.headerDivColor]}>kcal</Text>
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

                    <Pressable onPress={ () => handleBackPress() }>
                        <Text style = {styles.dateBar}>
                            <IoniIcons name='chevron-back' size={ 20 }/>
                        </Text>
                    </Pressable>

                    <Text style={styles.dateBar}>
                        TODAY, 
                        <Text>
                            {new Date(todayDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase()}
                        </Text>
                    </Text>

                    <Pressable onPress={ () => handleForwardPress() }>
                        <Text style = {styles.dateBar}>
                        <IoniIcons name='chevron-forward' size={ 20 }/>
                        </Text>
                    </Pressable>

                </View>

                <ScrollView style={styles.foodSessionContainer} showsVerticalScrollIndicator={false}>
                    <FoodBlock Icon={'free-breakfast'} FoodTime={'Breakfast'} trackedItems={filterTrackedItems('Breakfast')} currentDate = { todayDate } />
                    <FoodBlock Icon={'lunch-dining'} FoodTime={'Lunch'} trackedItems={filterTrackedItems('Lunch')} currentDate = { todayDate }/>
                    <FoodBlock Icon={'dinner-dining'} FoodTime={'Dinner'} trackedItems={filterTrackedItems('Dinner')} currentDate = { todayDate }/>
                    <FoodBlock Icon={'fastfood'} FoodTime={'Snacks'} trackedItems={filterTrackedItems('Snacks')} currentDate = { todayDate }/>
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