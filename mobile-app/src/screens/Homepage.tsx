import React, { useMemo } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import NavBar from '../NavBar';
import type { MainScreen, PlatformAccount, Registration } from '../types';

type Stat = {
  accent: string;
  icon: string;
  label: string;
  value: string;
  helper: string;
};

type Project = {
  accent: string;
  icon: string;
  name: string;
  description: string;
  progress: number;
  meta: string;
};

type Task = {
  accent: string;
  title: string;
  project: string;
  due: string;
  done: boolean;
};

const projects: Project[] = [
  {
    accent: '#8F7BFF',
    icon: 'DT',
    name: 'DevTrack Mobile',
    description: 'Personal developer progress dashboard',
    progress: 72,
    meta: 'React Native',
  },
  {
    accent: '#5BE37D',
    icon: 'WEB',
    name: 'Public Progress Page',
    description: 'Shareable profile for HR and hiring partners',
    progress: 54,
    meta: 'Website',
  },
  {
    accent: '#FFD64A',
    icon: 'AI',
    name: 'AI Code Assistant',
    description: 'VS Code extension for smarter suggestions',
    progress: 38,
    meta: 'Extension',
  },
];

const tasks: Task[] = [
  {
    accent: '#5BE37D',
    title: 'Build dashboard cards',
    project: 'DevTrack Mobile',
    due: 'Today',
    done: true,
  },
  {
    accent: '#FF668F',
    title: 'Design public profile view',
    project: 'Public Progress Page',
    due: 'Today',
    done: false,
  },
  {
    accent: '#4BA3FF',
    title: 'Connect GitHub activity',
    project: 'DevTrack Mobile',
    due: 'Tomorrow',
    done: false,
  },
];

function Homepage({
  activeScreen,
  onNavigate,
  onLogout,
  user,
}: {
  activeScreen: MainScreen;
  onNavigate: (screen: MainScreen) => void;
  onLogout: () => void;
  user: Registration | null;
}) {
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const greeting = useMemo(() => getGreeting(), []);
  const activity = useMemo(() => buildActivity(), []);
  const displayName = user?.fullName || 'Developer';
  const firstName = displayName.split(' ')[0] || displayName;
  const initials = getInitials(displayName);
  const platformAccounts = user?.platformAccounts || [];
  const stats = useMemo(() => buildStats(user), [user]);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#070914" />
      <View style={styles.glowTop} />
      <View style={styles.glowSide} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Header initials={initials} onLogout={onLogout} />

        <View style={styles.hero}>
          <View style={styles.greetingRow}>
            <Avatar initials={initials} />
            <View style={styles.greetingCopy}>
              <Text style={styles.kicker}>{greeting}, {firstName}</Text>
              <Text style={styles.heroTitle}>Your DevTrack account is connected.</Text>
              <Text style={styles.heroEmail}>{user?.email || 'No email loaded'}</Text>
            </View>
          </View>
          <View style={styles.heroFooter}>
            <Metric label="Login method" value={formatProvider(user?.loginProvider)} />
            <Metric label="Platforms" value={`${platformAccounts.length}/3`} />
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Signed in</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map(stat => (
            <StatCard key={stat.label} compact={compact} stat={stat} />
          ))}
        </View>

        <ActivityCard activity={activity} />
        <PlatformAccountsCard accounts={platformAccounts} />
        <PublicProfileCard user={user} />
        <ProjectsSection />
        <TasksSection />
      </ScrollView>

      <NavBar activeScreen={activeScreen} onNavigate={onNavigate} />
      <View style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </View>
    </SafeAreaView>
  );
}

function Header({ initials, onLogout }: { initials: string; onLogout: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.brandMark}>
        <Text style={styles.brandMarkText}>D</Text>
      </View>
      <Text style={styles.logo}>
        Dev<Text style={styles.logoAccent}>Track</Text>
      </Text>
      <View style={styles.headerActions}>
        <Text style={styles.headerButton}>{initials}</Text>
        <View style={styles.headerBell}>
          <Text style={styles.headerButton}>NT</Text>
          <View style={styles.notificationDot} />
        </View>
        <Pressable style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]} onPress={onLogout}>
          <Text style={styles.logoutText}>OUT</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function StatCard({ stat, compact }: { stat: Stat; compact: boolean }) {
  return (
    <View style={[styles.statCard, compact && styles.statCardCompact]}>
      <View style={[styles.statIcon, { backgroundColor: `${stat.accent}22` }]}>
        <Text style={[styles.statIconText, { color: stat.accent }]}>{stat.icon}</Text>
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
      <Text style={[styles.statHelper, { color: stat.accent }]}>{stat.helper}</Text>
    </View>
  );
}

