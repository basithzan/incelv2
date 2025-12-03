'use client';

import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, FileText, User, LogOut } from 'lucide-react';

export function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 py-12">
        <Card className="p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="mb-2">Welcome Back</h2>
            <p className="text-neutral-700">Sign in to manage your bookings and profile</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-700">
              Don't have an account?{' '}
              <a href="#" className="text-primary hover:underline">
                Create Account
              </a>
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="py-12 bg-neutral-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="mb-2">My Dashboard</h1>
              <p className="text-neutral-700">Manage your bookings and account settings</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
              <TabsTrigger value="past">Past Bookings</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-2">Dubai Explorer Package</h3>
                      <p className="text-neutral-700">5 Days / 4 Nights</p>
                    </div>
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">Confirmed</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-neutral-700">
                      <Calendar className="w-4 h-4" />
                      <span>Dec 15, 2025 - Dec 20, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700">
                      <FileText className="w-4 h-4" />
                      <span>Booking ID: IT-2025-001234</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">View Details</Button>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-2">UAE Visa - 30 Days</h3>
                      <p className="text-neutral-700">Tourist Visa</p>
                    </div>
                    <span className="bg-warning/10 text-warning px-3 py-1 rounded-full">Processing</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-neutral-700">
                      <Calendar className="w-4 h-4" />
                      <span>Application Date: Nov 1, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700">
                      <FileText className="w-4 h-4" />
                      <span>Application ID: VIS-2025-005678</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Track Status</Button>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="past">
              <Card className="p-8 text-center">
                <p className="text-neutral-700 mb-4">No past bookings found</p>
                <Button asChild>
                  <a href="#/packages">Browse Packages</a>
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="p-8 max-w-2xl">
                <h3 className="mb-6">Personal Information</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input type="tel" defaultValue="+234 818 085 0745" />
                  </div>
                  <div className="space-y-2">
                    <Label>Passport Number</Label>
                    <Input defaultValue="A12345678" />
                  </div>
                  <Button>Update Profile</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="p-8 text-center">
                <FileText className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
                <h3 className="mb-2">Your Travel Documents</h3>
                <p className="text-neutral-700 mb-6">
                  All your visa documents, booking confirmations, and travel vouchers will appear here
                </p>
                <Button variant="outline">Upload Document</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
