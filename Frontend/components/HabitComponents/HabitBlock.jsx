import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

const HabitBlock = ({ habitData, onCheckedStatusChange, isCheckedStatus, onPress }) => {

  const navigation = useNavigation();

  const [isChecked, setChecked] = useState(isCheckedStatus);
  const { title, category } = habitData;

  const handleCheckboxChange = () => {
    onCheckedStatusChange(habitData)
  };

  const handlePress = () => {
    onPress(habitData);
  }
  
  const containerStyle = {
    ...styles.container,
    backgroundColor: isChecked ? '#ecebfa' : '#e0defa',
  };

  const incompleteIcon = isChecked ? (
    <MaterialIcon name='done' size={15} color='#4CAF50' />
  ) : (
    <Entypo name='cross' size={15} color='#836cdf' />
  );

  const textStyles = {
    fontFamily: 'Regular',
    fontSize: 12,
    paddingTop: 3,
    color: isChecked ? '#4CAF50' : '#836cdf',
  };

  const iconContainerStyle = {
    ...styles.iconContainer,
    backgroundColor: isChecked ? '#d9d5eb' : '#cdc6f3'
  };

  const TaskHeadingStyle = {
    ...styles.taskHeading,
    textDecorationLine: isChecked ? 'line-through' : 'none',
    color: isChecked ? 'grey' : 'black'
  }

  return (
    <Pressable android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }} style={containerStyle} onPress={ handlePress }>
      <View style={{flexDirection: 'row',gap: 15, alignItems: 'center'}}>
        <View style={iconContainerStyle}>
          <Icon name='walking' size={22} />
        </View>

        <View>
          <Text style={TaskHeadingStyle}>{ title }</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {incompleteIcon}
            <Text style={textStyles}>
              {isChecked ? 'Done' : 'Incomplete'}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <Checkbox
          style={styles.CheckboxStyle}
          value={isChecked}
          onValueChange={handleCheckboxChange}
          color={isChecked ? '#9e8de0' : '#836cdf'}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 22,
    borderRadius: 15,
    marginBottom: 20
  },
  iconContainer: {
    backgroundColor: '#cdc6f3',
    width: 35,
    height: 35,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskHeading: {
    fontFamily: 'SemiBold',
    fontSize: 15,
    marginBottom: -3,
    marginTop: 5
  },
  CheckboxStyle: {
    padding: 10,
    borderRadius: 5,
    borderColor: '#836cdf',
  },
});

export default HabitBlock;
