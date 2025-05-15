import { useState } from "react";
import { InfoSection } from "../../components/InfoSection";
import { NavBar } from "../../components/NavBar";
import laws from "./laws.json";
import arrowLeft from "../../assets/images/whiteArrowLeft.svg";
import c from "./InfoPage.module.css";

type InfoSectionType = {
  title: string;
  content: string;
};

export const InfoPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleSectionClick = (index: number) => {
    setOpenIndex(index);
  };

  const handleBackClick = () => {
    setOpenIndex(null);
  };

  return (
    <div className={c.infoPage}>
      {openIndex === null ? (
        <>
          <h1 className={c.infoPageHeader}>
            Rules <br /> and help
          </h1>
          <div className={c.infoPageContent}>
            {laws.map((section: InfoSectionType, index: number) => (
              <InfoSection
                key={index}
                title={section.title}
                content={section.content}
                isOpen={false}
                onClick={() => handleSectionClick(index)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={c.blueTopBackground}></div>
          <div className={c.detailHeader}>
            <img
              src={arrowLeft}
              alt="Back"
              className={c.backButton}
              onClick={handleBackClick}
            />
            <h1 className={c.detailTitle}>Rules and help</h1>
          </div>
          <div className={c.detailContent}>
            <h2>{laws[openIndex].title}</h2>
            <p className={c.detailText}>{laws[openIndex].content}</p>
          </div>
        </>
      )}
      <NavBar />
    </div>
  );
};
