import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, LogOut, User } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { removeAuthTokens } from "@/utils/cookies";
import { toast } from "sonner";
import type { TError } from "@/types/erro";
import imageBaseUrl from "@/utils/imageBaseUrl";
import defaultAvatar from "@/assets/default-image.jpg";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      href: "/dashboard/create-quiz",
      label: "Create Quiz",
      authRequired: true,
    },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    try {
      removeAuthTokens();
      toast.success("Logged out successfully!");
      navigate("/login");
      setProfileDropdownOpen(false);
    } catch (error) {
      const err = error as TError;
      toast.error(err.data.message || "Error logging out");
    }
  };

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

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        {
          "bg-background/80 backdrop-blur-lg border-border ": isScrolled,
          "bg-transparent border-transparent": !isScrolled,
        }
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-5">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold"
            >
              <BookOpen className="w-8 h-8 text-primary" />
              <span
                className={`gradient-text font-semibold ${
                  isScrolled ? "text-primary" : "text-gray-800"
                }`}
              >
                ShikkhaPro
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {navLinks.map((link, index) => {
              if (link.authRequired && !isAuthenticated) return null;

              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "relative block px-5 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      {
                        "bg-primary text-white": isActiveLink(link.href),
                        "text-primary hover:bg-accent": !isActiveLink(
                          link.href
                        ),
                      }
                    )}
                  >
                    {isActiveLink(link.href) && (
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-md"
                        layoutId="activeNavLink"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 text-base">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-sm text-muted-foreground">
                  Loading...
                </span>
              </div>
            ) : isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-1 lg:space-x-2 p-1.5 lg:p-2 rounded-lg lg:rounded-xl cursor-pointer  transition-colors"
                >
                 {
                  user?.profile?.avatar ? (
                    <img
                      className="size-10 md:size-12 rounded-full object-cover"
                      src={`${imageBaseUrl}${user.profile.avatar}`}
                      alt="Profile"
                    />
                  ) : (
                    <img
                      className="size-10 md:size-12 rounded-full object-cover"
                      src={defaultAvatar}
                      alt="Default Profile"
                    />
                  )
                 }
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 lg:w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link to="/dashboard">
                      <button className="w-full cursor-pointer flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                    </Link>
                    <Link to="/dashboard/my-quizzes">
                      <button className="w-full cursor-pointer flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <User className="w-4 h-4" />
                        <span>My Quizzes</span>
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full cursor-pointer flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-5">
                <Link to="/login">
                  <Button variant="outline" size="lg" className="cursor-pointer h-12 px-10">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="lg" className="cursor-pointer h-12 px-6">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:text-primary hover:bg-accent"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => {
                if (link.authRequired && !isAuthenticated) return null;

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      {
                        "text-primary bg-primary/10": isActiveLink(link.href),
                        "text-foreground hover:text-primary hover:bg-accent":
                          !isActiveLink(link.href),
                      }
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="border-t border-border pt-3">
                {isAuthenticated ? (
                  <button
                    className="w-full py-4 px-5 flex justify-start rounded-lg items-center bg-primary text-primary-foreground h-12"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-full cursor-pointer h-12"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="default" size="lg" className="w-full h-12">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
