import { useState } from "react";
import {
  Menu,
  Home,
  PlusCircle,
  FileText,
  Settings,
  BookOpen,
  X,
  Sparkles,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.profile?.fullName) {
      return user.profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  const getUserDisplayName = () => {
    return user?.profile?.fullName || user?.email?.split("@")[0] || "User";
  };

  const navigation = [
    {
      id: "overview",
      name: "Dashboard",
      icon: Home,
      href: "/dashboard",
      description: "Your learning overview",
    },
    {
      id: "create-quiz",
      name: "Create Quiz",
      icon: PlusCircle,
      href: "/dashboard/create-quiz",
      description: "Generate new questions",
    },
    {
      id: "my-quizzes",
      name: "My Quizzes",
      icon: FileText,
      href: "/dashboard/my-quizzes",
      description: "Your saved quizzes",
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      description: "Account preferences",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-50
            w-64 lg:w-80 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <div className="flex h-full flex-col bg-white border-r border-gray-200 shadow-xl overflow-hidden">
            {/* Sidebar Header */}
            <div className="flex h-16 lg:h-20 items-center justify-between px-4 lg:px-6 border-b border-gray-200">
              <Link to="/">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg lg:text-xl font-bold text-primary">
                      ShikkhaPro
                    </h1>
                    <p className="text-xs text-gray-500 hidden lg:block">
                      AI Learning Platform
                    </p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* User Profile Card */}
            <div className="p-4 lg:p-6">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-primary/20">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm lg:text-lg shadow-lg">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.role || "Student"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500" />
                    <span className="text-xs font-medium text-yellow-600">
                      Pro
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Navigation */}
            <nav className="flex-1 px-4 lg:px-6 pb-4 lg:pb-6">
              <ul className="space-y-1 lg:space-y-2">
                {navigation.map((item) => {
                  const IconComponent = item.icon;
                  const isActive =
                    location.pathname === item.href ||
                    (item.href === "/dashboard" &&
                      location.pathname === "/dashboard");
                  return (
                    <li key={item.id}>
                      <Link
                        to={item.href}
                        className={`
                        w-full group flex items-center justify-between rounded-lg lg:rounded-xl px-3 lg:px-4 py-2 lg:py-3 text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <div className="flex items-center space-x-2 lg:space-x-3">
                          <IconComponent
                            className={`w-4 h-4 lg:w-5 lg:h-5 ${
                              isActive
                                ? "text-white"
                                : "text-gray-400 group-hover:text-gray-600"
                            }`}
                          />
                          <div className="text-left">
                            <div className="font-medium text-sm lg:text-base">
                              {item.name}
                            </div>
                            <div
                              className={`text-xs hidden lg:block ${
                                isActive
                                  ? "text-primary-foreground/80"
                                  : "text-gray-500"
                              }`}
                            >
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-80">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 bg-white lg:bg-white lg:bg-opacity-90 lg:backdrop-blur-xl 0">
            <div className="flex h-14 md:h-0 items-center gap-8">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
              </button>

              {/* Logo for mobile (when sidebar is closed) */}
              <div className="lg:hidden flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-primary">
                  ShikkhaPro
                </span>
              </div>
            </div>
          </header>
          {/* Page Content */}
          <Outlet />
        </div>
      </div>

      {/* Click outside to close profile dropdown */}
      {profileDropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
