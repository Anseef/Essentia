import { ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import DayRangeSlider from '../../components/AnalyticsComponents/DayRangeSlider';
import LineChartBlock from '../../components/Charts/LineChart';
import PieChartBlock from '../../components/Charts/PieChart';
const FoodAnalytics = ({ onSelectDateRange }) => {

    const [dateRange, setDateRange] = useState('Weekly');
    const handleDateRange = (range) => {
        setDateRange(range)
        onSelectDateRange && onSelectDateRange(range)
    }

    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
            <View style={{ paddingTop: 5 }}>
                <Text style={{ fontSize: 20, fontFamily: 'SemiBold', marginBottom: -10}}>Total Calorie intake</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Regular', color: 'grey' }}>Last 30 days</Text>
            </View>

            <View >
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 15}}>
                    <Text style={{ fontSize: 36, fontFamily: 'Bold',marginBottom: -10}}>17400</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Medium', marginBottom: 10, color: 'grey' }}>Kcal</Text>
                </View>
            </View>
            {/* <CalorieCard /> */}
            <PieChartBlock />
            

            <DayRangeSlider onSelectionChange={ handleDateRange }/>

            <View>
                <LineChartBlock />
            </View>
        </ScrollView>
    )
}

export default FoodAnalytics