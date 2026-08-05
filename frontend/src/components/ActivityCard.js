import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, getActivityCellStyle } from '../theme/colors';

const weekLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const weekDates = ['Mar 31', 'Apr 7', 'Apr 14', 'Apr 21'];

export default function ActivityCard({ activity }) {
  const contributionTotal = activity.flat().reduce((total, level) => total + level, 0) * 3;

  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <View style={styles.inlineTitle}>
          <Text style={styles.panelIcon}>cal</Text>
          <Text style={styles.panelTitle}>GitHub Activity</Text>
        </View>
        <Text style={styles.mutedAction}>This Week v</Text>
      </View>
      <View style={styles.weekLabels}>
        {weekLabels.map((day, index) => (
          <Text key={`${day}-${index}`} style={styles.weekLabel}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.activityRows}>
        {activity.map((week, rowIndex) => (
          <View key={`week-${rowIndex}`} style={styles.activityRow}>
            <Text style={styles.activityDate}>{weekDates[rowIndex]}</Text>
            <View style={styles.activityCells}>
              {week.map((level, columnIndex) => (
                <View
                  key={`${rowIndex}-${columnIndex}`}
                  style={[styles.activityCell, getActivityCellStyle(level)]}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.activityFooter}>
        <Text style={styles.footerMetric}>
          Longest streak: <Text style={styles.greenText}>12 days</Text>
        </Text>
        <Text style={styles.footerMetric}>
          Total contributions: <Text style={styles.greenText}>{contributionTotal}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginTop: 14,
    borderRadius: 16,
    padding: 12,
    backgroundColor: colors.panel,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 4,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  inlineTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  panelIcon: {
    color: '#cbc9d8',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  panelTitle: {
    color: '#f8f7ff',
    fontSize: 18,
    fontWeight: '800',
  },
  mutedAction: {
    color: '#aaa8ba',
    fontSize: 13,
  },
  weekLabels: {
    flexDirection: 'row',
    paddingLeft: 54,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  weekLabel: {
    width: 28,
    color: '#9d9bad',
    fontSize: 13,
    textAlign: 'center',
  },
  activityRows: {
    gap: 6,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDate: {
    width: 50,
    color: '#aaa8b8',
    fontSize: 12,
  },
  activityCells: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityCell: {
    width: 9,
    height: 9,
    borderRadius: 3,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 16,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  footerMetric: {
    color: '#bbb9c9',
    fontSize: 12,
  },
  greenText: {
    color: colors.green,
  },
});
