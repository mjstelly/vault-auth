import { useState } from 'react';
import styles from './SocialButtons.module.css';

export function SocialButtons() {
  const [showMessage, setShowMessage] = useState(false);

  function handleClick() {
    setShowMessage(true);
  }

  return (
    <>
      <div className={styles.row}>
        <button type="button" className={styles.button} onClick={handleClick}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
            <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z"/>
          </svg>
          Continue with Google
        </button>
        <button type="button" className={styles.button} onClick={handleClick}>
          <svg width="14" height="17" viewBox="0 0 384 512" aria-hidden="true" fill="currentColor">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c31.7-37.6 54.4-90.7 54.4-143.8 0-7.4-.6-14.9-1.9-21.1-51.2 1.9-113.6 34.2-150.6 82.5-28.5 32.4-55.1 85.5-55.1 139.5 0 8.3 1.3 16.6 1.9 19.1 3.2.6 8.4 1.3 13.6 1.3 46.2 0 103.3-31.1 137.7-77.5z"/>
          </svg>
          Continue with Apple
        </button>
      </div>
      {showMessage && (
        <span className={styles.message}>
          Social login not available in this demo
        </span>
      )}
    </>
  );
}
