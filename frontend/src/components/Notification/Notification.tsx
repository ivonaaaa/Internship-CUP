import c from "./notification.module.css";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { RuleType } from "../../types";
import closeButton from "../../assets/closeButton.svg";

type NotificationProps = {
  type: RuleType;
  title: string;
  message: string;
  onClose: () => void;
};

export const Notification = ({
  type,
  title,
  message,
  onClose,
}: NotificationProps) => {
  const getNotificationClasses = () => {
    switch (type) {
      case "RESTRICTION":
        return {
          container: `${c.notification} ${c.restriction}`,
          icon: c.restrictionIcon,
          title: c.restrictionTitle,
        };
      case "WARNING":
        return {
          container: `${c.notification} ${c.warning}`,
          icon: c.warningIcon,
          title: c.warningTitle,
        };
      case "INFO":
        return {
          container: `${c.notification} ${c.info}`,
          icon: c.infoIcon,
          title: c.infoTitle,
        };
      default:
        return {
          container: `${c.notification} ${c.info}`,
          icon: c.infoIcon,
          title: c.infoTitle,
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case "RESTRICTION":
        return <AlertCircle size={20} />;
      case "WARNING":
        return <AlertTriangle size={20} />;
      case "INFO":
        return <Info size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const classes = getNotificationClasses();

  return (
    <div className={classes.container}>
      <div className={`${c.iconContainer} ${classes.icon}`}>{getIcon()}</div>
      <div className={c.contentContainer}>
        <div className={`${c.title} ${classes.title}`}>{title}</div>
        <div className={c.message}>{message}</div>
      </div>
      <div className={c.closeIcon} onClick={onClose}>
        <img src={closeButton} alt="Close" />
      </div>
    </div>
  );
};
