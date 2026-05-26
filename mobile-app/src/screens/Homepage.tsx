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
import NavBar from '../NavBar';

type Stat = {
  accent: string;
  icon: string;
  label: string;
  value: string;
  unit?: string;
  footnote: string;
};

type Project = {
  accent: string;
  icon: string;
  name: string;
  description: string;
  status: string;
  progress: number;
};

type Task = {
  accent: string;
  title: string;
  project: string;
  due: string;
  done: boolean;
};

const stats: Stat[] = [
  {
    accent: '#45dc75',
    icon: 'hot',
    label: 'Streak',
    value: '12',
    unit: 'days',
    footnote: 'Keep it up',
  },
  {
    accent: '#8d78ff',
    icon: '</>',
    label: 'Coding Time',
    value: '4.6',
    unit: 'hrs',
    footnote: '+1.2h vs yesterday',
  },
  {
    accent: '#ff5b86',
    icon: 'git',
    label: 'Commits',
    value: '8',
    footnote: '+3 vs yesterday',
  },
  {
    accent: '#4a8dff',
    icon: 'aim',
    label: 'Tasks Done',
    value: '6/10',
    footnote: '60% completed',
  },
];

const projects: Project[] = [
  {
    accent: '#806bff',
    icon: '</>',
    name: 'DevTrack Web App',
    description: 'A productivity tracker for developers',
    status: 'In Progress',
    progress: 72,
  },
  {
    accent: '#58dd78',
    icon: 'AI',
    name: 'AI Code Assistant',
    description: 'VS Code extension for AI suggestions',
    status: 'In Progress',
    progress: 48,
  },
];

const tasks: Task[] = [
  {
    accent: '#55dd78',
    title: 'Implement authentication flow',
    project: 'DevTrack Web App',
    due: 'Today',
    done: true,
  },
  {
    accent: '#ff5c9e',
    title: 'Design dashboard UI',
    project: 'DevTrack Web App',
    due: 'Today',
    done: false,
  },
  {
    accent: '#5f8dff',
    title: 'Write unit tests',
    project: 'DevTrack Web App',
    due: 'Tomorrow',
    done: false,
  },
];

