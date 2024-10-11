import { ReactNode } from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
    children: ReactNode;
  }

  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.topNav}>
        <TopNavbar />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.mainContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
