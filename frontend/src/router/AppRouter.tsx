import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<div>Home</div>} />
        <Route path={ROUTES.LOGIN} element={<div>Login</div>} />
        <Route path={ROUTES.REGISTER} element={<div>Register</div>} />
        <Route path={ROUTES.NOT_FOUND} element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};
