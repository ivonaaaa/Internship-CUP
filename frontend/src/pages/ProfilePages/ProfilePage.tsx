import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserBoats } from "../../api/boat/useBoatQueries";
import styles from "./ProfilePage.module.css";
import { ROUTES } from "../../constants";
import { useDeleteBoat } from "../../api/boat/useBoatQueries";
import whiteArrowLeft from "../../assets/images/whiteArrowLeft.svg";
import { NavBar } from "../../components/NavBar";

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

  if (!user) return <div className={styles.loadingContainer}>Loading...</div>;

  return (
    <>
      <div className={styles.profilePage}>
        <img
          src={whiteArrowLeft}
          alt="arrow"
          className="arrow"
          onClick={() => navigate(-1)}
        />
        <div className={styles.profileHeader}>
          <button className={styles.editButton} onClick={handleEditProfile}>
            Edit profile
          </button>
        </div>
        <div className={styles.profileContent}>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {user.name && user.surname
                  ? user.name[0] + user.surname[0]
                  : user.email[0].toUpperCase()}
              </div>
              <div className={styles.userDetails}>
                <h3>
                  {user.name} {user.surname}
                </h3>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <div className={styles.boatListContainer}>
            {boatsLoading ? (
              <p>Loading boats...</p>
            ) : boats && boats.length > 0 ? (
              boats.map((boat, index) => (
                <div key={boat.id} className={styles.boatItem}>
                  <div
                    className={styles.boatInfo}
                    onClick={() => handleInfoBoat(boat.id)}
                  >
                    <div className={styles.boatNumber}>{index + 1}</div>
                    <div className={styles.boatName}>
                      {boat.name || `Boat ${index + 1}`}
                    </div>
                  </div>
                  <div className={styles.boatButtons}>
                    <button
                      className={styles.editBoatButton}
                      onClick={() => handleEditBoat(boat.id)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.editBoatButton}
                      onClick={() => handleRemoveBoat(boat.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : null}
            <button className={styles.addButton} onClick={handleAddBoat}>
              <span className={styles.plusIcon}>+</span> Add boat
            </button>
          </div>

          <div className={styles.subscriptionContainer}>
            <div className={styles.subscriptionColumn}>
              <h3 className={styles.subscriptionTitle}>
                {user.subscriptionPlan === "FREE_TRIAL"
                  ? "Free trial"
                  : "Weekly"}
              </h3>
              <span>
                {user.subscriptionPlan === "FREE_TRIAL"
                  ? user.subscriptionExpiry
                    ? "until " + new Date(user.subscriptionExpiry).toLocaleDateString()
                    : "no expiry date"
                  : "billed every week"}
              </span>
            </div>
            <div className={styles.subscriptionColumn}>
              <div className={styles.priceContainer}>
                <span className={styles.price}>
                  {user.subscriptionPlan === "PAID" ? "24.99" : "0.00"}€
                </span>
              </div>
            </div>
          </div>

          <div className={styles.logoutContainer}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
};
