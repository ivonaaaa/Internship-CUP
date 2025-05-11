import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterUserPage } from "../pages/RegisterPages/RegisterUserPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { ProtectedRoute } from "../hoc/ProtectedRoute";
import { EditProfilePage } from "../pages/ProfilePage/EditProfilePage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { RegisterBoatPage } from "../pages/RegisterPages/RegisterBoatPage";
import { SubscriptionPage } from "../pages/RegisterPages/SubscriptionPage";
import { InfoPage } from "../pages/InfoPage";
import { AddBoatPage } from "../pages/BoatPage/AddBoatPage";
import { EditBoatPage } from "../pages/BoatPage/EditBoatPage";

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
          <Route path={ROUTES.ADD_BOAT} element={<AddBoatPage />} />
          <Route path={ROUTES.EDIT_BOAT} element={<EditBoatPage />} />
          <Route
            path={ROUTES.REGISTERSUBSCRIPTION}
            element={<SubscriptionPage />}
          />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.PROFILE_EDIT} element={<EditProfilePage />} />
          <Route path={ROUTES.INFO} element={<InfoPage />} />
        </Route>

        {/* Fallback route */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
