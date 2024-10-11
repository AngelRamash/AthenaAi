"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

// TypeScript Props for Modal Component
interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

// Separate Modal Component for Reusability
const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition duration-200"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold text-center mb-1">{title}</h2>
      {children}
    </div>
  </div>
);

export const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);
      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
  }, []);

  const openSignupModal = () => {
    setIsLoginMode(false);
    setIsModalOpen(true);
  };

  const openLoginModal = () => {
    setIsLoginMode(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } backdrop-blur-md bg-black/50`}
      >
        <div className="py-5">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <nav className="hidden sm:flex gap-6 font-medium text-black items-center ml-auto">
                <Link href="/about">
                  <span className="hover:text-blue-800 transition duration-200">
                    About
                  </span>
                </Link>
                <a href="#" className="hover:text-blue-800 transition duration-200">
                  Help
                </a>
                <Link href="/dashboard/StudentDashboard">
                  <span className="hover:text-blue-800 transition duration-200">
                    Student
                  </span>
                </Link>
                <Link href="/dashboard/TeacherDashboard">
                  <span className="hover:text-blue-800 transition duration-200">
                    Teacher
                  </span>
                </Link>
                <button
                  onClick={openLoginModal}
                  className="bg-purple-950 text-white px-5 py-2 rounded-3xl font-semibold inline-flex justify-center tracking-tight hover:bg-purple-800 transition duration-200"
                >
                  Login
                </button>
                <button
                  onClick={openSignupModal}
                  className="bg-purple-950 text-white px-5 py-2 rounded-3xl font-semibold inline-flex justify-center tracking-tight hover:bg-purple-800 transition duration-200"
                >
                  Sign Up
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <Modal title={isLoginMode ? "Login" : "Athena's Olympus"} onClose={closeModal}>
          {isLoginMode ? (
            <>
              <LoginForm />
              <p className="text-center mt-4">
                Don't have an account?{" "}
                <button
                  onClick={openSignupModal}
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                >
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <SignupForm />
              <p className="text-center mt-4">
                Already have an account?{" "}
                <button
                  onClick={openLoginModal}
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                >
                  Login
                </button>
              </p>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default Header;
