import styles from './TopNavbar.module.css';

const TopNavbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.menuItems}>
        <span className={styles.menuItem}>Logo</span>
        <span className={styles.menuItem}>Home</span>
        <span className={styles.menuItem}>Assignments</span>
        <span className={styles.menuItem}>Community</span>
      </div>
      <div className={styles.rightSection}>
        <img
          className={styles.icon}
          src="/icons/notification.svg"
          alt="Notification"
        />
        <div className={styles.profile}>
          <button>
          <img
            className={styles.profileImage}
            src="/images/user-profile.jpg"
            alt="name"
          />
          </button>
          <span className={styles.profileName}>name</span>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
