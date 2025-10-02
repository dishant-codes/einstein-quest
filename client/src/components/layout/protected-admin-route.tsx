import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedAdminRoute({ children, redirectTo = "/admin/login" }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      console.log('ProtectedAdminRoute: Checking authentication...');
      const token = localStorage.getItem('adminToken');
      const user = localStorage.getItem('adminUser');
      
      console.log('Token:', token);
      console.log('Token exists:', !!token);
      console.log('Token length:', token ? token.length : 0);
      console.log('User exists:', !!user);
      console.log('User:', user);
      
      if (!token) {
        console.log('No token found, setting authenticated to false');
        setIsAuthenticated(false);
        return;
      }

      // Simple token validation - just check if token exists
      if (token && token.length > 10) {
        console.log('Token found and valid length, setting authenticated to true');
        setIsAuthenticated(true);
        return;
      }

      console.log('Invalid token, setting authenticated to false');
      setIsAuthenticated(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      console.log('ProtectedAdminRoute: Redirecting to', redirectTo);
      setLocation(redirectTo);
    }
  }, [isAuthenticated, setLocation, redirectTo]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
          <p className="mt-2 text-sm text-gray-500">Debug: isAuthenticated = {String(isAuthenticated)}</p>
        </div>
      </div>
    );
  }

  // Debug render
  console.log('ProtectedAdminRoute final render decision:', { isAuthenticated });
  
  // Render children only if authenticated
  if (isAuthenticated) {
    console.log('Rendering protected content');
    return <>{children}</>;
  } else {
    console.log('Not authenticated, rendering null (should redirect)');
    return null;
  }
}