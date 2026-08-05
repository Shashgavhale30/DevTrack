import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { tasks } from '../data/mockData';
import { colors } from '../theme/colors';
import SectionHeader from './SectionHeader';

export default function TasksSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Today's Tasks" />
      <View style={styles.taskPanel}>
        {tasks.map((task, index) => (
          <View key={task.title}>
            <TaskRow task={task} />
            {index < tasks.length - 1 ? <View style={styles.rowDivider} /> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

function TaskRow({ task }) {
  return (
    <View style={styles.taskRow}>
      <View style={[styles.taskAccent, { backgroundColor: task.accent }]} />
      <View
        style={[
          styles.checkCircle,
          task.done && { backgroundColor: task.accent, borderColor: task.accent },
        ]}>
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
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 22,
  },
  taskPanel: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: colors.panel,
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
  projectDescription: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 3,
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
  menuDots: {
    color: '#a2a0b3',
    fontSize: 18,
    letterSpacing: 1,
    marginLeft: 2,
  },
  rowDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 4,
  },
});
