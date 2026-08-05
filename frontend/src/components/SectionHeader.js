import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.viewAll}>View all</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#fbfaff',
    fontSize: 20,
    fontWeight: '900',
  },
  viewAll: {
    color: '#9b85ff',
    fontSize: 14,
  },
});
