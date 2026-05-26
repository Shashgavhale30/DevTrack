import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type NavItem = {
  icon: string;
  label: string;
};

const navItems: NavItem[] = [
  { icon: 'HM', label: 'Home' },
  { icon: 'OK', label: 'Task' },
  { icon: 'ME', label: 'Profile' },
  { icon: '...', label: 'Other' },
];

const otherItems: NavItem[] = [
  { icon: 'LC', label: 'LeetCode' },
  { icon: 'GH', label: 'GitHub' },
  { icon: '<>', label: 'VS Code' },
  { icon: 'ST', label: 'Setting' },
  { icon: 'RS', label: 'Resources' },
];

function NavBar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [menuVisible, setMenuVisible] = useState(false);

  const handleNavPress = (label: string) => {
    if (label === 'Other') {
      setMenuVisible(true);
      return;
    }

    setActiveTab(label);
    setMenuVisible(false);
  };

  const handleOtherPress = (label: string) => {
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
    backgroundColor: '#202235',
    borderWidth: 1,
    borderColor: '#30324a',
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
    backgroundColor: '#2b2d43',
  },
  otherIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f3149',
  },
  otherIcon: {
    color: '#ffd22f',
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
    backgroundColor: '#191b2c',
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
    backgroundColor: '#28283c',
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
    color: '#ffd22f',
  },
});

export default NavBar;
