import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerIcon}>gear</Text>
      <Text style={styles.logo}>
        Dev<Text style={styles.logoAccent}>Track</Text>
      </Text>
      <View style={styles.headerActions}>
        <Text style={styles.headerIcon}>find</Text>
        <View>
          <Text style={styles.headerIcon}>bell</Text>
          <View style={styles.notificationDot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    color: '#f7f5ff',
    fontSize: 25,
    fontWeight: '800',
  },
  logoAccent: {
    color: colors.accentText,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  headerIcon: {
    color: '#d9d9e8',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  notificationDot: {
    position: 'absolute',
    right: -4,
    top: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.notificationDot,
  },
});
