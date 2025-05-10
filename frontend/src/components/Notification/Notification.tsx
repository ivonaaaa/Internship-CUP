import c from "./notification.module.css";
import { RuleType } from "../../types";
import closeButton from "../../assets/closeButton.svg";

type NotificationProps = {
  type: RuleType;
  title: string;
  distance?: number;
  message: string;
  onClose: () => void;
};

export const Notification = ({
  type,
  title,
  distance,
  message,
  onClose,
}: NotificationProps) => {
  const getNotificationClasses = () => {
    switch (type) {
      case "RESTRICTION":
        return {
          container: `${c.notification} ${c.restriction}`,
          title: c.restrictionTitle,
        };
      case "WARNING":
        return {
          container: `${c.notification} ${c.warning}`,
          title: c.warningTitle,
        };
      case "INFO":
        return {
          container: `${c.notification} ${c.info}`,
          title: c.infoTitle,
        };
      default:
        return {
          container: `${c.notification} ${c.info}`,
          title: c.infoTitle,
        };
    }
  };

  const classes = getNotificationClasses();

  return (
    <div className={classes.container}>
      <div className={c.contentContainer}>
        <div className={`${c.title} ${classes.title}`}>{title}</div>
        <div className={c.message}>{message}</div>
        {distance && <div className={c.distance}>{distance.toFixed(2)} m</div>}
      </div>
      <div className={c.closeIcon} onClick={onClose}>
        <img src={closeButton} alt="close button" />
      </div>
    </div>
  );
};
