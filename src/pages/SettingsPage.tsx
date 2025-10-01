import React from 'react';
import SEO from '../components/seo/SEO';
import SettingsPanel from '@/components/dashboard/SettingsPanel';
import { Home } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Settings"
        description="Customize your ShikkhaPro experience. Manage account settings, preferences, and notification options."
        keywords="settings, account preferences, notifications, ShikkhaPro configuration"
        noIndex={true}
      />

      <main className="flex-1 p-3 sm:p-4 lg:p-8">
        {/* Breadcrumb */}
        <div className="mb-4 lg:mb-8 hidden sm:block">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span className="font-medium text-gray-900">Settings</span>
          </div>
        </div>

        {/* Main Content */}
        <SettingsPanel />
      </main>
    </>
  );
};

export default SettingsPage;