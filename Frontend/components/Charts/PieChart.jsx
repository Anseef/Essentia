import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const PieChartBlock = ({ totalCarbs, totalFat, totalProtein }) => {

  const totalMeasure = (totalCarbs + totalProtein + totalFat);

  const pieData = [
    { value:  Math.round((totalFat / totalMeasure) * 100), color: '#9784e3' },
    { value:  Math.round((totalProtein / totalMeasure) * 100), color: '#d1c9f2' },
    { value:  Math.round((totalCarbs / totalMeasure) * 100), color: '#ad9ded' }
  ];

  const [selectedValuePercent, setSelectedValuePercent] = useState(0);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {/* Legend Labels */}
      <View style={{ flex: 1 }}>
        <View style={{ margin: 20 }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#9784e3', marginRight: 10, marginTop: -3 }} />
              <Text style={{ color: 'black', fontFamily: 'SemiBold' }}>Protein</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#d1c9f2', marginRight: 10, marginTop: -3 }} />
              <Text style={{ color: 'black', fontFamily: 'SemiBold' }}>Fat</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#ad9ded', marginRight: 10, marginTop: -3 }} />
              <Text style={{ color: 'black', fontFamily: 'SemiBold' }}>Carb</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Pie Chart */}
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <PieChart
            data={pieData}
            donut
            focusOnPress
            textSize={20}
            textColor='white'
            fontWeight='900'
            showValuesAsLabels={true}
            radius={60}
            innerRadius={30}
            toggleFocusOnPress
            onPress={index => setSelectedValuePercent(index.value)}
            centerLabelComponent={() => {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, color: 'black', fontFamily: 'SemiBold' }}>{selectedValuePercent}%</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PieChartBlock;
