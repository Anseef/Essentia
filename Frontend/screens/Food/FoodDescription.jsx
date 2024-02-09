import { View, Text,StyleSheet,TextInput,TouchableOpacity,StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Picker from 'react-native-picker-select'
import * as Progress from 'react-native-progress'
import DividerLine from '../../components/DividerLine/DividerLine'
import NutritionBlock from '../../components/FoodBlock/NutritionBlock'

const FoodDescription = ({ route }) => {
    const fetchedFood  = route.params;
    return (
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#f1f4f8' }}>
            <StatusBar backgroundColor={ '#836cdf' } />
            <View style = {{
                paddingLeft:20,
                paddingRight: 20}}
            > 

                <Text style  = {{ fontFamily: "SemiBold",fontSize:32,color: '#836cdd',marginBottom: -10,paddingTop:5}}>{fetchedFood.foodItem.Name}</Text>
                <Text style = {{ fontFamily: "Medium", fontSize: 13 ,color: '#acaeb3'}}>Appam is a type of thin pancake orginated from South India.</Text>
                
                {/* Quantity */}

                <Text style = { styles.SubHeading }>Quantity</Text>
                    
                <View style = {{flexDirection:'row',justifyContent:'space-between',backgroundColor: '#d9d4f6',borderRadius: 10}}>

                    <TextInput placeholder="1"  keyboardType = 'numeric' maxLength={4} style = {{
                            width: 60,
                            height: 50,
                            backgroundColor:'#d9d4f6',
                            paddingLeft: 20,
                            borderRadius: 5,
                            fontFamily: 'SemiBold',
                            fontSize: 16,
                        }}
                    />
                    
                    <Picker
                        placeholder="Piece"
                        items={[
                            { label: 'Value', value: 'Piece',key:1 },
                            { label: 'Option 2', value: 'option2',key:2 },
                            { label: 'Option 3', value: 'option3',key:3 },
                        ]} 
                        onValueChange={ () => console.log("Value changed")}
                    />

                </View>

                {/* Nutrition Info */}

                <Text style = { styles.SubHeading }>Nutrition Information</Text>

                <View style = { styles.NutritionContainer }>

                    <View style = { styles.NutritionChartContainer }>
                        <View style = { styles.NutritionChartBlock }>
                            <Progress.Circle 
                                progress={0.8}
                                size={75}
                                thickness = { 8 }
                                color = { '#f9cf58'}
                                unfilledColor={ '#f1f4f8'}
                                showsText = { true }
                                borderRadius = { 10 }
                                borderWidth = { 0 }
                                animated = { true } 
                            />
                            <Text style = { styles.progressBarText }>Carbs</Text>
                        </View>
                        
                        <View style = { styles.NutritionChartBlock }>
                            <Progress.Circle 
                                progress={0.36}
                                size={75}
                                thickness = { 8 }
                                showsText = { true }
                                color = { '#31eabf'}
                                unfilledColor={ '#f1f4f8'}
                                borderRadius = { 10 }
                                borderWidth = { 0 }
                                animated = { true } 
                            />
                            <Text style = { styles.progressBarText }>Protein</Text>
                        </View>
                        <View style = { styles.NutritionChartBlock }>
                            <Progress.Circle 
                                progress={0.9}
                                size={75}
                                thickness = { 8 }
                                showsText = { true }
                                color = { '#ff5963'}
                                unfilledColor={ '#f1f4f8'}
                                borderRadius = { 10 }
                                borderWidth = { 0 }
                                animated = { true } 
                            />
                            <Text style = { styles.progressBarText }>Fat</Text>
                        </View>
                    </View>

                    <View>
                        <DividerLine/>
                            <NutritionBlock NutritionValue = { 'Calorie' } Measure = { fetchedFood.foodItem.Calories+' kcal' }/>
                        <DividerLine/>
                            <NutritionBlock NutritionValue = { 'Carbs' } Measure = { fetchedFood.foodItem.Carbohydrates+' g' }/>
                            <NutritionBlock NutritionValue = { 'Fiber' } Measure = { fetchedFood.foodItem.Fiber+' g' }/>
                            <NutritionBlock NutritionValue = { 'Sugar' } Measure = { fetchedFood.foodItem.Sugar+' g' }/>
                        <DividerLine/>
                            <NutritionBlock NutritionValue = { 'Protein' } Measure = { fetchedFood.foodItem.Protein+' g' }/>
                        <DividerLine/>
                            <NutritionBlock NutritionValue = { 'Fat' } Measure = { fetchedFood.foodItem.Fat+' g' }/>
                            <NutritionBlock NutritionValue = { 'Saturated Fat' } Measure = { fetchedFood.foodItem.SaturatedFat+' g' }/>
                        <DividerLine/>
                            <NutritionBlock NutritionValue = { 'Cholesterol' } Measure = { fetchedFood.foodItem.Cholesterol+' mg' }/>
                            <NutritionBlock NutritionValue = { 'Sodium' } Measure = { fetchedFood.foodItem.Sodium+' mg' }/>
                            <NutritionBlock NutritionValue = { 'Potassium' } Measure = { fetchedFood.foodItem.Potassium+' mg' }/>
                    </View>

                </View>
                
                <TouchableOpacity  style={[styles.button]} onPress={() => console.log('Button pressed')}>
                    <Text style={{ color: '#d9d4f6',fontFamily:'SemiBold',fontSize: 14 }}>Done</Text>
                </TouchableOpacity >


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
        paddingTop: 10,
        paddingBottom:10,
        backgroundColor: '#fff',
        borderRadius: 10
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
    progressBarText: {
        fontFamily: 'SemiBold',
        fontSize: 13
    },
    button: {
        zIndex: 1,
        backgroundColor: '#8b71db',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    }
});

export default FoodDescription