import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserBoats } from "../../api/boat/useBoatQueries";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data: boats, isLoading: boatsLoading } = useUserBoats();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = () => navigate("/profile/edit");

  const handleAddBoat = () => navigate("/boat/add");

  const handleEditBoat = (boatId: number) => navigate(`/boat/edit/${boatId}`);

  const handleInfoBoat = (boatId: number) => navigate(`/boat/info/${boatId}`);

  if (!user) return <div className={styles.loadingContainer}>Loading...</div>;

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <button className={styles.editButton} onClick={handleEditProfile}>
          Edit profile
        </button>
      </div>
      <div className={styles.profileContent}>
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
                <button
                  className={styles.editBoatButton}
                  onClick={() => handleEditBoat(boat.id)}
                >
                  Edit
                </button>
              </div>
            ))
          ) : null}
          <button className={styles.addButton} onClick={handleAddBoat}>
            <span className={styles.plusIcon}>+</span> Add boat
          </button>
        </div>

        <div className={styles.subscriptionContainer}>
          <h3 className={styles.sectionTitle}>Subscription plan</h3>
          <div className={styles.subscriptionRow}>
            <span>Duration</span>
            <span>
              {user.subscriptionExpiry
                ? new Date(user.subscriptionExpiry).toLocaleDateString()
                : "No expiry date"}
            </span>
          </div>
          <div className={styles.subscriptionRow}>
            <span>Price EUR</span>
            <div className={styles.priceContainer}>
              <span className={styles.price}>
                {user.subscriptionPlan === "PAID" ? "9.99" : "0.00"}€
              </span>
              <span className={styles.pricePeriod}>per month</span>
            </div>
          </div>
        </div>

        <button className={styles.logoutButton} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};
