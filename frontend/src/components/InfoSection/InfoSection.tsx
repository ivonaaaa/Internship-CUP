import c from "./InfoSection.module.css";
import arrowUp from "../../assets/images/arrowUp.svg";
import arrowDown from "../../assets/images/arrowDown.svg";

type InfoSectionProps = {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
};

export const InfoSection = ({
  title,
  content,
  isOpen,
  onClick,
}: InfoSectionProps) => {
  const arrow = isOpen ? arrowUp : arrowDown;
  return (
    <div className={c.infoSectionBox}>
      <div className={c.infoSectionHeader}>
        <h1>{title}</h1>
        <img src={arrow} onClick={onClick} />
      </div>
      <div className={`${c.contentWrapper} ${isOpen ? c.open : ""}`}>
        <p className={c.content}>{content}</p>
      </div>
    </div>
  );
};
