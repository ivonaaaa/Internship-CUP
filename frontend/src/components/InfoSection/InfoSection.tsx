import c from "./InfoSection.module.css";
import arrowRight from "../../assets/images/whiteArrowRight.svg";

type InfoSectionProps = {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
};

export const InfoSection = ({ title, onClick }: InfoSectionProps) => {
  return (
    <div className={c.infoSectionBox} onClick={onClick}>
      <div className={c.infoSectionHeader}>
        <h1>{title}</h1>
        <img src={arrowRight} className={c.arrowIcon} alt="Open section" />
      </div>
    </div>
  );
};
