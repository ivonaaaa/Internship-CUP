import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { ProtectedRoute } from "../hoc/ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>

        {/* Fallback route */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
