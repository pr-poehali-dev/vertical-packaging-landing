
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainRedirect from "./pages/MainRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/main" element={<MainRedirect />} />
          <Route path="/main/courses" element={<MainRedirect to="/main/courses/index.html" />} />
          <Route path="/main/professions" element={<MainRedirect to="/main/professions/index.html" />} />
          <Route path="/main/professions/backend-razrabotchik" element={<MainRedirect to="/main/professions/backend-razrabotchik/index.html" />} />
          <Route path="/main/courses/python-razrabotchik" element={<MainRedirect to="/main/courses/python-razrabotchik/index.html" />} />
          <Route path="/main/compare" element={<MainRedirect to="/main/compare/index.html" />} />
          <Route path="/main/instruction" element={<MainRedirect to="/main/instruction/index.html" />} />
          <Route path="/main/blog" element={<MainRedirect to="/main/blog/index.html" />} />
          <Route path="/main/blog/kak-sravnivat-ceny-kursov" element={<MainRedirect to="/main/blog/kak-sravnivat-ceny-kursov/index.html" />} />
          <Route path="/main/schools" element={<MainRedirect to="/main/schools/index.html" />} />
          <Route path="/main/schools/school_name" element={<MainRedirect to="/main/schools/school_name/index.html" />} />
          <Route path="/courses" element={<MainRedirect to="/main/courses/index.html" />} />
          <Route path="/professions" element={<MainRedirect to="/main/professions/index.html" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;