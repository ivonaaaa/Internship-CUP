import { Map } from "../../components/Map";
import c from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={c.homePage}>
      <Map />
    </div>
  );
};
