import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Article from "./pages/Article";
import ArticleV2 from "./pages/ArticleV2";
import Journal from "./pages/Journal";
import NewDevelopment from "./pages/NewDevelopment";
import PropertyDetail from "./pages/PropertyDetail";
import Gallery from "./pages/Gallery";
import ArticleDetail from "./pages/ArticleDetail";
import AgentProfile from "./pages/AgentProfile";
import ListingPage from "./pages/ListingPage";
import Properties from "./pages/Properties";
import MembersClub from "./pages/MembersClub";
import NotFound from "./pages/NotFound";
import { Header, Footer } from "./components/layout";
import About from "./pages/About";
import ApiTest from "./pages/ApiTest";
import ScrollToTop from "./utils/ScrollToTop";
import PropertyCreate from "./pages/PropertyCreate";
import AgentCreate from "./pages/AgentCreate";
import AgentsList from "./pages/AgentsList";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const hideHeaderOnPaths = ["/", "/members-club", "/about-us", "/journal", "/article"];
  const shouldHideHeader = hideHeaderOnPaths.includes(location.pathname);
  const isMembersClub = location.pathname.includes('/members-club');

  return (
    <>
      {shouldHideHeader ? null : <Header variant={isMembersClub ? "default" : "default"} />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/article" element={<Article />} />
        <Route path="/article-v2" element={<ArticleV2 />} />
        <Route path="/article-v2/:slug" element={<ArticleV2 />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/new-development" element={<NewDevelopment />} />
        <Route path="/property/:slug" element={<PropertyDetail />} />
        <Route path="/news/:slug" element={<ArticleDetail />} />
        <Route path="/agent/:slug" element={<AgentProfile />} />
        <Route path="/listing/:slug" element={<ListingPage />} />
        <Route path="/listing/:slug/gallery" element={<Gallery />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/new" element={<PropertyCreate />} />
        <Route path="/agents" element={<AgentsList />} />
        <Route path="/agents/new" element={<AgentCreate />} />
        <Route path="/members-club" element={<MembersClub />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/api-test" element={<ApiTest />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer variant={isMembersClub ? 'members' : 'default'} />
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
