import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile Page</h2>
      <div>
        <h3>User Information</h3>
        <p>ID: {user.id}</p>
        <p>Username: {user.surname}</p>
        <p>Email: {user.email}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
