
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArtistProvider } from "./contexts/ArtistContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import ArtistListing from "./pages/ArtistListing";
import ArtistOnboarding from "./pages/ArtistOnboarding";
import ManagerDashboard from "./pages/ManagerDashboard";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ArtistProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
            <Routes>
              {/* Routes without navbar/footer */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Routes with navbar/footer */}
              <Route path="/*" element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/artists" element={<ArtistListing />} />
                    <Route path="/onboarding" element={<ArtistOnboarding />} />
                    <Route path="/dashboard" element={<ManagerDashboard />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </ArtistProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
