import c from "./HomePage.module.css";
import { Map } from "../../components/Map";

export const HomePage = () => {
  return (
    <div className={c.homePage}>
      <Map />
      <p>This is the main page of the application.</p>
    </div>
  );
};
