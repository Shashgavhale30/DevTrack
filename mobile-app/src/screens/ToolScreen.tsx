import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NavBar from '../NavBar';
import type { MainScreen, PlatformName, Registration } from '../types';

type ToolScreenProps = {
  accent: string;
  activeScreen: MainScreen;
  description: string;
  icon: string;
  metricLabel: string;
  metricValue: string;
  onNavigate: (screen: MainScreen) => void;
  platform?: PlatformName;
  title: string;
  user: Registration | null;
};

function ToolScreen({
  accent,
  activeScreen,
  description,
  icon,
  metricLabel,
  metricValue,
  onNavigate,
  platform,
  title,
  user,
}: ToolScreenProps) {
  const platformAccount = platform
    ? user?.platformAccounts.find(account => account.platform === platform)
    : null;
  const profileId = platformAccount
    ? platformAccount.usesSameEmail
      ? user?.email
      : platformAccount.platformId
    : 'Not connected';

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#070914" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={[styles.iconBox, { backgroundColor: accent }]}>
            <Text style={styles.iconText}>{icon}</Text>
          </View>
          <View style={styles.headerCopy}>
            <Text style={styles.kicker}>{user?.fullName || 'Developer'}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{description}</Text>
          <View style={styles.heroMeta}>
            <Metric label="Registered email" value={user?.email || 'No user loaded'} />
            <Metric label={metricLabel} value={metricValue} />
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelEyebrow}>Account Source</Text>
          <Text style={styles.panelTitle}>{platform ? title : 'DevTrack'}</Text>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Login method</Text>
            <Text style={styles.accountValue}>{formatProvider(user?.loginProvider)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>
              {platformAccount?.usesSameEmail ? 'Same email' : 'Platform ID'}
            </Text>
            <Text style={styles.accountValue}>{profileId}</Text>
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelEyebrow}>Next Sync</Text>
          <Text style={styles.panelTitle}>Ready for API integration</Text>
          <Text style={styles.bodyText}>
            This page is connected to the registered user record. The next step is adding the real service API or OAuth
            credentials for live activity.
          </Text>
        </View>
      </ScrollView>

      <NavBar activeScreen={activeScreen} onNavigate={onNavigate} />
    </SafeAreaView>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#070914',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 110,
  },
  header: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#10121D',
    fontSize: 13,
    fontWeight: '900',
  },
  headerCopy: {
    flex: 1,
  },
  kicker: {
    color: '#9F9BAF',
    fontSize: 12,
    fontWeight: '800',
  },
  title: {
    marginTop: 3,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  hero: {
    marginTop: 18,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#15182A',
    borderWidth: 1,
    borderColor: '#292D43',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '900',
  },
  heroMeta: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },
  metric: {
    flex: 1,
    minHeight: 76,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#1A1D2F',
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  metricLabel: {
    marginTop: 7,
    color: '#9693A7',
    fontSize: 11,
    fontWeight: '800',
  },
  panel: {
    marginTop: 14,
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#171A2B',
    borderWidth: 1,
    borderColor: '#25283C',
  },
  panelEyebrow: {
    color: '#FFD64A',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  panelTitle: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },
  accountRow: {
    minHeight: 46,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  accountLabel: {
    color: '#A7A3B6',
    fontSize: 13,
    fontWeight: '800',
  },
  accountValue: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '900',
  },
  divider: {
    height: 1,
    backgroundColor: '#2B2E43',
  },
  bodyText: {
    marginTop: 10,
    color: '#BDB9D1',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '700',
  },
});

export default ToolScreen;
