import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import IconPack from 'react-native-vector-icons/FontAwesome5';

const HomeExpenseContainer = () => {

  return (
    <Pressable android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }} style = { styles.container}  onPress={() => console.log('Expense Clicked')}>
      <View style = { styles.headingBlock }>
        <Text style = {{ fontFamily: 'SemiBold', fontSize: 20 }}>Expenses</Text>
        <IconPack name='wallet' size={ 19 } style = {{ paddingBottom: 4 }} color={ '#7d5ada'}/>
      </View>

      <View style = {{ alignSelf: 'center',paddingTop: 6}}>

        <View style = {styles.expenseDataBlock}>
          <Text style = {styles.expenseBlockText}>Income</Text>
          <Text style = {styles.expenseBlockText}>$341</Text>
        </View>

        <View style = {styles.expenseDataBlock}>
          <Text style = {styles.expenseBlockText}>Payment</Text>
          <Text style = {styles.expenseBlockText}>$142</Text>
        </View>

        <View style = {styles.expenseDataBlock}>
          <Text style = {styles.expenseBlockText}>Savings</Text>
          <Text style = {styles.expenseBlockText}>$21</Text>
        </View>

      </View>

    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efeefe',
    padding: 10,
    height: '100%',
    width:170,
    borderRadius: 12
  },
  headingBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  expenseDataBlock: {
    paddingTop: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  expenseBlockText: {
    fontFamily: 'SemiBold',
    fontSize: 16
  }
})
export default HomeExpenseContainer