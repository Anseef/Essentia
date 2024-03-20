import { Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import DayRangeSlider from '../../components/AnalyticsComponents/DayRangeSlider';
import LineChartBlock from '../../components/Charts/LineChart';
import PieChartBlock from '../../components/Charts/PieChart';
import axios from 'axios';
import { AuthContent } from '../../components/GlobalDataComponents/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
const FoodAnalytics = ({ onSelectDateRange }) => {

    const { userData, localIP } = useContext(AuthContent);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [totalFat, setTotalFat] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [foodData, setFoodData] = useState([]);
    const [dateRange, setDateRange] = useState('Weekly');
    const [totalCalories, setTotalCalories] = useState(0);

    const [weeklyCalorieData, setWeeklyCalorieData] = useState([]);

    // Function to calculate total calories for the current month
    const calculateTotalCalories = (data) => {
        let totalCalories = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        let totalProtein = 0;
    
        if (data) {
            const currentDate = new Date();
            data.forEach((foodItemArray) => {
                const itemDate = new Date(foodItemArray.foodItem.date);
                if (itemDate.getMonth() === currentDate.getMonth() && itemDate.getFullYear() === currentDate.getFullYear()) {
                    totalCalories += foodItemArray.foodItem.Calories;
                    totalCarbs += foodItemArray.foodItem.Carbohydrates;
                    totalFat += foodItemArray.foodItem.Fat;
                    totalProtein += foodItemArray.foodItem.Protein;
                }
            });
        }
    
        setTotalCalories(Math.round(totalCalories));
        setTotalCarbs(totalCarbs);
        setTotalFat(totalFat);
        setTotalProtein(totalProtein);
    };

    const extractMonthlyWeeklyCalories = (foodData) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
    
        // Find the first and last days of the current month
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
        // Initialize an array to store weekly calorie consumption
        const weeklyCalories = Array(4).fill(0);
    
        // Initialize the start date of each week
        let startDateOfWeek = new Date(firstDayOfMonth);
        let endDateOfWeek = new Date(firstDayOfMonth);
    
        // Calculate the start and end date of each week
        for (let i = 0; i < 4; i++) {
            // Set the end date of the week to be 6 days ahead of the start date
            endDateOfWeek.setDate(startDateOfWeek.getDate() + 6);
    
            // Iterate through foodData to accumulate calories for the current week
            foodData.forEach((foodItem) => {
                const itemDate = new Date(foodItem.foodItem.date);
    
                // Check if the item date falls within the current week
                if (itemDate >= startDateOfWeek && itemDate <= endDateOfWeek) {
                    weeklyCalories[i] += foodItem.foodItem.Calories;
                }
            });
    
            // Move to the next week
            startDateOfWeek.setDate(startDateOfWeek.getDate() + 7);
            endDateOfWeek.setDate(endDateOfWeek.getDate() + 7);
        }
    
        const formattedData = weeklyCalories.map((calories, index) => ({
            value: calories,
            label: `Week ${index + 1}`,
            dataPointText: calories.toString()
        }));
    
        return formattedData;
    };
    

    const handleDateRange = (range) => {
        setDateRange(range)
        onSelectDateRange && onSelectDateRange(range)
    }

    const fetchFoodData = async() => {
        try{
            const requestData = await axios.post(`http://${localIP}:8000/trackedFoods`, { userId: userData?._id });
            setFoodData(requestData.data);
            calculateTotalCalories(requestData.data);
        }catch(e){
            console.log(e);
        }
    }

    const extractDailyCalories = (foodData) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dailyCalories = Array(7).fill(0);

        foodData.forEach((foodItem) => {
            const itemDate = new Date(foodItem.foodItem.date);
            const dayOfWeek = itemDate.getDay();

            dailyCalories[dayOfWeek] += foodItem.foodItem.Calories;
        });

        const formattedData = dailyCalories.map((calories, index) => ({
            value: calories,
            label: daysOfWeek[index],
            dataPointText: calories.toString()
        }));
    
        return formattedData;
    };

    useEffect(()=> {
        setWeeklyCalorieData(extractDailyCalories(foodData));
    },[foodData])

    useFocusEffect(
        React.useCallback(() => {
            fetchFoodData();
        }, [])
    );
    
    useEffect(() => {
        if(dateRange === 'Weekly'){
            setWeeklyCalorieData(extractDailyCalories(foodData));
        }else{
            setWeeklyCalorieData(extractMonthlyWeeklyCalories(foodData));
        }
    },[dateRange])

    return (
        <View>
            <View style={{ paddingTop: 5 }}>
                <Text style={{ fontSize: 20, fontFamily: 'SemiBold', marginBottom: -10}}>Total Calorie intake</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Regular', color: 'grey' }}>Last 30 days</Text>
            </View>

            <View >
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 15}}>
                    <Text style={{ fontSize: 36, fontFamily: 'Bold',marginBottom: -10}}>{ totalCalories }</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Medium', marginBottom: 10, color: 'grey' }}>Kcal</Text>
                </View>
            </View>
            {/* <CalorieCard /> */}
            <PieChartBlock totalCarbs={totalCarbs} totalFat={totalFat} totalProtein={totalProtein} />
            

            <DayRangeSlider onSelectionChange={ handleDateRange }/>

            <View>
                <LineChartBlock weeklyData = { weeklyCalorieData }/>
            </View>
        </View>
    )
}

export default FoodAnalytics