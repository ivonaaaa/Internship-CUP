import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterUserPage } from "../pages/RegisterPages/RegisterUserPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { ProtectedRoute } from "../hoc/ProtectedRoute";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { RegisterBoatPage } from "../pages/RegisterPages/RegisterBoatPage";
import { SubscriptionPage } from "../pages/RegisterPages/SubscriptionPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterUserPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.REGISTERBOAT} element={<RegisterBoatPage />} />
          <Route
            path={ROUTES.REGISTERSUBSCRIPTION}
            element={<SubscriptionPage />}
          />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>

        {/* Fallback route */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
