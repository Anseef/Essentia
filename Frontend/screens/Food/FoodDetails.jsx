import axios from 'axios';
import { View, Text, TextInput,StyleSheet,ScrollView, Pressable,StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import CalorieCard from '../../components/CalorieCard'
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from 'react-native-progress'
import SelectedFoods from '../../components/FoodBlock/SelectedFoods'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons'

const FoodDetails = ({ route }) => {
    
    const foodTime = route.params?.FoodTime;
    const todayDate = route.params?.currentDate;

    const [dataset, setDataSet] = useState([]);
    const [food, setFood] = useState('');
    const [trackedFoods, setTrackedFoods] = useState([]);
    const [filteredTrackedFoods, setFilteredTrackedFoods] = useState([]);
    const [totalCalorie, setTotalCalorie] = useState(0);
    
    const navigation = useNavigation();
    
    //Fetch food data from backend
    
    const fetchData = async () => {
        try {
            const response = await axios.post("http://192.168.205.188:8000/data", { food });
            setDataSet(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    
    const fetchTrackedFoods = async () => {
        try {
            const response = await axios.post("http://192.168.205.188:8000/trackedFoods");
            setTrackedFoods(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    //Fetch Tracked food based on the food time 
    useFocusEffect(
        React.useCallback(() => {
            fetchTrackedFoods();
        }, [])
    );

    const fetchTotalCalorie = (calorie) => {
        setTotalCalorie(calorie);
    }

    // Filtering Tracked Foods based on the meal time and date

    useEffect(() => {
        const filteredFoods = trackedFoods.filter((foodItemList) => {
            return (
                foodItemList.foodItem.date === todayDate &&
                foodItemList.foodItem.MealTime === foodTime
            );
        });
        setFilteredTrackedFoods(filteredFoods);
    }, [trackedFoods, foodTime]);

    // Remove food item from the array

    const handleRemoveFoodItem = async (itemToRemove) => {
        try {
            await axios.delete(`http://192.168.205.188:8000/tracked/${itemToRemove._id}`);

            const updatedFilteredFoods = filteredTrackedFoods.filter((item) => item.foodItem._id !== itemToRemove._id);
            setFilteredTrackedFoods(updatedFilteredFoods);
        } catch (error) {
            console.log(error);
        }
    };
    
    //Progressbar Progression

    const maxDailyIntake = 2974;
    const progressPercentage = (totalCalorie / maxDailyIntake);
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
             <StatusBar backgroundColor={ '#836cdf' } />
                <View style={{ flexDirection: 'row', backgroundColor: '#836cdd', padding:20,paddingTop: 0 }}>
                    <TextInput
                        placeholder="Search Food"
                        style={styles.searchField}
                        onChangeText={(text) => { 
                            setFood(text)
                            fetchData()
                         }}
                        value = { food }
                    />
                    {food !== '' &&
                        <Pressable
                            autoFocus={false}
                            style={{ alignSelf:'center', right: 35 }}
                            onPress={() => {
                                setFood('');
                            }}
                        >
                            <IonIcons name='close' size={ 20 }/>
                        </Pressable>
                    }
                </View>
            { food === '' ? (
                <View>
                    <LinearGradient colors={["#836cdd", "#d0cae9" ]} style = {[ styles.innerDivContainer, styles.shadowProp ]}>
                        <View style = {{paddingBottom: 8}}>
                            <View style = {{ flexDirection: 'row',justifyContent:'space-between',paddingBottom: 10}}>
                                <Text style = { styles.progressBarText } > Daily intake</Text>
                                <Text  style = { styles.progressBarText } >{ totalCalorie }/2974kcal</Text>
                            </View>

                            <Progress.Bar 
                                progress={progressPercentage}
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
                            <CalorieCard trackedFoodArray = { filteredTrackedFoods } sendTotalCalorie={ fetchTotalCalorie }/>
                        </View>
                            
                    </LinearGradient>

                    <View style = { styles.selectedFoodContainer }>

                        <Text style = { { fontFamily: 'SemiBold', fontSize:14,paddingBottom: 10} }>You have Tracked</Text>

                        <ScrollView style={{ height: 420 }} showsVerticalScrollIndicator={false}>
                            {filteredTrackedFoods.length !== 0 ? (
                                filteredTrackedFoods.map((foodItem, index) => (
                                <SelectedFoods key={index} foodItemArray={foodItem} onRemove={handleRemoveFoodItem}/>
                                ))
                            ) : (
                                <Text style = {{ fontFamily: 'Regular',fontSize: 16, alignSelf:'center', marginTop: 100}}>You haven't tracked any food yet</Text>
                            )}
                        </ScrollView>

                        <Pressable android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }} style={[styles.button]} onPress={ () => { navigation.navigate('FoodSelection') }}>
                            <Text style={{ color: '#d9d4f6',fontFamily:'SemiBold',fontSize: 14 }} >Done</Text>
                        </Pressable >
                    </View>
                </View>
                ):
                (<View style= { { flex: 1 }}>
                    <ScrollView style={{ width:'100%',height:'100%',padding: 20 }}>
                    <Text style = { { fontFamily: 'SemiBold', fontSize:13,paddingBottom: 10, color: '#836cdd'} }>RESULTS</Text>
                    {dataset.map((foodItem, index) => (
                        <Pressable android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }} key={index} onPress = { () => { setFood('') ; navigation.navigate('FoodDescription',  { foodItem,foodTime,todayDate }) }} style = { styles.foodItemContainer }>
                        
                            <View >
                                <Text style = {{ fontFamily: 'SemiBold', fontSize:15 }}>{foodItem.Name}</Text>
                                <Text style = {{ fontFamily: 'Regular', fontSize:12 }}>{foodItem.Calories} kcal</Text>
                                <Text style = {{ fontFamily: 'Regular', fontSize:12 }}>{foodItem.ServingSize}g</Text>
                            </View>

                        </Pressable>
                    ))}
                    </ScrollView>
                </View>)
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    innerDivContainer: {
        paddingTop:0,
        padding: 20,
        width:'100%',
        height:'23%',
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
        paddingLeft: 15,
        paddingRight:15,
        color: '#57636c',
        fontFamily:'SemiBold',
        position: 'relative'
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
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    foodItemContainer: {
        backgroundColor: '#dcd6f3',
        padding: 12,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:15,
    }

})
export default FoodDetails