function Homepage() {
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const greeting = useMemo(() => getGreeting(), []);
  const activity = useMemo(() => buildActivity(), []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#050711" />
      <View style={styles.backgroundGlowTop} />
      <View style={styles.backgroundGlowBottom} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Header />
        <View style={styles.greetingRow}>
          <Avatar />
          <View style={styles.greetingCopy}>
            <Text style={styles.greeting}>{greeting}, Arjun!</Text>
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

function Header() {
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

function Avatar() {
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

function StatCard({ stat, compact }: { stat: Stat; compact: boolean }) {
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

function ActivityCard({ activity }: { activity: number[][] }) {
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
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={`${day}-${index}`} style={styles.weekLabel}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.activityRows}>
        {activity.map((week, rowIndex) => (
          <View key={`week-${rowIndex}`} style={styles.activityRow}>
            <Text style={styles.activityDate}>{['Mar 31', 'Apr 7', 'Apr 14', 'Apr 21'][rowIndex]}</Text>
            <View style={styles.activityCells}>
              {week.map((level, columnIndex) => (
                <View
                  key={`${rowIndex}-${columnIndex}`}
                  style={[
                    styles.activityCell,
                    getActivityCellStyle(level),
                  ]}
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

function ProjectsSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Active Projects" />
      <View style={styles.panel}>
        {projects.map((project, index) => (
          <View key={project.name}>
            <View style={styles.projectRow}>
              <View style={[styles.projectIcon, { backgroundColor: project.accent }]}>
                <Text style={styles.projectIconText}>{project.icon}</Text>
              </View>
              <View style={styles.projectContent}>
                <View style={styles.rowBetween}>
                  <View style={styles.flexShrink}>
                    <Text style={styles.projectTitle}>{project.name}</Text>
                    <Text style={styles.projectDescription}>{project.description}</Text>
                  </View>
                  <View style={styles.statusPill}>
                    <View style={[styles.statusDot, { backgroundColor: project.accent }]} />
                    <Text style={styles.statusText}>{project.status}</Text>
                  </View>
                </View>
                <View style={styles.progressRow}>
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${project.progress}%`, backgroundColor: project.accent },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressPercent}>{project.progress}%</Text>
                </View>
              </View>
              <Text style={styles.menuDots}>...</Text>
            </View>
            {index < projects.length - 1 ? <View style={styles.rowDivider} /> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

function TasksSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Today's Tasks" />
      <View style={styles.taskPanel}>
        {tasks.map((task, index) => (
          <View key={task.title}>
            <View style={styles.taskRow}>
              <View style={[styles.taskAccent, { backgroundColor: task.accent }]} />
              <View style={[styles.checkCircle, task.done && { backgroundColor: task.accent, borderColor: task.accent }]}>
                {task.done ? <Text style={styles.checkText}>✓</Text> : null}
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.projectDescription}>{task.project}</Text>
              </View>
              <View style={[styles.duePill, { backgroundColor: `${task.accent}22` }]}>
                <Text style={[styles.dueText, { color: task.accent }]}>{task.due}</Text>
              </View>
              <Text style={styles.menuDots}>...</Text>
            </View>
            {index < tasks.length - 1 ? <View style={styles.rowDivider} /> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

function ProgressCard() {
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
          {['S', 'M', 'T', 'W', 'T'].map((day, index) => (
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

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.viewAll}>View all</Text>
    </View>
  );
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good morning';
  }

  if (hour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
}

function buildActivity() {
  const today = new Date();
  const seed = today.getDate() + today.getMonth() * 7;

  return Array.from({ length: 4 }, (_rowItem, row) =>
    Array.from({ length: 23 }, (_columnItem, column) => {
      const value = (row * 11 + column * 5 + seed) % 9;
      if (value > 7) {
        return 3;
      }
      if (value > 5) {
        return 2;
      }
      if (value > 3) {
        return 1;
      }
      return 0;
    }),
  );
}

function getActivityCellStyle(level: number) {
  return {
    backgroundColor:
      level === 0
        ? '#2a2c42'
        : level === 1
          ? '#29483d'
          : level === 2
            ? '#327d51'
            : '#51df71',
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050711',
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
    backgroundColor: '#15172b',
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
    backgroundColor: '#443581',
    opacity: 0.18,
  },
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
    color: '#927cff',
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
    backgroundColor: '#ff4c92',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 18,
    gap: 12,
  },
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
    color: '#9998ad',
    fontSize: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
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
  panel: {
    marginTop: 14,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#181a2b',
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
    backgroundColor: '#2c2e40',
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
    color: '#54df75',
  },
  section: {
    marginTop: 22,
  },
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
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  projectIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectIconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  projectContent: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  flexShrink: {
    flex: 1,
  },
  projectTitle: {
    color: '#f8f7ff',
    fontSize: 15,
    fontWeight: '800',
  },
  projectDescription: {
    color: '#9e9caf',
    fontSize: 12,
    marginTop: 3,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  statusText: {
    color: '#aaa8b8',
    fontSize: 11,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#34364c',
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 6,
  },
  progressPercent: {
    color: '#c2c0cf',
    fontSize: 13,
    width: 34,
  },
  menuDots: {
    color: '#a2a0b3',
    fontSize: 18,
    letterSpacing: 1,
    marginLeft: 2,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#2c2e40',
    marginVertical: 18,
  },
  taskPanel: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: '#181a2b',
    overflow: 'hidden',
  },
  taskRow: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
  },
  taskAccent: {
    position: 'absolute',
    left: 0,
    top: 16,
    bottom: 16,
    width: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  checkCircle: {
    width: 27,
    height: 27,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#aaa8b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#09100b',
    fontSize: 14,
    fontWeight: '900',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    color: '#f8f7ff',
    fontSize: 14,
    fontWeight: '700',
  },
  duePill: {
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  dueText: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressPanel: {
    minHeight: 128,
    marginTop: 18,
    borderRadius: 18,
    padding: 14,
    backgroundColor: '#181a2b',
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
    borderColor: '#626277',
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
