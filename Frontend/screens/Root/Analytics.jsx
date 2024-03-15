import { View, Text, StyleSheet } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState } from 'react'
import FoodAnalytics from './FoodAnalytics'

const Analytics = () => {
  const [dateRange, setDateRange] = useState('Weekly');

  const handleSeletedDateRange = (range) => {
    setDateRange(range);
  }

  console.log(dateRange);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Text style={styles.headerStyles}>Analytics</Text>
        <SelectList 
            setSelected={(value) => { console.log(value) }}
            data={
                [
                    { key: '0', value: 'Food' },
                    { key: '1', value: 'Habits' },
                    { key: '2', value: 'Health' },
                    { key: '3', value: 'Expenses' },
                ]
            }
            search={false}
            defaultOption={{ key: '0', value: 'Food' }}
            fontFamily='SemiBold'
            save='value'
            boxStyles={{
                borderWidth: 0, 
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 5,
                marginTop: 5,
            }}
            inputStyles={{ fontSize: 16,paddingTop: 5, fontFamily: 'SemiBold' }}
            dropdownStyles={{ 
                alignItems: 'center'
            }}

            dropdownTextStyles={{ fontSize: 16, textAlign:'center',fontFamily: 'SemiBold' }}
        />
      </View>
      <FoodAnalytics onSelectDateRange={ handleSeletedDateRange }/>

    </View>
  )
}
const styles = new StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff'
  },
  headerStyles: {
    fontFamily: 'Bold',
    fontSize: 28,
    paddingTop:10
  }
});

export default Analytics