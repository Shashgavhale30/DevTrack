import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

const chartDays = ['S', 'M', 'T', 'W', 'T'];

export default function ProgressCard() {
  return (
    <View style={styles.progressPanel}>
      <View style={styles.todayProgressCopy}>
        <Text style={styles.miniLabel}>Today's Progress</Text>
        <Text style={styles.bigMetric}>
          4.6 <Text style={styles.bigMetricUnit}>hrs</Text>
        </Text>
        <Text style={styles.goalText}>
          of <Text style={styles.greenText}>6 hr</Text> goal
        </Text>
      </View>
      <View style={styles.chart}>
        <View style={styles.chartLine} />
        {[24, 45, 35, 58].map((bottom, index) => (
          <View
            key={bottom}
            style={[
              styles.chartPoint,
              {
                left: 18 + index * 48,
                bottom,
              },
            ]}
          />
        ))}
        <View style={[styles.chartSegment, styles.chartSegmentOne]} />
        <View style={[styles.chartSegment, styles.chartSegmentTwo]} />
        <View style={[styles.chartSegment, styles.chartSegmentThree]} />
        <View style={styles.chartDays}>
          {chartDays.map((day, index) => (
            <Text key={`${day}-${index}`} style={styles.chartDay}>
              {day}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.ring}>
        <Text style={styles.ringText}>77%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressPanel: {
    minHeight: 128,
    marginTop: 18,
    borderRadius: 18,
    padding: 14,
    backgroundColor: colors.panel,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  todayProgressCopy: {
    width: 104,
  },
  miniLabel: {
    color: '#c6c4d3',
    fontSize: 12,
    marginBottom: 14,
  },
  bigMetric: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
  },
  bigMetricUnit: {
    fontSize: 16,
    fontWeight: '700',
  },
  goalText: {
    color: '#aaa8b8',
    fontSize: 14,
  },
  greenText: {
    color: colors.green,
  },
  chart: {
    flex: 1,
    height: 92,
  },
  chartLine: {
    position: 'absolute',
    left: 14,
    right: 8,
    bottom: 54,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.chartLine,
  },
  chartPoint: {
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#806bff',
    borderWidth: 2,
    borderColor: '#dad5ff',
  },
  chartSegment: {
    position: 'absolute',
    height: 3,
    borderRadius: 4,
    backgroundColor: '#806bff',
  },
  chartSegmentOne: {
    left: 28,
    bottom: 34,
    width: 52,
    transform: [{ rotate: '-17deg' }],
  },
  chartSegmentTwo: {
    left: 76,
    bottom: 40,
    width: 48,
    transform: [{ rotate: '8deg' }],
  },
  chartSegmentThree: {
    left: 122,
    bottom: 47,
    width: 54,
    transform: [{ rotate: '-20deg' }],
  },
  chartDays: {
    position: 'absolute',
    left: 14,
    right: 8,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartDay: {
    color: '#b8b6c8',
    fontSize: 12,
  },
  ring: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 9,
    borderLeftColor: '#7765ff',
    borderTopColor: '#7765ff',
    borderRightColor: '#34364c',
    borderBottomColor: '#7765ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '900',
  },
});
