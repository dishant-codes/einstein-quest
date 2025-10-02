import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminTest() {
  const [location, setLocation] = useLocation();
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  const checkToken = () => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setTokenInfo({
          token: token.substring(0, 20) + '...',
          payload,
          user: user ? JSON.parse(user) : null,
          valid: true
        });
      } catch (error) {
        setTokenInfo({
          token: token.substring(0, 20) + '...',
          error: error instanceof Error ? error.message : 'Unknown error',
          user: user ? JSON.parse(user) : null,
          valid: false
        });
      }
    } else {
      setTokenInfo({
        token: null,
        error: 'No token found',
        user: null,
        valid: false
      });
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setTokenInfo(null);
    setLocation('/admin/login');
  };

  const testDashboard = () => {
    setLocation('/admin/dashboard');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Admin Authentication Test</CardTitle>
          <CardDescription>Current location: {location}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={checkToken}>Check Token</Button>
            <Button onClick={clearAuth} variant="destructive">Clear Auth</Button>
            <Button onClick={testDashboard}>Go to Dashboard</Button>
          </div>
          
          {tokenInfo && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-semibold mb-2">Token Info:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(tokenInfo, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}