import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Exams from "@/pages/exams";
import Training from "@/pages/training";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/einstein-quest" component={Home} />
        <Route path="/einstein-quest/about" component={About} />
        <Route path="/einstein-quest/exams" component={Exams} />
        <Route path="/einstein-quest/training" component={Training} />
        <Route path="/einstein-quest/gallery" component={Gallery} />
        <Route path="/einstein-quest/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
