import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const categoryColors = [
  '#f473b9', // Pink
  '#70a1ff', // Blue
  '#90ee90', // Light Green
  '#f8de7e', // Light Yellow
  '#ffc107', // Orange
  '#cd74e6', // Purple
];

const CategoryBlock = ({ categoryName, colorIndex, isSelected, onPress }) => {
  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: isSelected ? '#d3d0f5' : '#ecebfa' },
      ]}
      onPress={onPress}
    >
      <Text style={styles.textStyle}>{categoryName}</Text>
      <View style={{ ...styles.iconContainer, backgroundColor: categoryColors[colorIndex] }}>
        <Icon name={'book'} size={22} color={'#efedf5'} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 185,
    padding: 17,
    justifyContent: 'space-between',
    borderRadius: 15,
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Bold',
    fontSize: 15,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryBlock;
