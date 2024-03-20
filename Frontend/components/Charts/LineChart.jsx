
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const LineChartBlock = ({ weeklyData }) => {

    const latestData = weeklyData;

    return (
        <View>
            <View
                style={{
                    alignItems:'center',
                    marginVertical: 40,
                    paddingVertical: 30,
                    backgroundColor: '#efeefe',
                    borderRadius: 20,
                    paddingLeft: 10,
                    paddingRight: 10
                }}
            >
                <Text style={{ fontSize: 20, fontFamily: 'SemiBold', marginBottom: 10 }}>Calorie Stat</Text>
                <LineChart
                data={latestData}
                yAxisOffset={-100}
                isAnimated
                thickness={3}
                color="#836cdd"
                maxValue={2500}
                noOfSections={3}
                animateOnDataChange
                animationDuration={1000}
                onDataChangeAnimationDuration={300}
                areaChart
                curved
                yAxisTextStyle={{ color: '#000', fontFamily: 'SemiBold', fontSize: 12 }}
                hideDataPoints
                // dataPointsHeight={20}
                // dataPointsWidth={10}
                startFillColor={'#836cdd'}
                endFillColor={'#d0cae9'}
                startOpacity={0.6}
                endOpacity={0.2}
                spacing={latestData.length === 4 ? 90 : 45}
                label
                backgroundColor="#efeefe"
                rulesColor="#836cdd"
                rulesType="dotted"
                initialSpacing={latestData.length === 4 ? 20 : 15}
                yAxisColor="transparent"
                xAxisColor="#836cdd"
                yAxisLabelWidth={ 35 }
                xAxisLength={ 300 }
                rulesLength={ 300 }
                xAxisLabel={latestData.map((item) => item.label)}
                xAxisLabelTextStyle={{ fontFamily: 'SemiBold', fontSize: 12}}
                xAxisLabelsVerticalShift={ 5 }
                showValuesAsDataPointsText
                stepValue={ 400 }
                >
                </LineChart>
            </View>
        </View>
    );
};

export default LineChartBlock;
