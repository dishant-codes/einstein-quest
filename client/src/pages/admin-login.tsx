import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormData {
  username: string;
  password: string;
}

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Use the existing API base URL from your server
      const response = await fetch('https://einstein-quest-server.onrender.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Login failed');
      }

      // Store the JWT token in localStorage
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user || { username: formData.username, role: 'admin' }));

      console.log('Login successful, token stored:', data.token ? 'YES' : 'NO');
      console.log('Redirecting to dashboard...');

      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });

      // Add a small delay to ensure token is stored before redirect
      setTimeout(() => {
        setLocation('/admin/dashboard');
      }, 100);

    } catch (error) {
      console.error('Admin login error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during login');
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : 'An error occurred during login',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full">
              <Lock className="w-6 h-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !formData.username || !formData.password}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          {/* Test button for development */}
          <Button 
            onClick={() => {
              // Clear any existing tokens first
              localStorage.removeItem('adminToken');
              localStorage.removeItem('adminUser');
              
              // Set new test tokens
              const testToken = 'test-token-123456789012345';
              const testUser = JSON.stringify({ username: 'admin', role: 'admin' });
              
              localStorage.setItem('adminToken', testToken);
              localStorage.setItem('adminUser', testUser);
              
              // Verify tokens were set
              const verifyToken = localStorage.getItem('adminToken');
              const verifyUser = localStorage.getItem('adminUser');
              
              console.log('Test login - Token set:', verifyToken);
              console.log('Test login - User set:', verifyUser);
              
              toast({
                title: "Test Login",
                description: `Token set (${testToken.length} chars), redirecting...`,
              });
              
              // Redirect immediately
              setLocation('/admin/dashboard');
            }}
            variant="outline"
            className="w-full mt-2"
          >
            Test Login (Development)
          </Button>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              This is a protected admin area. Only authorized personnel can access.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}