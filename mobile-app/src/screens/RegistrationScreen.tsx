import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { postApi } from '../api';
import type { LoginProvider, PlatformName, Registration } from '../types';

type PlatformAnswer = {
  platform: PlatformName;
  usesSameEmail: boolean | null;
  platformId: string;
};

const loginProviders: Array<{ id: LoginProvider; label: string; icon: string }> = [
  { id: 'email', label: 'Email', icon: '@' },
  { id: 'google', label: 'Google', icon: 'G' },
  { id: 'github', label: 'GitHub', icon: 'GH' },
  { id: 'leetcode', label: 'LeetCode', icon: 'LC' },
];

const platformLabels: Record<PlatformName, string> = {
  google: 'Google',
  github: 'GitHub',
  leetcode: 'LeetCode',
};

const initialPlatformAnswers: PlatformAnswer[] = [
  { platform: 'google', usesSameEmail: null, platformId: '' },
  { platform: 'github', usesSameEmail: null, platformId: '' },
  { platform: 'leetcode', usesSameEmail: null, platformId: '' },
];

function RegistrationScreen({
  onRegistered,
  onLogin,
}: {
  onRegistered: (registration: Registration) => void;
  onLogin: () => void;
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loginProvider, setLoginProvider] = useState<LoginProvider>('email');
  const [platformAnswers, setPlatformAnswers] = useState(initialPlatformAnswers);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), [email]);

  const updatePlatform = (
    platform: PlatformName,
    patch: Partial<Omit<PlatformAnswer, 'platform'>>,
  ) => {
    setPlatformAnswers(current =>
      current.map(answer =>
        answer.platform === platform ? { ...answer, ...patch } : answer,
      ),
    );
  };

  const validate = () => {
    if (!fullName.trim()) {
      return 'Enter your full name.';
    }

    if (!emailValid) {
      return 'Enter a valid email address.';
    }

    const unanswered = platformAnswers.find(answer => answer.usesSameEmail === null);
    if (unanswered) {
      return `Choose whether your ${platformLabels[unanswered.platform]} account uses this same email.`;
    }

    const missingId = platformAnswers.find(
      answer => answer.usesSameEmail === false && !answer.platformId.trim(),
    );
    if (missingId) {
      return `Enter your ${platformLabels[missingId.platform]} ID.`;
    }

    return '';
  };

  const submit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError('');

    const payload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      loginProvider,
      platformAccounts: platformAnswers.map(answer => ({
        platform: answer.platform,
        usesSameEmail: Boolean(answer.usesSameEmail),
        platformId: answer.usesSameEmail ? '' : answer.platformId.trim(),
      })),
    };

    try {
      const registration = await postApi('/api/registrations', payload);
      Alert.alert('Registration saved', 'Your DevTrack account is ready.');
      onRegistered(registration);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#080A12" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>D</Text>
          </View>
          <Text style={styles.logo}>
            Dev<Text style={styles.logoAccent}>Track</Text>
          </Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.kicker}>Create Account</Text>
          <Text style={styles.title}>Connect your coding identity.</Text>
          <Text style={styles.subtitle}>
            Use one email for DevTrack, then tell us how your Google, GitHub, and LeetCode accounts match it.
          </Text>
        </View>

        <View style={styles.form}>
          <Field label="Full name">
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Your name"
              placeholderTextColor="#77758A"
              style={styles.input}
            />
          </Field>

          <Field label="Valid email ID">
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="name@example.com"
              placeholderTextColor="#77758A"
              style={[styles.input, email.length > 0 && !emailValid && styles.inputError]}
            />
          </Field>

          <View style={styles.group}>
            <Text style={styles.label}>Login through</Text>
            <View style={styles.providerGrid}>
              {loginProviders.map(provider => {
                const active = loginProvider === provider.id;

                return (
                  <Pressable
                    key={provider.id}
                    style={({ pressed }) => [
                      styles.providerButton,
                      active && styles.providerButtonActive,
                      pressed && styles.pressed,
                    ]}
                    onPress={() => setLoginProvider(provider.id)}>
                    <Text style={[styles.providerIcon, active && styles.providerTextActive]}>
                      {provider.icon}
                    </Text>
                    <Text style={[styles.providerText, active && styles.providerTextActive]}>
                      {provider.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Platform account emails</Text>
            {platformAnswers.map(answer => (
              <View key={answer.platform} style={styles.platformPanel}>
                <View style={styles.platformHeader}>
                  <Text style={styles.platformTitle}>{platformLabels[answer.platform]}</Text>
                  <Text style={styles.platformHint}>Registered with same email?</Text>
                </View>
                <View style={styles.choiceRow}>
                  <ChoiceButton
                    label="Same"
                    active={answer.usesSameEmail === true}
                    onPress={() => updatePlatform(answer.platform, { usesSameEmail: true, platformId: '' })}
                  />
                  <ChoiceButton
                    label="Different"
                    active={answer.usesSameEmail === false}
                    onPress={() => updatePlatform(answer.platform, { usesSameEmail: false })}
                  />
                </View>
                {answer.usesSameEmail === false ? (
                  <TextInput
                    value={answer.platformId}
                    onChangeText={platformId => updatePlatform(answer.platform, { platformId })}
                    autoCapitalize="none"
                    placeholder={`${platformLabels[answer.platform]} username or profile ID`}
                    placeholderTextColor="#77758A"
                    style={styles.input}
                  />
                ) : null}
              </View>
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            disabled={submitting}
            style={({ pressed }) => [
              styles.submitButton,
              submitting && styles.submitDisabled,
              pressed && styles.pressed,
            ]}
            onPress={submit}>
            {submitting ? (
              <ActivityIndicator color="#10121D" />
            ) : (
              <Text style={styles.submitText}>Create account</Text>
            )}
          </Pressable>

          <Pressable style={({ pressed }) => [styles.loginLink, pressed && styles.pressed]} onPress={onLogin}>
            <Text style={styles.loginText}>Already registered? Log in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

function ChoiceButton({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.choiceButton,
        active && styles.choiceButtonActive,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#080A12',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 34,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: 10,
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
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  logoAccent: {
    color: '#4BA3FF',
  },
  hero: {
    marginTop: 18,
    paddingBottom: 12,
  },
  kicker: {
    color: '#FFD64A',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 10,
    color: '#BDB9D1',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
  form: {
    marginTop: 12,
    gap: 16,
  },
  group: {
    gap: 9,
  },
  label: {
    color: '#ECEAF7',
    fontSize: 13,
    fontWeight: '900',
  },
  input: {
    minHeight: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2B2E43',
    backgroundColor: '#15182A',
    color: '#FFFFFF',
    paddingHorizontal: 13,
    fontSize: 15,
    fontWeight: '700',
  },
  inputError: {
    borderColor: '#FF668F',
  },
  providerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  providerButton: {
    width: '48%',
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2B2E43',
    backgroundColor: '#15182A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
  },
  providerButtonActive: {
    borderColor: '#FFD64A',
    backgroundColor: '#2A271B',
  },
  providerIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    color: '#FFD64A',
    backgroundColor: '#24283C',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 11,
    fontWeight: '900',
  },
  providerText: {
    color: '#DCD8EA',
    fontSize: 14,
    fontWeight: '900',
  },
  providerTextActive: {
    color: '#FFD64A',
  },
  platformPanel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2B2E43',
    backgroundColor: '#15182A',
    padding: 12,
    gap: 12,
  },
  platformHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  platformTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  platformHint: {
    flex: 1,
    color: '#9F9BAF',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '700',
  },
  choiceRow: {
    flexDirection: 'row',
    gap: 8,
  },
  choiceButton: {
    flex: 1,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22253A',
  },
  choiceButtonActive: {
    backgroundColor: '#4BA3FF',
  },
  choiceText: {
    color: '#C9C5D7',
    fontSize: 13,
    fontWeight: '900',
  },
  choiceTextActive: {
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FF7A9C',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
  },
  submitButton: {
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD64A',
  },
  submitDisabled: {
    opacity: 0.72,
  },
  submitText: {
    color: '#10121D',
    fontSize: 16,
    fontWeight: '900',
  },
  loginLink: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#4BA3FF',
    fontSize: 14,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.78,
  },
});

export default RegistrationScreen;
