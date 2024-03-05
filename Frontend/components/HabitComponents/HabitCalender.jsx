import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [initialScrollIndex, setInitialScrollIndex] = useState(0);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const currentDay = new Date().getDay();
    // Set initial scroll index to the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    setInitialScrollIndex(currentDay);
  }, []);

  const generateDateList = () => {
    const currentDate = new Date();
    const initialDate = new Date(currentDate);
    initialDate.setDate(currentDate.getDate() - 30); // Initial date is 30 days ago
    const dateList = [];
    for (let i = 0; i < 61; i++) {
      const nextDate = new Date(initialDate);
      nextDate.setDate(initialDate.getDate() + i);
      dateList.push({
        date: nextDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        isToday: isSameDay(nextDate, currentDate),
      });
    }
    return dateList;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const dateList = generateDateList();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log(date); // You can perform any action with the clicked date
  };

  const renderDateItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleDateClick(item.date)}
      style={[styles.dayContainer, item.isToday ? styles.todayContainer : null, item.isToday && styles.activeDayDiv]}
    >
      <Text style={[styles.dayText, item.isToday ? styles.todayText : null]}>{item.date.substring(5)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.calendarContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dateList}
        renderItem={renderDateItem}
        keyExtractor={(item) => item.date}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(data, index) => ({ length: 60, offset: 60 * index, index })}
      />

      <View style={styles.dayOfWeekContainer}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.dayOfWeek}>
            <Text style={styles.dayOfWeekText}>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },
  dayContainer: {
    width: 60,
    height: 60,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  dayText: {
    fontSize: 15,
    fontFamily: 'Medium',
  },
  activeDayDiv: {
    backgroundColor: '#bcacf2',
  },
  todayContainer: {
    backgroundColor: '#f5f5f5',
  },
  todayText: {
    color: '#333333',
  },
  dayOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 4,
    height: 60,
  },
  dayOfWeek: {
    flex: 1,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: -4,
  },
  dayOfWeekText: {
    fontSize: 15,
    fontFamily: 'Medium',
  },
});

export default Calendar;