function ActivityCard({ activity }: { activity: number[][] }) {
  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <View>
          <Text style={styles.panelEyebrow}>GitHub Activity</Text>
          <Text style={styles.panelTitle}>Consistency map</Text>
        </View>
        <View style={styles.rangePill}>
          <Text style={styles.rangeText}>This week</Text>
        </View>
      </View>

      <View style={styles.activityRows}>
        {activity.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.activityRow}>
            <Text style={styles.activityDate}>{['Mar 31', 'Apr 7', 'Apr 14', 'Apr 21'][rowIndex]}</Text>
            <View style={styles.activityCells}>
              {row.map((level, columnIndex) => (
                <View
                  key={`${rowIndex}-${columnIndex}`}
                  style={[styles.activityCell, getActivityCellStyle(level)]}
                />
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.activityFooter}>
        <Metric label="Longest streak" value="12 days" />
        <Metric label="Contributions" value="186" />
      </View>
    </View>
  );
}

function PlatformAccountsCard({ accounts }: { accounts: PlatformAccount[] }) {
  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <View>
          <Text style={styles.panelEyebrow}>Registered Accounts</Text>
          <Text style={styles.panelTitle}>Platform identity</Text>
        </View>
        <View style={styles.rangePill}>
          <Text style={styles.rangeText}>{accounts.length} linked</Text>
        </View>
      </View>
      <View style={styles.accountRows}>
        {accounts.map(account => (
          <View key={account.platform} style={styles.accountRow}>
            <View style={styles.accountIcon}>
              <Text style={styles.accountIconText}>{getPlatformIcon(account.platform)}</Text>
            </View>
            <View style={styles.accountContent}>
              <Text style={styles.accountTitle}>{formatProvider(account.platform)}</Text>
              <Text style={styles.accountDescription}>
                {account.usesSameEmail ? 'Uses registration email' : account.platformId}
              </Text>
            </View>
            <View style={[styles.accountBadge, !account.usesSameEmail && styles.accountBadgeAlt]}>
              <Text style={styles.accountBadgeText}>
                {account.usesSameEmail ? 'Same' : 'ID'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function PublicProfileCard({ user }: { user: Registration | null }) {
  const slug = buildSlug(user?.fullName || user?.email || 'developer');

  return (
    <View style={styles.publicCard}>
      <View style={styles.publicCopy}>
        <Text style={styles.publicEyebrow}>Public Web Page</Text>
        <Text style={styles.publicTitle}>Hiring-ready progress profile</Text>
        <Text style={styles.publicText}>
          Share {user?.fullName || 'your'} live progress with HR, recruiters, mentors, and hiring partners.
        </Text>
      </View>
      <View style={styles.publicPreview}>
        <Text style={styles.previewUrl}>devtrack.dev/{slug}</Text>
        <View style={styles.previewLineWide} />
        <View style={styles.previewLine} />
        <View style={styles.previewStats}>
          <Text style={styles.previewStat}>12d</Text>
          <Text style={styles.previewStat}>84</Text>
          <Text style={styles.previewStat}>7</Text>
        </View>
      </View>
    </View>
  );
}

function ProjectsSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Active Projects" action="View all" />
      <View style={styles.panelTight}>
        {projects.map((project, index) => (
          <View key={project.name}>
            <View style={styles.projectRow}>
              <View style={[styles.projectIcon, { backgroundColor: project.accent }]}>
                <Text style={styles.projectIconText}>{project.icon}</Text>
              </View>
              <View style={styles.projectContent}>
                <View style={styles.rowBetween}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                  <Text style={styles.projectMeta}>{project.meta}</Text>
                </View>
                <Text style={styles.projectDescription}>{project.description}</Text>
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
      <SectionHeader title="Today's Tasks" action="Add" />
      <View style={styles.panelTight}>
        {tasks.map((task, index) => (
          <View key={task.title}>
            <View style={styles.taskRow}>
              <View style={[styles.checkCircle, task.done && { backgroundColor: task.accent, borderColor: task.accent }]}>
                <Text style={[styles.checkText, task.done && styles.checkTextDone]}>
                  {task.done ? 'OK' : ''}
                </Text>
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.projectDescription}>{task.project}</Text>
              </View>
              <View style={[styles.duePill, { backgroundColor: `${task.accent}20` }]}>
                <Text style={[styles.dueText, { color: task.accent }]}>{task.due}</Text>
              </View>
            </View>
            {index < tasks.length - 1 ? <View style={styles.rowDivider} /> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

function SectionHeader({ title, action }: { title: string; action: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionAction}>{action}</Text>
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

function buildStats(user: Registration | null): Stat[] {
  const sameEmailCount = user?.platformAccounts.filter(account => account.usesSameEmail).length || 0;
  const differentEmailCount = user?.platformAccounts.filter(account => !account.usesSameEmail).length || 0;

  return [
    {
      accent: '#5BE37D',
      icon: 'OK',
      label: 'Account',
      value: user ? 'Live' : 'Guest',
      helper: 'MongoDB loaded',
    },
    {
      accent: '#8F7BFF',
      icon: 'IN',
      label: 'Login',
      value: formatProvider(user?.loginProvider),
      helper: 'Registered method',
    },
    {
      accent: '#FF668F',
      icon: 'SM',
      label: 'Same Mail',
      value: String(sameEmailCount),
      helper: 'Platform matches',
    },
    {
      accent: '#4BA3FF',
      icon: 'ID',
      label: 'Alt IDs',
      value: String(differentEmailCount),
      helper: 'Different email',
    },
  ];
}

function formatProvider(provider?: string) {
  if (!provider) {
    return 'None';
  }

  if (provider === 'github') {
    return 'GitHub';
  }

  if (provider === 'leetcode') {
    return 'LeetCode';
  }

  return provider.charAt(0).toUpperCase() + provider.slice(1);
}

function getPlatformIcon(platform: string) {
  if (platform === 'github') {
    return 'GH';
  }

  if (platform === 'leetcode') {
    return 'LC';
  }

  return 'G';
}

function getInitials(name: string) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');

  return initials || 'DV';
}

function buildSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/@.*$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'developer';
}

function buildActivity() {
  const today = new Date();
  const seed = today.getDate() + today.getMonth() * 7;

  return Array.from({ length: 4 }, (_row, row) =>
    Array.from({ length: 22 }, (_column, column) => {
      const value = (row * 13 + column * 5 + seed) % 10;
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
        ? '#272A3D'
        : level === 1
          ? '#24533E'
          : level === 2
            ? '#32A662'
            : '#65EB83',
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#070914',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 120,
  },
  glowTop: {
    position: 'absolute',
    top: -120,
    left: -80,
    right: -80,
    height: 320,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    backgroundColor: '#242141',
    opacity: 0.82,
  },
  glowSide: {
    position: 'absolute',
    right: -120,
    top: 250,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#7C5CFF',
    opacity: 0.13,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD64A',
  },
  brandMarkText: {
    color: '#10121D',
    fontSize: 18,
    fontWeight: '900',
  },
  logo: {
    flex: 1,
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  logoAccent: {
    color: '#A18CFF',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  headerButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    color: '#E8E6F6',
    backgroundColor: '#1A1D2F',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 11,
    fontWeight: '900',
  },
  headerBell: {
    position: 'relative',
  },
  logoutButton: {
    width: 42,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#332232',
  },
  logoutText: {
    color: '#FF8AA7',
    fontSize: 10,
    fontWeight: '900',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF668F',
  },
  hero: {
    marginTop: 16,
    borderRadius: 26,
    padding: 18,
    backgroundColor: '#15182A',
    borderWidth: 1,
    borderColor: '#292D43',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A18CFF',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  greetingCopy: {
    flex: 1,
  },
  kicker: {
    color: '#BDB9D1',
    fontSize: 14,
    fontWeight: '700',
  },
  heroEmail: {
    marginTop: 6,
    color: '#8F8BA0',
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
  },
  heroFooter: {
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2B2E43',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  metricLabel: {
    marginTop: 3,
    color: '#9693A7',
    fontSize: 11,
    fontWeight: '700',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#213529',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5BE37D',
  },
  liveText: {
    color: '#73ED8F',
    fontSize: 11,
    fontWeight: '900',
  },
  statsGrid: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 8,
  },
  statCard: {
    flex: 1,
    minHeight: 122,
    borderRadius: 18,
    padding: 10,
    backgroundColor: '#171A2B',
    borderWidth: 1,
    borderColor: '#25283C',
  },
  statCardCompact: {
    padding: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  statIconText: {
    fontSize: 11,
    fontWeight: '900',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '900',
  },
  statLabel: {
    marginTop: 3,
    color: '#BBB8C9',
    fontSize: 11,
    fontWeight: '700',
  },
  statHelper: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '800',
  },
  panel: {
    marginTop: 14,
    borderRadius: 22,
    padding: 14,
    backgroundColor: '#171A2B',
    borderWidth: 1,
    borderColor: '#25283C',
  },
  panelTight: {
    marginTop: 12,
    borderRadius: 22,
    padding: 14,
    backgroundColor: '#171A2B',
    borderWidth: 1,
    borderColor: '#25283C',
  },
  panelHeader: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panelEyebrow: {
    color: '#8F7BFF',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  panelTitle: {
    marginTop: 4,
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },
  rangePill: {
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 8,
    backgroundColor: '#22253A',
  },
  rangeText: {
    color: '#C9C5D7',
    fontSize: 11,
    fontWeight: '800',
  },
  activityRows: {
    gap: 7,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDate: {
    width: 48,
    color: '#9F9BAF',
    fontSize: 11,
    fontWeight: '700',
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
  activityFooter: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#2B2E43',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  accountRows: {
    gap: 12,
  },
  accountRow: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  accountIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#24283C',
  },
  accountIconText: {
    color: '#FFD64A',
    fontSize: 11,
    fontWeight: '900',
  },
  accountContent: {
    flex: 1,
  },
  accountTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  accountDescription: {
    marginTop: 3,
    color: '#A7A3B6',
    fontSize: 12,
    fontWeight: '700',
  },
  accountBadge: {
    minWidth: 48,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 7,
    backgroundColor: '#213529',
  },
  accountBadgeAlt: {
    backgroundColor: '#213044',
  },
  accountBadgeText: {
    color: '#73ED8F',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '900',
  },
  publicCard: {
    marginTop: 14,
    borderRadius: 24,
    padding: 16,
    backgroundColor: '#8F7BFF',
    flexDirection: 'row',
    gap: 14,
  },
  publicCopy: {
    flex: 1,
  },
  publicEyebrow: {
    color: '#ECE7FF',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  publicTitle: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900',
  },
  publicText: {
    marginTop: 8,
    color: '#EEEAFE',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  publicPreview: {
    width: 120,
    borderRadius: 18,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  previewUrl: {
    color: '#171A2B',
    fontSize: 10,
    fontWeight: '900',
  },
  previewLineWide: {
    marginTop: 13,
    width: '88%',
    height: 7,
    borderRadius: 4,
    backgroundColor: '#DCD6FF',
  },
  previewLine: {
    marginTop: 7,
    width: '62%',
    height: 7,
    borderRadius: 4,
    backgroundColor: '#ECE9FF',
  },
  previewStats: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewStat: {
    width: 28,
    height: 28,
    borderRadius: 9,
    color: '#171A2B',
    backgroundColor: '#FFD64A',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 10,
    fontWeight: '900',
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  sectionAction: {
    color: '#FFD64A',
    fontSize: 13,
    fontWeight: '900',
  },
  projectRow: {
    flexDirection: 'row',
    gap: 12,
  },
  projectIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectIconText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  projectContent: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  projectTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  projectMeta: {
    color: '#9F9BAF',
    fontSize: 11,
    fontWeight: '800',
  },
  projectDescription: {
    marginTop: 4,
    color: '#A7A3B6',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  progressRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressTrack: {
    flex: 1,
    height: 7,
    borderRadius: 999,
    backgroundColor: '#2D3148',
    overflow: 'hidden',
  },
  progressFill: {
    height: 7,
    borderRadius: 999,
  },
  progressPercent: {
    width: 34,
    color: '#D7D3E4',
    fontSize: 12,
    fontWeight: '900',
  },
  rowDivider: {
    height: 1,
    marginVertical: 16,
    backgroundColor: '#2B2E43',
  },
  taskRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  checkCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#55596F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#55596F',
    fontSize: 10,
    fontWeight: '900',
  },
  checkTextDone: {
    color: '#07130B',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  duePill: {
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  dueText: {
    fontSize: 11,
    fontWeight: '900',
  },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 82,
    width: 58,
    height: 58,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD64A',
    shadowColor: '#000',
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 18,
    elevation: 10,
  },
  fabText: {
    color: '#10121D',
    fontSize: 38,
    lineHeight: 40,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
});

export default Homepage;
