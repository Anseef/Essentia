import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Pressable } from 'react-native';

const WeeklyHabitSelector = ({ onSelectDays }) => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [selectedDays, setSelectedDays] = useState([...Array(daysOfWeek.length).keys()]);

  const toggleDaySelection = (index) => {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  };

  useEffect(() => {
    onSelectDays(selectedDays);
  }, [onSelectDays, selectedDays]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.weekContainer}
    >
      {daysOfWeek.map((day, index) => (
        <Pressable
          key={index}
          style={[
            styles.dayContainer,
            { backgroundColor: selectedDays.includes(index) ? '#836cdd' : '#ecebfa' },
          ]}
          onPress={() => toggleDaySelection(index)}
        >
          <Text style={[styles.dayText, { color: selectedDays.includes(index) ? '#fff' : '#73549e' }]}>
            {day}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  dayContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontFamily: 'SemiBold',
    fontSize: 14,
  },
});

export default WeeklyHabitSelector;
