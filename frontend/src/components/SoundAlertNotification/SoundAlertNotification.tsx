import { useState } from "react";
import c from "./SoundAlertNotification.module.css";

type SoundAlertNotificationProps = {
  onClose: () => void;
};

export const SoundAlertNotification = ({
  onClose,
}: SoundAlertNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={c.soundAlert}>
      <div className={c.soundAlertContent}>
        <h2>Make sure your sound is on so you hear the alerts</h2>
        <div onClick={handleClose} className={c.okayButton}>
          Okay
        </div>
      </div>
    </div>
  );
};
