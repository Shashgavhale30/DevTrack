import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../theme/colors';
import { saveUser } from '../data/userStore';

function Onboarding({ onComplete }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [github, setGithub] = useState('');
  const [leetcode, setLeetcode] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in your name, email and password.');
      return;
    }
    if (!github.trim() && !leetcode.trim()) {
      setError('Connect at least one account (GitHub or LeetCode).');
      return;
    }

    setError('');
    saveUser({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      github: github.trim(),
      leetcode: leetcode.trim(),
    });
    onComplete();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={colors.screen} />
      <View style={styles.backgroundGlowTop} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.brand}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>{'</>'}</Text>
          </View>
          <Text style={styles.logo}>
            Dev<Text style={styles.logoAccent}>Track</Text>
          </Text>
          <Text style={styles.tagline}>
            Your developer productivity dashboard.
          </Text>
        </View>

        <Text style={styles.heading}>Create your account</Text>
        <Text style={styles.subheading}>
          Join to track your coding activity, projects and daily goals. Connect
          your developer accounts to get started.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Arjun"
            placeholderTextColor={colors.textFaint}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={colors.textFaint}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Minimum 6 characters"
            placeholderTextColor={colors.textFaint}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Connect your accounts</Text>
          <Text style={styles.sectionHint}>
            These are used to pull your activity, contributions and problem-solving stats.
          </Text>

          <Text style={styles.label}>GitHub username</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. octocat"
            placeholderTextColor={colors.textFaint}
            value={github}
            onChangeText={setGithub}
            autoCapitalize="none"
          />

          <Text style={styles.label}>LeetCode username</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. leetcoder"
            placeholderTextColor={colors.textFaint}
            value={leetcode}
            onChangeText={setLeetcode}
            autoCapitalize="none"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleRegister}>
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  backgroundGlowTop: {
    position: 'absolute',
    top: -80,
    left: -40,
    right: -40,
    height: 300,
    backgroundColor: colors.backgroundGlowTop,
    opacity: 0.65,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 48,
  },
  brand: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoBadgeText: {
    color: colors.yellow,
    fontSize: 22,
    fontWeight: '900',
  },
  logo: {
    color: '#f7f5ff',
    fontSize: 32,
    fontWeight: '800',
  },
  logoAccent: {
    color: colors.accentText,
  },
  tagline: {
    marginTop: 6,
    color: colors.textFaint,
    fontSize: 15,
  },
  heading: {
    color: '#f7f5ff',
    fontSize: 22,
    fontWeight: '800',
  },
  subheading: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  form: {
    marginTop: 24,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: colors.panel,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#f7f5ff',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 22,
  },
  sectionTitle: {
    color: '#f7f5ff',
    fontSize: 17,
    fontWeight: '800',
  },
  sectionHint: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  error: {
    marginTop: 14,
    color: colors.pink,
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    marginTop: 26,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: colors.yellow,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#10121d',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default Onboarding;
