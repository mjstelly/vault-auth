import { useState, type FormEvent } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import heroImg from '../assets/hero.png';
import { useAuth } from '../hooks/useAuth';
import { SocialButtons } from '../components/SocialButtons';
import styles from './LoginPage.module.css';

function isSignupSuccessState(s: unknown): s is { signupSuccess: boolean } {
  // `in` narrows to `object` but not the field type; cast required to read the value
  return typeof s === 'object' && s !== null && 'signupSuccess' in s && (s as Record<string, unknown>)['signupSuccess'] === true;
}

export function LoginPage() {
  const { isAuthenticated, login, error, clearError } = useAuth();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signupSuccess =
    isSignupSuccessState(location.state) && location.state.signupSuccess;

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    await login({ username: username.trim(), password });
    setIsSubmitting(false);
    // On success, isAuthenticated becomes true and the guard above redirects to /dashboard
  }

  function handleUsernameChange(val: string) {
    setUsername(val);
    clearError();
  }

  function handlePasswordChange(val: string) {
    setPassword(val);
    clearError();
  }

  return (
    <div className={styles.page}>
      <div className={styles.imageCol}>
        <img src={heroImg} alt="" className={styles.heroImg} />
      </div>
      <div className={styles.contentCol}>
        <h1 className={styles.heading}>Sign In</h1>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {signupSuccess && (
            <div className={styles.successBanner}>
              Account created successfully. Sign in to continue.
            </div>
          )}
          <div className={styles.field}>
            <label htmlFor="login-username" className={styles.label}>
              Username or Email
            </label>
            <input
              id="login-username"
              type="text"
              className={styles.input}
              placeholder="Username or Email"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="login-password" className={styles.label}>
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className={styles.checkboxRow}>
            <div className={styles.checkboxLeft}>
              <input
                id="remember-me"
                type="checkbox"
                className={styles.checkbox}
              />
              <label htmlFor="remember-me" className={styles.checkboxLabel}>
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
          {error && <span className={styles.errorText}>{error}</span>}
          <SocialButtons />
          <hr className={styles.separator} />
          <Link to="/signup" className={styles.signupLink}>
            No account yet? Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}
