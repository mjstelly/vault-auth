import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getMe, getProducts } from '../api/auth';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const accessToken = user?.accessToken ?? '';

  const profileQuery = useQuery({
    queryKey: ['auth', 'me', user?.id],
    queryFn: () => getMe(accessToken),
    enabled: accessToken !== '',
  });

  const productsQuery = useQuery({
    queryKey: ['auth', 'products', user?.id],
    queryFn: () => getProducts(accessToken),
    enabled: accessToken !== '',
  });

  function handleSignOut() {
    logout();
    navigate('/login');
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Dashboard</span>
        <button
          type="button"
          className={styles.signOutButton}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      <div className={styles.profileCard}>
        {profileQuery.isLoading && (
          <>
            <div className={styles.skeletonBar} />
            <div className={styles.skeletonBar} />
            <div className={styles.skeletonBar} />
          </>
        )}
        {profileQuery.isError && (
          <span className={styles.profileError}>
            Failed to load profile. Try signing out and back in.
          </span>
        )}
        {profileQuery.data && (
          <>
            <img
              src={profileQuery.data.image}
              alt={profileQuery.data.username}
              width={64}
              height={64}
              className={styles.avatar}
            />
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>
                {profileQuery.data.firstName} {profileQuery.data.lastName}
              </span>
              <span className={styles.profileEmail}>
                {profileQuery.data.email}
              </span>
            </div>
          </>
        )}
      </div>

      <div className={styles.productsSection}>
        <span className={styles.productsLabel}>Products</span>
        {productsQuery.isLoading && (
          <div className={styles.productsGrid}>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))}
          </div>
        )}
        {productsQuery.isError && (
          <div className={styles.productsError}>
            <span className={styles.productsErrorText}>
              Failed to load products.
            </span>
            <button
              type="button"
              className={styles.retryButton}
              onClick={() => productsQuery.refetch()}
            >
              Retry
            </button>
          </div>
        )}
        {productsQuery.data && (
          <div className={styles.productsGrid}>
            {productsQuery.data.products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <span className={styles.productTitle}>{product.title}</span>
                <span className={styles.productCategory}>
                  {product.category}
                </span>
                <span className={styles.productPrice}>${product.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
