import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout.component";
import HomePage from "./pages/home-page/home-page.component";
import AboutPage from "./pages/about-page/about-page.component";
import CoursesPage from "./pages/courses-page/courses-page.component";
import ContactPage from "./pages/contact-page/contact-page.component";
import RegisterPage from "./pages/register-page/register-page.component";
import SignIn from "./pages/sign-in/sign-in.component";
import NotFound from "./pages/not-found/not-found.component";
import SignUp from "./pages/sign-up/sign-up.component";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


