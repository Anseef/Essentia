import axios from 'axios'
import { View, Text,StyleSheet,TextInput,StatusBar, Pressable,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DividerLine from '../../components/DividerLine/DividerLine'
import NutritionBlock from '../../components/FoodBlock/NutritionBlock'
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import Icon from 'react-native-vector-icons/FontAwesome5'

const FoodDescription = ({ route }) => {

    const navigation = useNavigation();

    const [measure, setMeasure] = useState('1');
    const [ quantity, setQuantity ] = useState(1)
    const [storedQuantity, setStoredQuantity] = useState(route.params?.storedQuantityFromDB ? route.params.storedQuantityFromDB : '1');
    const [foodItem, setFoodItem] = useState(route.params.foodItem);

    const FoodTime = route.params.foodTime;
    const currentDate = route.params.todayDate;

    // ProgressBar values
    const [baseServQuantity,setBaseServQuantity] = useState(foodItem.ServingSize);
    const [initialCarbValue, setInitialCarbValue] = useState(foodItem.Carbohydrates);
    const [initialProteinValue, setInitialProteinValue] = useState(foodItem.Protein);
    const [initialFatValue, setInitialFatValue] = useState(foodItem.Fat);

    const carbProgress = initialCarbValue;
    const proteinProgress = initialProteinValue; 
    const fatProgress = initialFatValue;
    const servQuantity = baseServQuantity;

    useEffect(()=> {
        if(isUpdatedFood){
            setInitialCarbValue(initialCarbValue/storedQuantity);
            setInitialProteinValue(initialProteinValue/storedQuantity);
            setInitialFatValue(initialFatValue/storedQuantity);
            setBaseServQuantity(baseServQuantity/storedQuantity)
        }
    },[])


    //For update the stored values in db
    const isUpdatedFood = route.params?.isUpdatedFood || false;

    const [quantityChanged, setQuantityChanged] = useState(false);

    useEffect(()=>{
        setQuantityChanged(true)
    },[quantity])

    const updateQuantity = () => {
        const updatedFoodItem = { ...foodItem };
        
        if (quantityChanged && quantity !== 0) {
            if (measure === '1') {
                // Multiply all values by the entered number of pieces
                Object.keys(updatedFoodItem).forEach(key => {
                    if (key !== '_id' && key !== 'Name' && key !== 'Unit' && key !== 'Description' && key !== 'ItemType' && key !== 'FoodType') {
                        updatedFoodItem[key] *= quantity / storedQuantity;
                        updatedFoodItem[key] = parseFloat(updatedFoodItem[key].toFixed(2));
                    }
                });
    
                if (quantity !== 1) {
                    setStoredQuantity(quantity);
                }
                setQuantity(0);
            } else if (measure === '2') {
                // Update all values based on the entered grams
                const servingSizeMultiplier = quantity / foodItem.ServingSize;
                setStoredQuantity(quantity);
    
                Object.keys(updatedFoodItem).forEach(key => {
                    if (key !== '_id' && key !== 'Name' && key !== 'Unit' && key !== 'Description' && key !== 'ItemType' && key !== 'FoodType') {
                        updatedFoodItem[key] *= servingSizeMultiplier;
                        updatedFoodItem[key] = parseFloat(updatedFoodItem[key].toFixed(2));
                    }
                });
            } else if (measure === '3' || measure === '4') {
                // Update all values for 'Half' or 'Quarter' based on original serving size
                const servingSizeMultiplier = measure === '3' ? 0.5 : 0.25;
    
                Object.keys(updatedFoodItem).forEach(key => {
                    if (key !== '_id' && key !== 'Name' && key !== 'Unit' && key !== 'Description' && key !== 'ItemType' && key !== 'FoodType') {
                        updatedFoodItem[key] *= servingSizeMultiplier;
                        updatedFoodItem[key] = parseFloat(updatedFoodItem[key].toFixed(2));
                    }
                });
            }
        }
        setFoodItem(updatedFoodItem);
        setQuantityChanged(false);
    };    

    const trackFoodItem = async () => {
        const updatedFoodItem = { ...foodItem, date: currentDate,
            MealTime: FoodTime,
            Quantity: storedQuantity,
            FoodType: foodItem.FoodType,
            SelectedMeasure: measure === '1' ? foodItem.ItemType : 'Gram'
        };

        await axios.post("http://192.168.66.188:8000/tracked", { foodItem: updatedFoodItem })
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    navigation.navigate('FoodDetails',{ FoodTime, currentDate });
                }
            })
            .catch((e) => {
            console.log(e);
            });
    };

    const updateCurrentItem = async () => {

        const updatedFoodItem = { ...foodItem, date: currentDate,
            MealTime: FoodTime,
            Quantity: storedQuantity,
            FoodType: foodItem.FoodType,
            SelectedMeasure: measure === '1' ? foodItem.ItemType : 'Gram'
        };

        await axios.put(`http://192.168.66.188:8000/update/${foodItem._id}`, { foodItem: updatedFoodItem })
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    navigation.navigate('FoodDetails', { FoodTime, currentDate });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleTrackButtonPress = () => {
        if (isUpdatedFood) {
            updateCurrentItem();
        } else {
            trackFoodItem();
        }
    };
  
    return (
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#f1f4f8' }}>
            <StatusBar backgroundColor={ '#836cdf' } />
            <ScrollView style = {{
                paddingLeft:20,
                paddingRight: 20}}
            > 

                <Text style  = {{ fontFamily: "SemiBold",fontSize:32,color: '#836cdd',marginBottom: -10,paddingTop:5}}>{foodItem.Name}</Text>
                <Text style = {{ fontFamily: "Medium", fontSize: 13 ,color: '#acaeb3'}}>{foodItem.Description}</Text>
                {/* Quantity */}

                <Text style = { styles.SubHeading }>Quantity</Text>
                    
                <View>

                    <View style = {{flexDirection:'row',justifyContent:'space-between' ,borderRadius: 10,alignItems:'flex-start' }}>
                        <TextInput defaultValue={ String(storedQuantity) } placeholder='0' keyboardType = 'numeric' maxLength={4} style = {{
                                width: 60, 
                                height: 58,
                                backgroundColor:'#d9d4f6',
                                paddingLeft: 0,
                                borderRadius: 5,
                                fontFamily: 'SemiBold',
                                fontSize: 16,
                                textAlign: 'center',
                            }}
                            onChangeText={ (quan) => { setQuantity(quan) }}
                        />
                        
                        <SelectList 
                            setSelected={(value) => { setMeasure(value) }}
                            data={foodItem.FoodType === 'Side' ?
                                [
                                    { key: '1', value: isUpdatedFood ? foodItem.ItemType + '(' + servQuantity + 'g)' : foodItem.ItemType + '(' + route.params.foodItem.ServingSize + 'g)' },
                                    { key: '2', value: 'Gram' },
                                    { key: '3', value: 'Half' },
                                    { key: '4', value: 'Quarter' }
                                ] :
                                [
                                    { key: '1', value: isUpdatedFood ? foodItem.ItemType + '(' + servQuantity + 'g)' : foodItem.ItemType + '(' + route.params.foodItem.ServingSize + 'g)' },
                                    { key: '2', value: 'Gram' },
                                ]
                            }
                            search={false}
                            fontFamily='SemiBold'
                            defaultOption={{
                                key: '1',
                                value: isUpdatedFood ? foodItem.ItemType + '(' + route.params.foodItem.ServingSize/storedQuantity + 'g)' : foodItem.ItemType + '(' + route.params.foodItem.ServingSize + 'g)'
                            }}
                            save='key'
                            boxStyles={{ borderRadius: 5, borderColor: 'transparent', width: 240, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#d9d4f6', minHeight: 58 }}
                            inputStyles={{ fontSize: 16 }}
                            dropdownStyles={{ borderColor: 'transparent', backgroundColor: '#d9d4f6', borderRadius: 5 }}
                            dropdownTextStyles={{ fontSize: 16 }}
                        />


                        <Pressable 
                            android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }}
                            onPress = {()=> { updateQuantity() }}
                            style={{backgroundColor: '#d9d4f6', borderRadius: 5,width:60,height:'100%',height:58,alignItems: 'center',justifyContent: 'center' }}
                        >
                            <Icon name='calculator' size={ 22 }/>
                        </Pressable>
                    </View>

                </View>

                {/* Nutrition Info */}

                <Text style = { styles.SubHeading }>Nutrition Information</Text>

                <View style = {[styles.NutritionContainer]}>
                    <View style = { styles.NutritionChartContainer }>
                        <View style = { styles.NutritionChartBlock }>
                            <AnimatedProgressWheel 
                                size={75}
                                width={8} 
                                max={100}
                                rounded={true}
                                color={'#f9cf58'}
                                progress={carbProgress}
                                showProgressLabel={true}
                                backgroundColor={'#f1f4f8'}
                                rotation={'-90deg'}
                                showPercentageSymbol={true}
                                labelStyle={styles.progressLabel}
                            />
                            <Text style = { styles.progressBarText }>Carbs</Text>
                        </View>
                        
                        <View style = { styles.NutritionChartBlock }>
                            <AnimatedProgressWheel 
                                size={75}
                                width={8} 
                                max={100}
                                rounded={true}
                                color={'#31eabf'}
                                progress={proteinProgress}
                                showProgressLabel={true}
                                backgroundColor={'#f1f4f8'}
                                rotation={'-90deg'}
                                showPercentageSymbol={true}
                                labelStyle={styles.progressLabel}
                            />
                            <Text style = { styles.progressBarText }>Protein</Text>
                        </View>
                        <View style = { styles.NutritionChartBlock }>
                            <AnimatedProgressWheel 
                                size={75}
                                width={8} 
                                max={100}
                                rounded={true}
                                color={'#ff5963'}
                                progress={fatProgress}
                                showProgressLabel={true}
                                backgroundColor={'#f1f4f8'}
                                rotation={'-90deg'}
                                showPercentageSymbol={true}
                                labelStyle={styles.progressLabel}
                            />
                            <Text style = { styles.progressBarText }>Fat</Text>
                        </View>
                    </View>

                    <View>
                        <DividerLine/>
                            <NutritionBlock NutritionValue = { 'Calorie' } Measure = { foodItem.Calories+' kcal' }/>
                        <DividerLine/>
                            <NutritionBlock NutritionValue = { 'Carbs' } Measure = { foodItem.Carbohydrates+' g' }/>
                            <NutritionBlock NutritionValue = { 'Fiber' } Measure = { foodItem.Fiber+' g' }/>
                            <NutritionBlock NutritionValue = { 'Sugar' } Measure = { foodItem.Sugar+' g' }/>
                        <DividerLine/>
                            <NutritionBlock NutritionValue = { 'Protein' } Measure = { foodItem.Protein+' g' }/>
                        <DividerLine/>
                            <NutritionBlock NutritionValue = { 'Fat' } Measure = { foodItem.Fat+' g' }/>
                            <NutritionBlock NutritionValue = { 'Saturated Fat' } Measure = { foodItem.SaturatedFat+' g' }/>
                        <DividerLine/>
                            <NutritionBlock NutritionValue = { 'Cholesterol' } Measure = { foodItem.Cholesterol+' mg' }/>
                            <NutritionBlock NutritionValue = { 'Sodium' } Measure = { foodItem.Sodium+' mg' }/>
                            <NutritionBlock NutritionValue = { 'Potassium' } Measure = { foodItem.Potassium+' mg' }/>
                    </View>

                </View>

            </ScrollView>
            <View style = {{ backgroundColor: '#f1f4f8', width:'100%',height: 10, paddingLeft: 20,paddingRight: 20}}>
                <Pressable android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }}style={[styles.button]} onPress={() => handleTrackButtonPress()}>
                    <Text style={{ color: '#d9d4f6',fontFamily:'SemiBold',fontSize: 16,alignSelf:'center' }}>Track</Text>
                </Pressable >
            </View>
        </SafeAreaView>
    )
}
const  styles = StyleSheet.create({
    SubHeading: {
        fontFamily: 'SemiBold',
        fontSize: 16,
        color: '#57636c',
        paddingTop:10,
        paddingBottom:10
    },
    NutritionContainer: {
        width:'100%',
        paddingTop: 10,
        paddingBottom:10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom:75
    },
    NutritionChartContainer: {
        padding:10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    NutritionChartBlock: {
        justifyContent:'center',
        alignItems: 'center',
        gap: 7
    },
    progressLabel: {
        marginTop: 3,
        fontFamily: 'Medium',
        fontSize: 17
    },
    button: {
        backgroundColor: '#8b71db',
        padding: 12,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 10,
        zIndex: 1,
        bottom: 10,
        position:'absolute',
        width: '100%'
    }
});

export default FoodDescription