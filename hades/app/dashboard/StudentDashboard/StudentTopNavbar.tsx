import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import Link from "next/link"; // Import from next/link
import styles from "../TopNavbar.module.css";

interface TopNavbarProps {
  name?: string;
  profileImage?: string;
  menuItems?: string[];
}

const TopNavbar: React.FC<TopNavbarProps> = ({
  name = "Guest",
  profileImage = "/images/user-profile.jpg",
  menuItems = [],
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.menuItems}>
        <span className={styles.menuItem}>Logo</span>
        {menuItems.map((item, index) => (
          <span key={index} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>

      <div className={styles.rightSection}>
        <img
          className={styles.icon}
          src="/icons/notification.svg"
          alt="Notifications"
          aria-label="View notifications"
        />

        <div className={styles.profile} ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            aria-expanded={dropdownOpen}
            aria-label="Profile menu"
          >
            <img
              className={styles.profileImage}
              src={profileImage}
              alt={`${name}'s Profile`}
              //onError={(e) => (e.currentTarget.src = "/images/default-profile.jpg")}
            />
          </button>

          {dropdownOpen && (
            <div className={`${styles.dropdown} ${dropdownOpen ? styles["dropdown-open"] : ""}`}>
              <Link href="/pages/Profile" className={styles.dropdownItem}>
                <strong>User Profile</strong>
                <p>View and edit your profile information</p>
              </Link>
              <Link href="/pages/Settings" className={styles.dropdownItem}>
                <strong>Settings</strong>
                <p>Manage your application settings and preferences</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
