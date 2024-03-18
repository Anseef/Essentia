import React, {useState} from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import {Calendar} from 'react-native-calendars';
import Octicons from 'react-native-vector-icons/Octicons';

const HabitAnalytics = () => {
  const [selected, setSelected] = useState('');
  // const vacation = {key: 'vacation', color: '#9784e3', selectedDotColor: 'blue'};
  // const massage = {key: 'massage', color: '#836cdd', selectedDotColor: 'blue'};
  // const workout = {key: 'workout', color: '#ad9ded'};

  return (
    <SafeAreaView>
      <View>
          <Text style={{ fontSize: 20, fontFamily: 'SemiBold',marginBottom: -5}}>Longest Streak</Text>
          <Text style={{ fontSize: 14, fontFamily: 'Regular', color: 'grey' }}>Last 30 days</Text>
        <View>

          <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 10, justifyContent: 'space-between'}}>
            <View style={[styles.taskContainer, { width: '40%' }]}>
              <Text style={{color: '#fff', fontFamily: 'SemiBold', fontSize: 16}}>Quit Smoking</Text>
              <Text style={{color: '#fff', fontFamily: 'Medium',fontSize: 14}}>25/30 days</Text>
            </View>
            <View style={[styles.taskContainer, { backgroundColor: '#cdc6f3', width: '55%' }]}>
              <Text style={{color: '#fff', fontFamily: 'SemiBold', fontSize: 16}}>Study for 3 hours</Text>
              <Text style={{color: '#fff', fontFamily: 'Medium',fontSize: 14}}>14/21 days</Text>
            </View>
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