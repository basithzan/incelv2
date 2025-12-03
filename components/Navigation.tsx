'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { 
    label: 'Packages', 
    href: '/packages',
    submenu: [
      { label: 'Inbound Packages', href: '/packages?type=inbound' },
      { label: 'Outbound Packages', href: '/packages?type=outbound' },
      { label: 'Hajj & Umrah', href: '/packages?type=umrah' }
    ]
  },
  { label: 'Local Tours', href: '/local-tours' },
  { 
    label: 'Visa', 
    href: '/uae-visa',
    submenu: [
      { label: 'UAE Visa', href: '/uae-visa' },
      { label: 'Global Visa', href: '/global-visa' }
    ]
  },
  { label: 'Contact', href: '/contact' }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0076ad] backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div whileHover={{ scale: 1.02 }}>
              <ImageWithFallback 
                src="https://inceltourism.com/wp-content/uploads/elementor/thumbs/logowhite-qhzbd7e4e3m50i16db2lblzaxkieai6seqqrl7p81s.png"
                alt="Incel Tourism"
                className="h-16 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 transition-colors py-2 relative group ${
                    scrolled ? 'text-white hover:text-white' : 'text-white hover:text-white'
                  } ${pathname === item.href ? 'text-accent' : ''}`}
                >
                  {item.label}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-full group-hover:left-0 group-hover:translate-x-0 transition-all duration-500 ease-out" />
                </Link>
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl py-3 min-w-[200px] sm:min-w-[240px] border border-neutral-100 overflow-hidden"
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="block px-6 py-3 text-neutral-700 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:text-neutral-900 transition-all"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="relative text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md bg-white p-0 border-l border-neutral-200">
              {/* Header Section with Logo */}
              <div className="bg-gradient-to-br from-primary to-accent p-6 pb-8">
                <SheetHeader>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <ImageWithFallback 
                      src="https://inceltourism.com/wp-content/uploads/elementor/thumbs/logowhite-qhzbd7e4e3m50i16db2lblzaxkieai6seqqrl7p81s.png"
                      alt="Incel Tourism"
                      className="h-12 w-auto mb-4"
                    />
                    <SheetTitle className="text-white text-left">Explore Our Services</SheetTitle>
                    <SheetDescription className="text-white/80 text-left">
                      Your journey starts here
                    </SheetDescription>
                  </motion.div>
                </SheetHeader>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col h-[calc(100vh-180px)] overflow-y-auto">
                <div className="flex-1 px-6 py-6 space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center justify-between group px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
                        onClick={() => !item.submenu && setIsOpen(false)}
                      >
                        <span className="text-neutral-900 group-hover:text-primary transition-colors">
                          {item.label}
                        </span>
                        {item.submenu && (
                          <motion.div
                            animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-neutral-400 group-hover:text-primary" />
                          </motion.div>
                        )}
                      </Link>
                      <AnimatePresence>
                        {item.submenu && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-6 mt-1 space-y-1 overflow-hidden"
                          >
                            {item.submenu.map((subitem, subIndex) => (
                              <motion.div
                                key={subitem.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05 }}
                              >
                                <Link
                                  href={subitem.href}
                                  className="flex items-center px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3"></span>
                                  {subitem.label}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Action Section */}
                <div className="px-6 py-6 border-t border-neutral-200 bg-neutral-50/50">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 border-0 rounded-xl h-12 transition-all"
                    >
                      <Link href="/account" className="flex items-center justify-center gap-2">
                        <span>Login / Sign Up</span>
                      </Link>
                    </Button>
                    
                    <div className="flex items-center justify-center gap-4 mt-4 text-xs text-neutral-500">
                      <Link href="/contact" className="hover:text-primary transition-colors">Support</Link>
                      <span>•</span>
                      <Link href="/about-us" className="hover:text-primary transition-colors">About</Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Login/Register Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="max-w-md bg-white text-neutral-900 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-4 duration-300">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-neutral-900">
                Welcome Back
              </DialogTitle>
              <DialogDescription className="text-center text-neutral-700">
                Sign in to your account or create a new one
              </DialogDescription>
            </DialogHeader>

          <Tabs defaultValue="login" className="mt-6">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-neutral-100">
              <TabsTrigger value="login" className="data-[state=active]:bg-neutral-200 data-[state=active]:text-neutral-900">Login</TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-neutral-200 data-[state=active]:text-neutral-900">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="text-neutral-900 border-neutral-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="text-neutral-900 border-neutral-300"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-neutral-700">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline">Forgot password?</a>
              </div>
              <Button
                onClick={() => {
                  alert('Login functionality will be implemented');
                  setIsLoginModalOpen(false);
                }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 rounded-full shadow-lg hover:shadow-xl transition-all border-0"
              >
                Sign In
              </Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="text-neutral-900 border-neutral-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="text-neutral-900 border-neutral-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="text-neutral-900 border-neutral-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Confirm Password</Label>
                <Input
                  id="register-confirm"
                  type="password"
                  placeholder="Confirm your password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="text-neutral-900 border-neutral-300"
                />
              </div>
              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="rounded mt-1" />
                <span className="text-neutral-700">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </span>
              </div>
              <Button
                onClick={() => {
                  alert('Registration functionality will be implemented');
                  setIsLoginModalOpen(false);
                }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 rounded-full shadow-lg hover:shadow-xl transition-all border-0"
              >
                Create Account
              </Button>
            </TabsContent>
          </Tabs>
          </motion.div>
        </DialogContent>
      </Dialog>
    </motion.nav>
  );
}
