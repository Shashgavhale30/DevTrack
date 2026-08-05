import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { colors } from '../theme/colors';
import { getUser } from '../data/userStore';

const navItems = [
  { icon: '🏚️', label: 'Home' },
  { icon: '📋', label: 'Task' },
  { icon: '👤', label: 'Profile' },
  { icon: '⭕❇️', label: 'Other' },
];

function NavBar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);
  const user = getUser();

  const otherItems = [
    { icon: 'GH', label: user && user.github ? `GitHub · ${user.github}` : 'GitHub' },
    { icon: 'LC', label: user && user.leetcode ? `LeetCode · ${user.leetcode}` : 'LeetCode' },
    { icon: '<>', label: 'VS Code' },
    { icon: 'ST', label: 'Setting' },
    { icon: 'RS', label: 'Resources' },
  ];

  const handleNavPress = label => {
    if (label === 'Other') {
      setMenuVisible(true);
      return;
    }

    setActiveTab(label);
    setMenuVisible(false);
  };

  const handleOtherPress = label => {
    setActiveTab('Other');
    setMenuVisible(false);
    console.log(`${label} selected`);
  };

  return (
    <>
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.otherMenu}>
                {otherItems.map(item => (
                  <Pressable
                    key={item.label}
                    style={({ pressed }) => [
                      styles.otherMenuItem,
                      pressed && styles.pressedMenuItem,
                    ]}
                    onPress={() => handleOtherPress(item.label)}>
                    <View style={styles.otherIconWrap}>
                      <Text style={styles.otherIcon}>{item.icon}</Text>
                    </View>
                    <Text style={styles.otherLabel}>{item.label}</Text>
                  </Pressable>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.bottomNav}>
        {navItems.map(item => {
          const active = activeTab === item.label;

          return (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.tabItem,
                active && styles.activeTab,
                pressed && styles.pressedTab,
              ]}
              onPress={() => handleNavPress(item.label)}>
              <Text style={[styles.tabIcon, active && styles.activeText]}>
                {item.icon}
              </Text>
              <Text style={[styles.tabLabel, active && styles.activeText]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 22,
    paddingBottom: 92,
    backgroundColor: 'rgba(5, 7, 17, 0.2)',
  },
  otherMenu: {
    alignSelf: 'flex-end',
    width: 196,
    borderRadius: 18,
    paddingVertical: 8,
    backgroundColor: colors.otherMenu,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.34,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 22,
    elevation: 12,
  },
  otherMenuItem: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
  },
  pressedMenuItem: {
    backgroundColor: colors.otherMenuPressed,
  },
  otherIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.otherIconWrap,
  },
  otherIcon: {
    color: colors.yellow,
    fontSize: 11,
    fontWeight: '900',
  },
  otherLabel: {
    color: '#f7f5ff',
    fontSize: 14,
    fontWeight: '700',
  },
  bottomNav: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 10,
    height: 70,
    borderRadius: 22,
    backgroundColor: colors.nav,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 22,
    elevation: 9,
  },
  tabItem: {
    width: 68,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pressedTab: {
    opacity: 0.8,
  },
  activeTab: {
    backgroundColor: colors.activeTab,
  },
  tabIcon: {
    color: '#aaa8b8',
    fontSize: 18,
    fontWeight: '900',
  },
  tabLabel: {
    color: '#aaa8b8',
    fontSize: 11,
    fontWeight: '700',
  },
  activeText: {
    color: colors.yellow,
  },
});

export default NavBar;
