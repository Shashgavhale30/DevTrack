import React, { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import ActivityCard from '../components/ActivityCard';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import ProgressCard from '../components/ProgressCard';
import ProjectsSection from '../components/ProjectsSection';
import StatCard from '../components/StatCard';
import TasksSection from '../components/TasksSection';
import { stats } from '../data/mockData';
import { colors } from '../theme/colors';
import { buildActivity, getGreeting } from '../utils/helpers';

function Homepage({ user }) {
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const greeting = useMemo(() => getGreeting(), []);
  const activity = useMemo(() => buildActivity(), []);
  const firstName = (user && user.name ? user.name.split(' ')[0] : 'Arjun') || 'Arjun';

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.screen} />
      <View style={styles.backgroundGlowTop} />
      <View style={styles.backgroundGlowBottom} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Header />
        <View style={styles.greetingRow}>
          <Avatar />
<View style={styles.greetingCopy}>
            <Text style={styles.greeting}>{greeting}, {firstName}!</Text>
            <Text style={styles.subtitle}>Let's build something great today.</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map(stat => (
            <StatCard key={stat.label} stat={stat} compact={compact} />
          ))}
        </View>

        <ActivityCard activity={activity} />
        <ProjectsSection />
        <TasksSection />
        <ProgressCard />
      </ScrollView>
      <NavBar />
      <View style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 118,
  },
  backgroundGlowTop: {
    position: 'absolute',
    top: -80,
    left: -40,
    right: -40,
    height: 280,
    backgroundColor: colors.backgroundGlowTop,
    opacity: 0.65,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
  },
  backgroundGlowBottom: {
    position: 'absolute',
    right: -100,
    bottom: 100,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.backgroundGlowBottom,
    opacity: 0.18,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 18,
    gap: 12,
  },
  greetingCopy: {
    flex: 1,
  },
  greeting: {
    color: '#f7f5ff',
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 4,
    color: colors.textFaint,
    fontSize: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 74,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffd12e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 18,
    elevation: 10,
  },
  fabText: {
    color: '#10121d',
    fontSize: 40,
    lineHeight: 42,
    fontWeight: '500',
  },
});

export default Homepage;
