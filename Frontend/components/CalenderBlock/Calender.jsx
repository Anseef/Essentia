import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getCurrentDateForDay = (dayIndex) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + dayIndex);
    return currentDate.toLocaleDateString('en-US', { day: 'numeric' });
  };

  const isToday = (dayIndex) => {
    const currentDate = new Date();
    const day = currentDate.getDay();
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
