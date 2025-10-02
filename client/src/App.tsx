import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProtectedAdminRoute from "@/components/layout/protected-admin-route";
import Home from "@/pages/home";
import About from "@/pages/about";
import Exams from "@/pages/exams";
import OnlineRegistrations from "@/pages/registrations";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import Downloads from "@/pages/downloads";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminTest from "@/components/admin-test";
import NotFound from "@/pages/not-found";

function App() {
  const [location] = useLocation();
  
  // Check if we're on an admin route
  const isAdminRoute = location.startsWith('/admin');
  
  if (isAdminRoute) {
    // Admin routes without navbar/footer
    return (
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen">
          <Switch>
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/test" component={AdminTest} />
            <Route path="/admin/dashboard">
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      </TooltipProvider>
    );
  }
  
  // Public routes with navbar/footer
  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/einstein-quest" component={Home} />
            <Route path="/einstein-quest/about" component={About} />
            <Route path="/einstein-quest/exams" component={Exams} />
            <Route path="/einstein-quest/online-registrations" component={OnlineRegistrations} />
            <Route path="/einstein-quest/gallery" component={Gallery} />
            <Route path="/einstein-quest/contact" component={Contact} />
            <Route path="/einstein-quest/downloads" component={Downloads} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;
