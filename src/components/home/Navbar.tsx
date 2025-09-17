import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, LogOut } from "lucide-react";
import { Button } from "../ui/Button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/Avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { removeAuthTokens } from "@/utils/cookies";
import { toast } from "sonner";
import type { TError } from "@/types/erro";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    { href: "/dashboard", label: "Dashboard", authRequired: true },
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
    } catch (error) {
      const err = error as TError;
      toast.error(err.data.message || "Error logging out");
    }
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
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.profile?.avatar}
                      alt={user?.profile?.fullName || user?.email}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {(user?.profile?.fullName || user?.email)
                        ?.charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground">
                    {user?.profile?.fullName || user?.email?.split("@")[0]}
                  </span>
                </div>

                <Button variant="ghost" size="lg" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-5">
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="lg">
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
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user?.profile?.avatar}
                          alt={user?.profile?.fullName || user?.email}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {(user?.profile?.fullName || user?.email)
                            ?.charAt(0)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {user?.profile?.fullName ||
                            user?.email?.split("@")[0]}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user?.email}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-full cursor-pointer"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="default" size="lg" className="w-full">
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
