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

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  if (!user) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <h2>Profile</h2>
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
            <button className={styles.editButton} onClick={handleEditProfile}>
              Edit
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Boats</h4>
          <div className={styles.boatList}>
            {boatsLoading ? (
              <p>Loading boats...</p>
            ) : boats && boats.length > 0 ? (
              boats.map((boat, index) => (
                <div key={boat.id} className={styles.boatItem}>
                  <div className={styles.boatNumber}>{index + 1}</div>
                  <div className={styles.boatName}>
                    {boat.name || `Boat ${index + 1}`}
                  </div>
                  <button className={styles.editBoatButton}>Edit</button>
                </div>
              ))
            ) : (
              <p className={styles.emptyMessage}>No boats added yet</p>
            )}
            <button className={styles.addButton}>
              <span>+</span> Add boat
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Subscription plan</h4>
          <div className={styles.subscriptionDetails}>
            <div className={styles.subscriptionRow}>
              <span>Duration</span>
              <span>
                {user.subscriptionExpiry ? new Date(user.subscriptionExpiry).toLocaleDateString() : 'No expiry date'}
              </span>
            </div>
            <div className={styles.subscriptionRow}>
              <span>Price</span>
              <div>
                <div className={styles.price}>
                  {user.subscriptionPlan === "PAID" ? "9.99" : "0.00"}€
                </div>
                <div className={styles.pricePeriod}>Price per month</div>
              </div>
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
