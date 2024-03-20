import React, {useState, useContext, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import {Calendar} from 'react-native-calendars';
import Octicons from 'react-native-vector-icons/Octicons';
import { AuthContent } from '../../components/GlobalDataComponents/AuthProvider';
import axios, { all } from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const HabitAnalytics = () => {
  const { userData, localIP } = useContext(AuthContent);

  const [selected, setSelected] = useState('');
  const [habitData, setHabitData] = useState([]);
  const [completedHabitData, setCompletedHabitData] = useState([]);
  const [mostCompleted, setMostCompleted] = useState(null);

  const fetchHabitData = async() => {
    try{
        const requestData = await axios.post(`http://${localIP}:8080/fetchHabitData`, { userId: userData?._id });
        setHabitData(requestData.data);
    }catch(e){
        console.log(e);
    }
  }
  
  const fetchCompletedHabitsData = async() => {
    try{
        const requestData = await axios.post(`http://${localIP}:8080/fetchCompletedHabits`, { userId: userData?._id });
        setCompletedHabitData(requestData.data);
    }catch(e){
        console.log(e);
    }
  }

  // To find the most completed tasks for the month
  const findMostCompletedTasks = () => {
    // Get the date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const completedHabitDataLast30Days = completedHabitData.filter(completedTask => {
      const completionDate = new Date(completedTask.date);
      return completionDate >= thirtyDaysAgo;
    });
    
    const completionCountMap = new Map();
    
    completedHabitDataLast30Days.forEach(completedTask => {
      const { habitId } = completedTask;
      if (completionCountMap.has(habitId)) {
        completionCountMap.set(habitId, completionCountMap.get(habitId) + 1);
      } else {
        completionCountMap.set(habitId, 1);
      }
    });
    
    const sortedTasks = Array.from(completionCountMap.entries()).sort((a, b) => b[1] - a[1]);
    
    const mostCompletedTasks = sortedTasks.slice(0, 2).map(([habitId, completionCount]) => {
      const taskDetails = habitData.find(task => task._id === habitId);
      const totalDays = calculateTotalDays(taskDetails.repeatDays);
      return {
        name: taskDetails.title,
        completionCount: completionCount,
        totalDays: totalDays,
      };
    });
    
    setMostCompleted(mostCompletedTasks);
  };

  // To get the total occurance of each task for current month
  const calculateTotalDays = (repeatDays) => {
    let totalDays = 0;
    const currentDate = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      const dayOfWeek = date.getDay();
      if (repeatDays.includes(dayOfWeek)) {
        totalDays++;
      }
    }
    return totalDays;
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchHabitData();
      fetchCompletedHabitsData();
    }, [])
  );

  useEffect(()=>{
    findMostCompletedTasks();
    // generateMarkedDates();
  },[habitData, completedHabitData])


  // const generateDatesInRange = (startDate, endDate) => {
  //   const dates = [];
  //   const currentDate = new Date(startDate);
  //   const lastDate = new Date(endDate);
    
  //   while (currentDate <= lastDate) {
  //     dates.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
    
  //   return dates;
  // };

  // const generateMarkedDates = () => {
  //   const allCompletedDates = [];
  //   const partiallyCompletedDates = [];
  //   const incompleteDates = [];

  //   console.log(allCompletedDates);
  
  //   const startDate = new Date('2024-01-01');
  //   const endDate = new Date('2029-12-31');
  //   const datesInRange = generateDatesInRange(startDate, endDate);
    
  //   for (let date of datesInRange) {
  //     const tasksForDate = habitData.filter(task => {
  //       const dayOfWeek = new Date(date).getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
  //       return task.repeatDays.includes(dayOfWeek);
  //     });
  //     const completedTasksForDate = completedHabitData.filter(task => task.date === date);
      
  //     if (tasksForDate.length > 0) {
  //       if (completedTasksForDate.length === tasksForDate.length) {
  //         allCompletedDates.push(date);
  //       } else if (completedTasksForDate.length > 0) {
  //         partiallyCompletedDates.push(date);
  //       } else {
  //         incompleteDates.push(date);
  //       }
  //     }
  //   }
  
  //   return {
  //     allCompleted: convertToMarkedDates(allCompletedDates, '#ad9ded'),
  //     partiallyCompleted: convertToMarkedDates(partiallyCompletedDates, '#836cdd'),
  //     incomplete: convertToMarkedDates(incompleteDates, '#d1c9f2')
  //   };
  // };
  
  // const convertToMarkedDates = (datesArray, color) => {
  //   const marked = {};
  //   datesArray.forEach(date => {
  //     marked[date] = { marked: true, dotColor: color, activeOpacity: 0 };
  //   });
  //   return marked;
  // };
  
  return (
    <SafeAreaView>
        <View>
          <Text style={{ fontSize: 20, fontFamily: 'SemiBold',marginBottom: -5}}>Longest Streak</Text>
          <Text style={{ fontSize: 14, fontFamily: 'Regular', color: 'grey' }}>Last 30 days</Text>
        <View>

          <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 10, justifyContent: 'space-between'}}>
            {mostCompleted && mostCompleted.map((task, index) => (
              <View key={index} style={[styles.taskContainer, { width: index === 0 ? '40%' : '55%', backgroundColor: index === 0 ? 'black' : '#cdc6f3' }]}>
                <Text style={{color: '#fff', fontFamily: 'SemiBold', fontSize: 16}}>{task.name}</Text>
                <Text style={{color: '#fff', fontFamily: 'Medium',fontSize: 14}}>{task.completionCount}/{task.totalDays} days</Text>
              </View>
            ))}
          </View>

        </View>
      </View>
      
      <Text style={{ fontSize: 20, fontFamily: 'SemiBold', marginBottom: 10}}>Monthly Progress</Text>
      
      <Calendar
        markingType={'dot'}
        minDate={'2010-01-01'}
        maxDate={'2029-12-31'}
        markedDates={{
          '2024-03-13': {marked: true, dotColor: '#ad9ded', activeOpacity: 0},
          '2024-03-14': {marked: true, dotColor: '#ad9ded', activeOpacity: 0},
          '2024-03-15': {marked: true, dotColor: '#836cdd', activeOpacity: 0},
          '2024-03-16': {marked: true, dotColor: '#836cdd', activeOpacity: 0},
          '2024-03-17': {marked: true, dotColor: '#836cdd', activeOpacity: 0},
        }}
        style={{
          borderRadius: 20,
          padding:10
        }}
        enableSwipeMonths={true}
        theme={{  
          backgroundColor: '#efeefe',
          calendarBackground: '#efeefe',
          textSectionTitleColor: '#000',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#836cdd',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          arrowColor: 'black',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'black',
          indicatorColor: 'black',
          textDayFontFamily: 'SemiBold',
          textMonthFontFamily: 'SemiBold',
          textDayHeaderFontFamily: 'SemiBold',
          textDayFontWeight: '600',
          textDayFontSize: 15,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Octicons name='dot-fill' color={ '#836cdd' } size={ 20 }/>
          <Text style={{ fontFamily: 'Medium', color: '#191221', paddingTop: 3 }}>All complete</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Octicons name='dot-fill' color={ '#ad9ded' } size={ 20 }/>
          <Text style={{ fontFamily: 'Medium', color: '#191221', paddingTop: 3 }}>Pending</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Octicons name='dot-fill' color={ '#d1c9f2' } size={ 20 }/>
          <Text style={{ fontFamily: 'Medium', color: '#191221', paddingTop: 3 }}>All pending</Text>
        </View>

      </View>
      
    </SafeAreaView>
  );
};
const styles = new StyleSheet.create({
  taskContainer: {
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 15
  }
});

export default HabitAnalytics;