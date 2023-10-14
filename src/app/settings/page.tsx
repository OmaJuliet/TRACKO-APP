'use client'
import React, { useState } from 'react';
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import AccountSetting from '@/components/settings/AccountSetting'
import ProfileSetting from '@/components/settings/ProfileSetting'
import SecuritySetting from '@/components/settings/SecuritySetting'
import SupportSetting from '@/components/settings/SupportSetting'


const page = () => {
  const [activeTab, setActiveTab] = useState("accounts");

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const renderSettingsContent = () => {
    switch (activeTab) {
      case "accounts":
        return <Accounts />;
      case "profile":
        return <Profiles />;
      case "security":
        return <Securities />;
      case "support":
        return <Support />;
      default:
        return null;
    }
  };

  return (
    <>
      <Sidebar />
      <Header />
      <div className="w-full container mx-auto flex flex-col justify-center bg-gray-200 rounded">
        <div className="my-4 lg:ml-44 lg:px-16 flex flex-row justify-between">
          <button
            className={`px-4 py-2 rounded-lg mx-2 text-center hover:text-purple-500 focus:text-purple-600 underline ${activeTab === "accounts" && "active text-purple-500 text-lg"}`}
            onClick={() => handleTabChange("accounts")}
          >
            Account Settings
          </button>
          <button
            className={`px-4 py-2 rounded-lg mx-2 text-center hover:text-purple-500 focus:text-purple-600 underline ${activeTab === "profile" && "active text-purple-500 text-lg"}`}
            onClick={() => handleTabChange("profile")}
          >
            Profile Settings
          </button>
          <button
            className={`px-4 py-2 rounded-lg mx-2 text-center hover:text-purple-500 focus:text-purple-600 underline ${activeTab === "security" && "active text-purple-500 text-lg"}`}
            onClick={() => handleTabChange("security")}
          >
            Security Settings
          </button>
          <button
            className={`px-4 py-2 rounded-lg mx-2 text-center hover:text-purple-500 focus:text-purple-600 underline ${activeTab === "support" && "active text-purple-500 text-lg"}`}
            onClick={() => handleTabChange("support")}
          >
            Help & Support
          </button>
        </div>
        <div className="settings-content">{renderSettingsContent()}</div>
      </div>
    </>
  )
}

const Accounts = () => {
  return (
    <section className="text-black">
      <AccountSetting />
    </section>
  );
};

const Profiles = () => {
  return (
    <section className="text-black">
      <ProfileSetting />
    </section>
  );
};

const Securities = () => {
  return (
    <section className="text-black">
      <SecuritySetting />
    </section>
  );
};

const Support = () => {
  return (
    <section className="text-black">
      <SupportSetting />
    </section>
  );
};

export default page;
