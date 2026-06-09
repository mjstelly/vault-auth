import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.png';
import { signupUser } from '../api/auth';
import { SocialButtons } from '../components/SocialButtons';
import styles from './SignupPage.module.css';

export function SignupPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();
    if (!trimmedFirst || !trimmedLast || !trimmedEmail || !password) {
      setError('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await signupUser({
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: trimmedEmail,
        password,
        username: trimmedEmail,
      });
      navigate('/login', { state: { signupSuccess: true } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.imageCol}>
        <img src={heroImg} alt="" className={styles.heroImg} />
      </div>
      <div className={styles.contentCol}>
        <h1 className={styles.heading}>Sign Up</h1>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.nameRow}>
            <div className={styles.nameField}>
              <label htmlFor="signup-first-name" className={styles.label}>
                First Name
              </label>
              <input
                id="signup-first-name"
                type="text"
                className={styles.input}
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </div>
            <div className={styles.nameField}>
              <label htmlFor="signup-last-name" className={styles.label}>
                Last Name
              </label>
              <input
                id="signup-last-name"
                type="text"
                className={styles.input}
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="signup-email" className={styles.label}>
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              className={styles.input}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="signup-password" className={styles.label}>
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.checkboxRow}>
            <input
              id="signup-terms"
              type="checkbox"
              className={styles.checkbox}
            />
            <label htmlFor="signup-terms" className={styles.checkboxLabel}>
              I agree to the terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
          {error && <span className={styles.errorText}>{error}</span>}
          <SocialButtons />
          <hr className={styles.separator} />
          <Link to="/login" className={styles.signinLink}>
            Already have an account? Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}
