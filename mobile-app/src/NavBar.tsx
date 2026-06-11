import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import type { MainScreen } from './types';

type NavItem = {
  icon: string;
  label: MainScreen | 'More';
};

const navItems: NavItem[] = [
  { icon: 'HM', label: 'Home' },
  { icon: 'TS', label: 'Tasks' },
  { icon: 'PF', label: 'Profile' },
  { icon: 'MR', label: 'More' },
];

const otherItems: Array<{ icon: string; label: MainScreen }> = [
  { icon: 'LC', label: 'LeetCode' },
  { icon: 'GH', label: 'GitHub' },
  { icon: '<>', label: 'VS Code' },
  { icon: 'ST', label: 'Settings' },
  { icon: 'RS', label: 'Resources' },
];

function NavBar({
  activeScreen,
  onNavigate,
}: {
  activeScreen: MainScreen;
  onNavigate: (screen: MainScreen) => void;
}) {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleNavPress = (label: MainScreen | 'More') => {
    if (label === 'More') {
      setMenuVisible(true);
      return;
    }

    onNavigate(label);
    setMenuVisible(false);
  };

  const handleOtherPress = (label: MainScreen) => {
    onNavigate(label);
    setMenuVisible(false);
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
          const active =
            activeScreen === item.label ||
            (item.label === 'More' && otherItems.some(otherItem => otherItem.label === activeScreen));

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
    paddingBottom: 98,
    backgroundColor: 'rgba(7, 9, 20, 0.28)',
  },
  otherMenu: {
    alignSelf: 'flex-end',
    width: 208,
    borderRadius: 22,
    paddingVertical: 8,
    backgroundColor: '#171A2B',
    borderWidth: 1,
    borderColor: '#2B2E43',
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
    backgroundColor: '#25283C',
  },
  otherIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#24283C',
  },
  otherIcon: {
    color: '#FFD64A',
    fontSize: 11,
    fontWeight: '900',
  },
  otherLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  bottomNav: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#171A2B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#2B2E43',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 22,
    elevation: 9,
  },
  tabItem: {
    width: 70,
    height: 58,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pressedTab: {
    opacity: 0.8,
  },
  activeTab: {
    backgroundColor: '#25283C',
  },
  tabIcon: {
    color: '#A7A3B6',
    fontSize: 16,
    fontWeight: '900',
  },
  tabLabel: {
    color: '#A7A3B6',
    fontSize: 11,
    fontWeight: '700',
  },
  activeText: {
    color: '#FFD64A',
  },
});

export default NavBar;
