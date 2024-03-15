
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const LineChartBlock = () => {

    const latestData = [
        {
            value: 100,
            label: 'Sun',
            dataPointText: '20'
        },
        {
            value: 120,
            label: 'Mon',
            dataPointText: '20'
        },
        {
            value: 210,
            label: 'Tue'
        },
        {
            value: 250,
            label: 'Wed'
        },
        {
            value: 320,
            label: 'Thu'
        },
        {
            value: 310,
            label: 'Fri'
        },
        {
            value: 310,
            label: 'Sat'
        },
    ]
    // const lineData2 = [
    //     {value: 150, dataPointText: '0'},
    //     {value: 200, dataPointText: '18'},
    //     {value: 140, dataPointText: '40'},
    //     {value: 360, dataPointText: '36'},
    //     {value: 600, dataPointText: '60'},
    //     {value: 540, dataPointText: '54'},
    //     {value: 185, dataPointText: '85'},
    // ];

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
                yAxisOffset={100}
                isAnimated
                thickness={3}
                color="#836cdd"
                maxValue={600}
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
                spacing={45}
                label
                backgroundColor="#efeefe"
                rulesColor="#836cdd"
                rulesType="dotted"
                initialSpacing={15}
                yAxisColor="transparent"
                xAxisColor="#836cdd"
                yAxisLabelWidth={ 40 }
                xAxisLength={ 300 }
                rulesLength={ 300 }
                xAxisLabel={latestData.map((item) => item.label)}
                xAxisLabelTextStyle={{ fontFamily: 'SemiBold', fontSize: 12}}
                xAxisLabelsVerticalShift={ 5 }
                showValuesAsDataPointsText
                stepValue={200}
                >
                </LineChart>
            </View>
        </View>
    );
};

export default LineChartBlock;
