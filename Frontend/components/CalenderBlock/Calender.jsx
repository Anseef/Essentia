import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Calendar = ({ currentDate, selectedDayIndex }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [currentDayIndex, setCurrentDayIndex] = useState(null);

  useEffect(() => {
    const date = new Date(currentDate);
    const dayIndex = date.getDay();
    setCurrentDayIndex(dayIndex);
  }, [currentDate]);

  useEffect(()=>{
    if(currentDayIndex !== null){
      selectedDayIndex(currentDayIndex)
    }
  },[ currentDayIndex ])

  const getCurrentDateForDay = (dayIndex) => {
    const date = new Date(currentDate);
    const currentDay = date.getDay();
    const difference = currentDay - 0;
    date.setDate(date.getDate() - difference + dayIndex);
    
    return date.toLocaleDateString('en-US', { day: 'numeric' });
  };
  

  const isToday = (dayIndex) => {
    const date = new Date(currentDate);
    const day = date.getDay();
    return dayIndex === day;
  };

  return (
    <View style={styles.container}>
      {daysOfWeek.map((day, index) => (
        <View key={index} style={[styles.dayContainer, isToday(index) && styles.activeDayDiv]}>
          <Text style={styles.dayText}>{day}</Text>
          <Text style={styles.dayText}>{getCurrentDateForDay(index)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 4,
    height: 60,
  },
  dayContainer: {
    flex: 1,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent:'center',
    gap: -4
  },
  dayText: {
    fontSize: 15,
    fontFamily: 'Medium',
  },
  activeDayDiv: {
    backgroundColor: '#bcacf2',
  },
});

export default Calendar;
