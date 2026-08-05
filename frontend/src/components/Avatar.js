import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Avatar() {
  return (
    <View style={styles.avatar}>
      <View style={styles.avatarHair} />
      <View style={styles.avatarFace}>
        <View style={styles.avatarEyes} />
        <View style={styles.avatarSmile} />
      </View>
      <View style={styles.avatarBody} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#bdb1ff',
    overflow: 'hidden',
    alignItems: 'center',
  },
  avatarHair: {
    width: 30,
    height: 15,
    borderRadius: 14,
    backgroundColor: '#161827',
    marginTop: 9,
  },
  avatarFace: {
    width: 30,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#f2b184',
    marginTop: -4,
    alignItems: 'center',
  },
  avatarEyes: {
    width: 17,
    height: 4,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: '#1d1e2d',
    marginTop: 10,
  },
  avatarSmile: {
    width: 12,
    height: 6,
    borderBottomWidth: 2,
    borderColor: '#1d1e2d',
    borderRadius: 8,
    marginTop: 4,
  },
  avatarBody: {
    width: 38,
    height: 22,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#1d2130',
    marginTop: -3,
  },
});
