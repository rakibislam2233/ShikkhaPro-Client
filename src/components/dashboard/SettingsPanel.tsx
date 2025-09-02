import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Trash2,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/card';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';


const SettingsPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1234567890',
    location: 'New York, USA',
    organization: 'Example University',
    bio: 'Passionate educator with 10+ years of experience in creating engaging educational content.',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    quizAttempts: true,
    weeklyReports: true,
    systemUpdates: false,
    marketingEmails: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [languageSettings, setLanguageSettings] = useState({
    interface: 'english',
    defaultQuizLanguage: 'english',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
  });

  const settingsTabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'language', name: 'Language', icon: Globe },
  ];

  const handleProfileSave = () => {
    console.log('Saving profile data:', profileData);
  };

  const handleNotificationSave = () => {
    console.log('Saving notification settings:', notificationSettings);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Changing password');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLanguageSave = () => {
    console.log('Saving language settings:', languageSettings);
  };

  const renderProfileTab = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Profile Information</h3>
      
      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-20 w-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
              {profileData.name.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 h-6 w-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Camera className="h-3 w-3" />
            </button>
          </div>
          <div>
            <h4 className="font-medium">Profile Picture</h4>
            <p className="text-sm text-muted-foreground">Click the camera icon to upload a new picture</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Organization</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={profileData.organization}
              onChange={(e) => setProfileData({ ...profileData, organization: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleProfileSave} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderNotificationsTab = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-muted-foreground after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Quiz Attempt Notifications</h4>
              <p className="text-sm text-muted-foreground">Get notified when students complete quizzes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.quizAttempts}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, quizAttempts: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-muted-foreground after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Weekly Reports</h4>
              <p className="text-sm text-muted-foreground">Receive weekly performance summaries</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.weeklyReports}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyReports: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-muted-foreground after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">System Updates</h4>
              <p className="text-sm text-muted-foreground">Get notified about new features and updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.systemUpdates}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, systemUpdates: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-muted-foreground after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Marketing Emails</h4>
              <p className="text-sm text-muted-foreground">Receive tips, guides, and promotional content</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.marketingEmails}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, marketingEmails: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-muted-foreground after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleNotificationSave} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Preferences</span>
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderSecurityTab = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Security Settings</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-4">Change Password</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full pr-10 pl-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full pr-10 pl-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
              />
            </div>

            <Button onClick={handlePasswordChange} className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <span>Update Password</span>
            </Button>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium mb-4 text-red-600">Danger Zone</h4>
          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
            <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Delete Account</h5>
            <p className="text-sm text-red-600 dark:text-red-300 mb-4">
              Once you delete your account, there is no going back. All your quizzes and data will be permanently removed.
            </p>
            <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderAppearanceTab = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Appearance Settings</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Theme</h4>
            <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
          </div>
          <ThemeToggle />
        </div>

        <div>
          <h4 className="font-medium mb-4">Color Scheme</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
              <div className="flex space-x-2 mb-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
              </div>
              <p className="text-sm font-medium">Default</p>
            </div>
            <div className="p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
              <div className="flex space-x-2 mb-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <div className="w-4 h-4 bg-pink-500 rounded"></div>
              </div>
              <p className="text-sm font-medium">Warm</p>
            </div>
            <div className="p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
              <div className="flex space-x-2 mb-2">
                <div className="w-4 h-4 bg-cyan-500 rounded"></div>
                <div className="w-4 h-4 bg-teal-500 rounded"></div>
                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
              </div>
              <p className="text-sm font-medium">Cool</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderLanguageTab = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Language & Regional Settings</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Interface Language</label>
            <select
              value={languageSettings.interface}
              onChange={(e) => setLanguageSettings({ ...languageSettings, interface: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="english">English</option>
              <option value="bengali">বাংলা (Bengali)</option>
              <option value="hindi">हिंदी (Hindi)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Default Quiz Language</label>
            <select
              value={languageSettings.defaultQuizLanguage}
              onChange={(e) => setLanguageSettings({ ...languageSettings, defaultQuizLanguage: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="english">English</option>
              <option value="bengali">বাংলা (Bengali)</option>
              <option value="hindi">हिंदी (Hindi)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date Format</label>
            <select
              value={languageSettings.dateFormat}
              onChange={(e) => setLanguageSettings({ ...languageSettings, dateFormat: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time Format</label>
            <select
              value={languageSettings.timeFormat}
              onChange={(e) => setLanguageSettings({ ...languageSettings, timeFormat: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="12-hour">12-hour (AM/PM)</option>
              <option value="24-hour">24-hour</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleLanguageSave} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return renderSecurityTab();
      case 'appearance':
        return renderAppearanceTab();
      case 'language':
        return renderLanguageTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left
                      ${isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }
                    `}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </motion.button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;