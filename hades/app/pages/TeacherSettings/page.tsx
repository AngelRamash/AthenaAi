"use client";
import React, { useState, useEffect } from "react";
import Layout from "/Pandora-s-Box/hades/app/dashboard/TeacherDashboard/Layout";
import { saveSettings, getSettings } from "/Pandora-s-Box/hades/app/apiService"; // Mock API service for storing settings

interface Settings {
  showAssignments: boolean;
  showDeadlines: boolean;
  showMessages: boolean;
  theme: "light" | "dark" | "custom";
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    showAssignments: true,
    showDeadlines: true,
    showMessages: true,
    theme: "light",
  });

  const [loading, setLoading] = useState(false);

  // Fetch saved settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const savedSettings = await getSettings();
        setSettings(savedSettings);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // Handle change in settings form inputs
  const handleInputChange = (field: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await saveSettings(settings);
      alert("Settings saved successfully.");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Dashboard Customization Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Customization</h2>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={settings.showAssignments}
              onChange={(e) => handleInputChange("showAssignments", e.target.checked)}
              className="mr-2"
            />
            Show Assignments
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={settings.showDeadlines}
              onChange={(e) => handleInputChange("showDeadlines", e.target.checked)}
              className="mr-2"
            />
            Show Upcoming Deadlines
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={settings.showMessages}
              onChange={(e) => handleInputChange("showMessages", e.target.checked)}
              className="mr-2"
            />
            Show Messages from Students
          </label>
        </div>

        {/* Theme Selection Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Theme Selection</h2>
          <label className="block mb-2">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={settings.theme === "light"}
              onChange={(e) => handleInputChange("theme", e.target.value)}
              className="mr-2"
            />
            Light Mode
          </label>
          <label className="block mb-2">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={settings.theme === "dark"}
              onChange={(e) => handleInputChange("theme", e.target.value)}
              className="mr-2"
            />
            Dark Mode
          </label>
          <label className="block mb-2">
            <input
              type="radio"
              name="theme"
              value="custom"
              checked={settings.theme === "custom"}
              onChange={(e) => handleInputChange("theme", e.target.value)}
              className="mr-2"
            />
            Custom Theme
          </label>
        </div>

        {/* Save Settings Button */}
        <button
          onClick={handleSaveSettings}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </Layout>
  );
};

export default SettingsPage;
