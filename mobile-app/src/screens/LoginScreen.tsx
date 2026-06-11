import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
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
import type { LoginProvider, Registration } from '../types';

const loginProviders: Array<{ id: LoginProvider; label: string; icon: string }> = [
  { id: 'email', label: 'Email', icon: '@' },
  { id: 'google', label: 'Google', icon: 'G' },
  { id: 'github', label: 'GitHub', icon: 'GH' },
  { id: 'leetcode', label: 'LeetCode', icon: 'LC' },
];

function LoginScreen({
  onLogin,
  onRegister,
}: {
  onLogin: (registration: Registration) => void;
  onRegister: () => void;
}) {
  const [email, setEmail] = useState('');
  const [loginProvider, setLoginProvider] = useState<LoginProvider>('email');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), [email]);

  const submit = async () => {
    if (!emailValid) {
      setError('Enter the same valid email used during registration.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const data = await postApi('/api/registrations/login', {
        email: email.trim().toLowerCase(),
        loginProvider,
      });
      onLogin(data.registration);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed.');
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
          <Text style={styles.kicker}>Welcome Back</Text>
          <Text style={styles.title}>Log in with your registered account.</Text>
          <Text style={styles.subtitle}>
            Use the same email and login method you selected during registration.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.group}>
            <Text style={styles.label}>Registered email ID</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="name@example.com"
              placeholderTextColor="#77758A"
              style={[styles.input, email.length > 0 && !emailValid && styles.inputError]}
            />
          </View>

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
              <Text style={styles.submitText}>Log in</Text>
            )}
          </Pressable>

          <Pressable style={({ pressed }) => [styles.registerLink, pressed && styles.pressed]} onPress={onRegister}>
            <Text style={styles.registerText}>Create a new account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#080A12',
  },
  content: {
    flexGrow: 1,
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
    marginTop: 54,
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
    marginTop: 18,
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
  registerLink: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: '#4BA3FF',
    fontSize: 14,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.78,
  },
});

export default LoginScreen;
