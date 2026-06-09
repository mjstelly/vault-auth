import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPasswordPage.module.css';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fieldError, setFieldError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setFieldError('Please enter your email address');
      return;
    }
    setFieldError('');
    setSubmittedEmail(trimmedEmail);
    setIsSubmitting(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.headlineBlock}>
          <h1 className={styles.heading}>Forgot Password?</h1>
          <p className={styles.description}>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>
        {isSubmitted ? (
          <>
            <p className={styles.successMessage}>
              If an account exists for {submittedEmail}, you&apos;ll receive a
              reset link shortly.
            </p>
            <Link to="/login" className={styles.backLink}>
              Back to Sign In
            </Link>
          </>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="forgot-email" className={styles.label}>
                Email
              </label>
              <input
                id="forgot-email"
                type="email"
                className={styles.input}
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldError('');
                }}
                autoComplete="email"
              />
              {fieldError && (
                <span className={styles.errorText}>{fieldError}</span>
              )}
            </div>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Reset Password'}
            </button>
            <Link to="/login" className={styles.backLink}>
              Back to Sign In
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
