import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Booking from "@/pages/Booking";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  
  // For handling active sections in Navigation
  const getActiveSection = () => {
    if (location === "/") return "home";
    if (location === "/about") return "about";
    if (location === "/products") return "products";
    if (location === "/booking") return "booking";
    if (location === "/contact") return "contact";
    return "";
  };

  return (
    <>
      <Header activeSection={getActiveSection()} />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
          <Route path="/booking" component={Booking} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
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
