import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const DayRangeSlider = ({ onSelectionChange }) => {
  const [selectedRange, setSelectedRange] = useState('Weekly');

  const handleRangeSelection = (range) => {
    setSelectedRange(range);
    onSelectionChange && onSelectionChange(range);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.rangeButton, selectedRange === 'Weekly' && styles.selected]}
        onPress={() => handleRangeSelection('Weekly')}
      >
        <Text style={[styles.text, selectedRange === 'Weekly' && styles.selected]}>Weekly</Text>
      </Pressable>
      <Pressable
        style={[styles.rangeButton, selectedRange === 'Monthly' && styles.selected]}
        onPress={() => handleRangeSelection('Monthly')}
      >
        <Text style={[styles.text, selectedRange === 'Monthly' && styles.selected]}>Monthly</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#efeefe',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: -15
  },
  rangeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 14,
    alignItems: 'center'
  },
  text: {
    fontFamily: 'SemiBold',
    fontSize: 16,
  },
  selected: {
    backgroundColor: '#836cdd',
    color: '#fff',
  },
});

export default DayRangeSlider;