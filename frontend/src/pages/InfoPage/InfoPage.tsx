import c from "./InfoPage.module.css";
import { InfoSection } from "../../components/InfoSection";
import { useState } from "react";
import homeButton from "../../assets/images/Home.png";
import laws from "./laws.json";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";

type InfoSectionType = {
  title: string;
  content: string;
};

export const InfoPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleSectionClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const navigate = useNavigate();

  return (
    <div className={c.infoPage}>
      <h1 className={c.infoPageHeader}>Rules and help</h1>
      <div className={c.infoPageContent}>
        {laws.map((section: InfoSectionType, index: number) => (
          <InfoSection
            key={index}
            title={section.title}
            content={section.content}
            isOpen={openIndex === index}
            onClick={() => handleSectionClick(index)}
          />
        ))}
      </div>
      <img
        className={c.homeButton}
        src={homeButton}
        onClick={() => {
          navigate(ROUTES.HOME);
        }}
        alt="Home"
      />
    </div>
  );
};
