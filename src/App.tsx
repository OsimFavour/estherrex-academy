import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout.component";
import HomePage from "./pages/home-page/home-page.component";
import AboutPage from "./pages/about-page/about-page.component";
import CoursesPage from "./pages/courses-page/courses-page.component";
import ContactPage from "./pages/contact-page/contact-page.component";
import SignIn from "./pages/sign-in/sign-in.component";
import NotFound from "./pages/not-found/not-found.component";
import SignUp from "./pages/sign-up/sign-up.component";
import AcademyRegisterPage from "./pages/academy-register-page/academy-register-page.component";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<SignIn />} />
        <Route path="academy-register" element={<AcademyRegisterPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
