import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Article from "./pages/Article";
import Journal from "./pages/Journal";
import NewDevelopment from "./pages/NewDevelopment";
import PropertyDetail from "./pages/PropertyDetail";
import ArticleDetail from "./pages/ArticleDetail";
import AgentProfile from "./pages/AgentProfile";
import ListingPage from "./pages/ListingPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/article" element={<Article />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/new-development" element={<NewDevelopment />} />
          <Route path="/property/:slug" element={<PropertyDetail />} />
          <Route path="/news/:slug" element={<ArticleDetail />} />
          <Route path="/AgentProfile" element={<AgentProfile />} />
          <Route path="/listing/:slug" element={<ListingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
