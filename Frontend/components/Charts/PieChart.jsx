import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const pieData = [
  { value: 47, color: '#9784e3' },
  { value: 40, color: '#d1c9f2' },
  { value: 16, color: '#ad9ded' }
];

const renderDot = color => (
  <View
    style={{
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: color,
      marginRight: 10,
      marginTop: -3
    }}
  />
);

const renderLegendComponent = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    {/* Legend Labels */}
    <View style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderDot('#9784e3')}
            <Text style={{ color: 'black', fontFamily: 'SemiBold' }}>Protein</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderDot('#d1c9f2')}
            <Text style={{ color: 'black', fontFamily: 'SemiBold' }}>Fat</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderDot('#ad9ded')}
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
          // showText
          focusOnPress
          textSize={20}
          textColor='white'
          fontWeight='900'
          showValuesAsLabels={true}
          radius={60}
          innerRadius={30}
          toggleFocusOnPress
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 18, color: 'black', fontFamily: 'SemiBold'}}>
                  0%
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  </View>
);

const PieChartBlock = () => {
  return renderLegendComponent();
};

export default PieChartBlock;
