import styles from '../Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.menu}>
        <div className={styles.menuItem}>
          <img className={styles.icon} src="/icons/home.svg" alt="Home" />
        </div>
        <div className={styles.menuItem}>
          <img className={styles.icon} src="/icons/clock.svg" alt="Clock" />
        </div>
        <div className={styles.menuItem}>
          <img className={styles.icon} src="/icons/calendar.svg" alt="Calendar" />
        </div>
        <div className={styles.menuItem}>
          <img className={styles.icon} src="/icons/folder.svg" alt="Folder" />
        </div>
        <div className={styles.menuItem}>
          <img className={styles.icon} src="/icons/star.svg" alt="Star" />
        </div>
        <div className={styles.menuItem}>
          <img className={styles.icon} src="/icons/document.svg" alt="Document" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;