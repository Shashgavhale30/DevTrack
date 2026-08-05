import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { projects } from '../data/mockData';
import { colors } from '../theme/colors';
import SectionHeader from './SectionHeader';

export default function ProjectsSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Active Projects" />
      <View style={styles.panel}>
        {projects.map((project, index) => (
          <View key={project.name}>
            <ProjectRow project={project} />
            {index < projects.length - 1 ? <View style={styles.rowDivider} /> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

function ProjectRow({ project }) {
  return (
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
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 22,
  },
  panel: {
    marginTop: 14,
    borderRadius: 16,
    padding: 12,
    backgroundColor: colors.panel,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 4,
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
    color: colors.textMuted,
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
    backgroundColor: colors.track,
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
    backgroundColor: colors.divider,
    marginVertical: 18,
  },
});
