import c from "./HomePage.module.css";
import { Map } from "../../components/Map";

export const HomePage = () => {
  return (
    <div className={c.homePage}>
      <Map />
    </div>
  );
};
