import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StatCard({ stat, compact }) {
  return (
    <View style={[styles.statCard, compact && styles.statCardCompact]}>
      <View style={[styles.statIcon, { backgroundColor: `${stat.accent}22` }]}>
        <Text style={[styles.statIconText, { color: stat.accent }]}>{stat.icon}</Text>
      </View>
      <Text style={styles.statLabel}>{stat.label}</Text>
      <Text style={styles.statValue}>
        {stat.value}
        {stat.unit ? <Text style={[styles.statUnit, { color: stat.accent }]}> {stat.unit}</Text> : null}
      </Text>
      <Text
        style={[
          styles.statFootnote,
          stat.footnote.startsWith('+') || stat.footnote.includes('%')
            ? { color: stat.accent }
            : null,
        ]}>
        {stat.footnote}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    minHeight: 126,
    borderRadius: 14,
    padding: 10,
    backgroundColor: '#181a2b',
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 22,
    elevation: 5,
  },
  statCardCompact: {
    padding: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  statIconText: {
    fontWeight: '900',
    fontSize: 11,
  },
  statLabel: {
    color: '#bbb9c9',
    fontSize: 12,
  },
  statValue: {
    color: '#fbfaff',
    fontSize: 27,
    fontWeight: '900',
    marginTop: 9,
  },
  statUnit: {
    fontSize: 11,
    fontWeight: '800',
  },
  statFootnote: {
    color: '#a7a5b7',
    fontSize: 10,
    marginTop: 7,
  },
});
