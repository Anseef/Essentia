import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { useNavigation } from '@react-navigation/native';
import IconPack from 'react-native-vector-icons/FontAwesome5';


import { useTrackedFoods } from '../GlobalDataComponents/TotalCalorieProvider';

const HomeFoodContainer = () => {

  const navigation = useNavigation();
  const { totalCalorie } = useTrackedFoods();

  return (
    <Pressable style = { styles.container}  onPress={() => navigation.navigate('FoodSelection')}>
      <View style = { styles.headingBlock }>
        <Text style = {{ fontFamily: 'SemiBold', fontSize: 20 }}>Food</Text>
        <IconPack name = 'coffee' size={ 20 } color={ '#7d5ada'}/>
      </View>
        <View style = {{ alignSelf: 'center',paddingTop: 6}}>
            <AnimatedProgressWheel 
              size={100}
              width={12} 
              max={2760}
              rounded={true}
              color={'#bcacf2'}
              progress={ totalCalorie }
              subtitle={'kcal'}
              showProgressLabel={true}
              backgroundColor={'#fff'}
              rotation={'-90deg'}
              subtitleStyle={styles.subtitle}
              labelStyle={styles.progressLabel}
            />
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
  subtitle: {
    marginTop: -10,
    fontFamily:'SemiBold',
    fontSize: 14
  },
  progressLabel: {
    fontFamily: 'SemiBold',
    fontSize: 20
  }
})
export default HomeFoodContainer