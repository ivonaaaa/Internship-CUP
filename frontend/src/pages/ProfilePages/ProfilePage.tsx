import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { NavBar } from "../../components/NavBar";
import { useUserBoats } from "../../api/boat/useBoatQueries";
import { useDeleteBoat } from "../../api/boat/useBoatQueries";
import whiteArrowLeft from "../../assets/images/whiteArrowLeft.svg";
import c from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: boats, isLoading: boatsLoading } = useUserBoats(user?.id || 0);
  const { mutate: deleteBoatById } = useDeleteBoat();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleEditProfile = () => navigate(ROUTES.PROFILE_EDIT);

  const handleAddBoat = () => navigate(ROUTES.ADD_BOAT);

  const handleEditBoat = (boatId: number) =>
    navigate(ROUTES.EDIT_BOAT.replace(":id", boatId.toString()));

  const handleInfoBoat = (boatId: number) =>
    navigate(ROUTES.INFO_BOAT.replace(":id", boatId.toString()));

  const handleRemoveBoat = async (boatId: number) => {
    if (confirm("Are you sure you want to remove this boat?")) {
      try {
        await deleteBoatById(boatId);
        alert("Boat removed successfully");
      } catch (error) {
        console.error("Error removing boat:", error);
        alert("Failed to remove boat");
      }
    }
  };

  if (!user) return <div className={c.loadingContainer}>Loading...</div>;

  return (
    <>
      <div className={c.profilePage}>
        <img
          src={whiteArrowLeft}
          alt="arrow"
          className="arrow"
          onClick={() => navigate(ROUTES.HOME)}
        />
        <div className={c.profileHeader}>
          <button className={c.editButton} onClick={handleEditProfile}>
            Edit profile
          </button>
        </div>
        <div className={c.profileContent}>
          <div className={c.userInfoContainer}>
            <div className={c.userInfo}>
              <div className={c.avatar}>
                {user.name && user.surname
                  ? user.name[0] + user.surname[0]
                  : user.email[0].toUpperCase()}
              </div>
              <div className={c.userDetails}>
                <h3>
                  {user.name} {user.surname}
                </h3>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <div className={c.boatListContainer}>
            {boatsLoading ? (
              <p>Loading boats...</p>
            ) : boats && boats.length > 0 ? (
              boats.map((boat, index) => (
                <div key={boat.id} className={c.boatItem}>
                  <div
                    className={c.boatInfo}
                    onClick={() => handleInfoBoat(boat.id)}
                  >
                    <div className={c.boatNumber}>{index + 1}</div>
                    <div className={c.boatName}>
                      {boat.name || `Boat ${index + 1}`}
                    </div>
                  </div>
                  <div className={c.boatButtons}>
                    <button
                      className={c.editBoatButton}
                      onClick={() => handleEditBoat(boat.id)}
                    >
                      Edit
                    </button>
                    <button
                      className={c.editBoatButton}
                      onClick={() => handleRemoveBoat(boat.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : null}
            <button className={c.addButton} onClick={handleAddBoat}>
              <span className={c.plusIcon}>+</span> Add boat
            </button>
          </div>

          <div className={c.subscriptionContainer}>
            <div className={c.subscriptionColumn}>
              <h3 className={c.subscriptionTitle}>
                {user.subscriptionPlan === "FREE_TRIAL"
                  ? "Free trial"
                  : "Weekly"}
              </h3>
              <span className={c.subscriptionText}>
                {user.subscriptionPlan === "FREE_TRIAL"
                  ? user.subscriptionExpiry
                    ? "until " +
                      new Date(user.subscriptionExpiry).toLocaleDateString()
                    : "no expiry date"
                  : "billed every week"}
              </span>
            </div>
            <div className={c.subscriptionColumn}>
              <div className={c.priceContainer}>
                <span className={c.price}>
                  {user.subscriptionPlan === "PAID" ? "24.99" : "0.00"}€
                </span>
              </div>
            </div>
          </div>

          <div className={c.logoutContainer}>
            <button className={c.logoutButton} onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
};
