import { View, Text,StyleSheet,TextInput,StatusBar, Pressable,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Progress from 'react-native-progress'
import DividerLine from '../../components/DividerLine/DividerLine'
import NutritionBlock from '../../components/FoodBlock/NutritionBlock'
import { SelectList } from 'react-native-dropdown-select-list'


const FoodDescription = ({ route }) => {
    const fetchedFood  = route.params;
    return (
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#f1f4f8' }}>
            <StatusBar backgroundColor={ '#836cdf' } />
            <ScrollView style = {{
                paddingLeft:20,
                paddingRight: 20}}
            > 

                <Text style  = {{ fontFamily: "SemiBold",fontSize:32,color: '#836cdd',marginBottom: -10,paddingTop:5}}>{fetchedFood.foodItem.Name}</Text>
                <Text style = {{ fontFamily: "Medium", fontSize: 13 ,color: '#acaeb3'}}>Appam is a type of thin pancake orginated from South India.</Text>
                
                {/* Quantity */}

                <Text style = { styles.SubHeading }>Quantity</Text>
                    
                <View style = {{flexDirection:'row',justifyContent:'space-between' ,borderRadius: 10 }}>

                    <TextInput placeholder='1' keyboardType = 'numeric' maxLength={4} defaultValue={'1'} style = {{
                            width: 60, 
                            height: '100%',
                            backgroundColor:'#d9d4f6',
                            paddingLeft: 0,
                            borderRadius: 5,
                            fontFamily: 'SemiBold',
                            fontSize: 16,
                            textAlign: 'center'
                        }}
                    />
                    
                    <SelectList 
                        setSelected={()=>console.log("Selected")} 
                        data={ [
                            {key:'1', value:'Pieces'},
                            {key:'2', value:'Gram'},
                            ]
                        }
                        search = { false }
                        fontFamily='SemiBold'
                        defaultOption = {{key:'1', value:'Pieces'}}
                        boxStyles={{borderRadius:5, borderColor: 'transparent',width:300,alignItems:'center',justifyContent:'space-between',backgroundColor: '#d9d4f6'}}
                        inputStyles = {{fontSize: 16}}
                        dropdownStyles = {{ borderColor: 'transparent'}}
                        dropdownTextStyles = {{fontSize: 16}}
                    />

                </View>

                {/* Nutrition Info */}

                <Text style = { styles.SubHeading }>Nutrition Information</Text>

                <View style = {[styles.NutritionContainer]}>

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

            </ScrollView>
            <View style = {{ backgroundColor: '#f1f4f8', width:'100%',height: 10, paddingLeft: 20,paddingRight: 20}}>
                <Pressable  style={[styles.button]} onPress={() => console.log('Button pressed')}>
                    <Text style={{ color: '#d9d4f6',fontFamily:'SemiBold',fontSize: 16,alignSelf:'center' }}>Done</Text>
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
    progressBarText: {
        fontFamily: 'SemiBold',
        fontSize: 13
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