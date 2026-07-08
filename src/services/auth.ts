/**
 * Authentication Service for Regentia Health & Research
 * Provides mock authentication and helper methods that can be seamlessly
 * replaced with API calls to a Spring Boot backend in the future.
 */

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  avatarUrl?: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Simulated network latency (1000ms)
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Email format validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper: Mobile number validation (Indian format/10-digit check)
export function isValidMobile(mobile: string): boolean {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
}

// Helper: Password strength indicator check
export interface PasswordStrengthResult {
  score: number; // 0 to 4
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string; // Tailwind color class names
  feedback: string[];
}

export function checkPasswordStrength(password: string): PasswordStrengthResult {
  let score = 0;
  const feedback: string[] = [];

  if (!password) {
    return { score: 0, label: 'Weak', color: 'bg-red-500', feedback: ['Password is required'] };
  }

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Must be at least 8 characters long');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add an uppercase letter');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add a number');
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add a special character (e.g. @, #, $, etc.)');
  }

  let label: PasswordStrengthResult['label'] = 'Weak';
  let color = 'bg-red-500';

  if (score === 2) {
    label = 'Fair';
    color = 'bg-orange-500';
  } else if (score === 3) {
    label = 'Good';
    color = 'bg-yellow-500';
  } else if (score === 4) {
    label = 'Strong';
    color = 'bg-emerald-500';
  }

  return { score, label, color, feedback };
}

export const authService = {
  /**
   * Logs a user in with credentials
   */
  async login(email: string, password: string, _rememberMe = false): Promise<AuthResponse> {
    await delay(1200);

    if (!isValidEmail(email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    // Accept any user during mock authentication, except standard error test accounts
    if (email === 'error@regentia.com') {
      return { success: false, message: 'Invalid credentials. Please try again.' };
    }

    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      fullName: email.split('@')[0].split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' '),
      email: email.toLowerCase(),
      mobileNumber: '9876543210',
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email)}`,
      role: 'USER'
    };

    return {
      success: true,
      message: 'Login successful.',
      user: mockUser,
      token: 'mock-jwt-token-string-xyz'
    };
  },

  /**
   * Registers a new user
   */
  async signup(fullName: string, email: string, mobileNumber: string, password: string): Promise<AuthResponse> {
    await delay(1500);

    if (!fullName || fullName.trim().length < 2) {
      return { success: false, message: 'Name must be at least 2 characters.' };
    }

    if (!isValidEmail(email)) {
      return { success: false, message: 'Invalid email address.' };
    }

    if (!isValidMobile(mobileNumber)) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number starting with 6-9.' };
    }

    const strength = checkPasswordStrength(password);
    if (strength.score < 2) {
      return { success: false, message: 'Please choose a stronger password.' };
    }

    if (email === 'exists@regentia.com') {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      mobileNumber: mobileNumber,
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email)}`,
      role: 'USER'
    };

    return {
      success: true,
      message: 'Account created successfully. A verification link has been sent to your email.',
      user: mockUser,
      token: 'mock-jwt-token-string-xyz'
    };
  },

  /**
   * Logs out the user
   */
  async logout(): Promise<AuthResponse> {
    await delay(500);
    return {
      success: true,
      message: 'Logged out successfully.'
    };
  },

  /**
   * Requests a password reset link
   */
  async forgotPassword(email: string): Promise<AuthResponse> {
    await delay(1000);

    if (!isValidEmail(email)) {
      return { success: false, message: 'Invalid email address.' };
    }

    return {
      success: true,
      message: 'If the account exists, a password reset link has been sent to your email.'
    };
  },

  /**
   * Resets the user's password
   */
  async resetPassword(password: string): Promise<AuthResponse> {
    await delay(1200);

    const strength = checkPasswordStrength(password);
    if (strength.score < 2) {
      return { success: false, message: 'Please choose a stronger password.' };
    }

    return {
      success: true,
      message: 'Your password has been reset successfully. You can now log in.'
    };
  },

  /**
   * Verifies the email address
   */
  async verifyEmail(): Promise<AuthResponse> {
    await delay(1500);
    return {
      success: true,
      message: 'Your email address has been verified successfully.'
    };
  }
};
