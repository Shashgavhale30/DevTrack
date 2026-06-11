export type LoginProvider = 'email' | 'google' | 'github' | 'leetcode';
export type PlatformName = 'google' | 'github' | 'leetcode';
export type MainScreen =
  | 'Home'
  | 'Tasks'
  | 'Profile'
  | 'GitHub'
  | 'LeetCode'
  | 'VS Code'
  | 'Settings'
  | 'Resources';

export type PlatformAccount = {
  platform: PlatformName;
  usesSameEmail: boolean;
  platformId: string;
};

export type Registration = {
  _id: string;
  email: string;
  fullName: string;
  loginProvider: LoginProvider;
  platformAccounts: PlatformAccount[];
  createdAt?: string;
  updatedAt?: string;
};
