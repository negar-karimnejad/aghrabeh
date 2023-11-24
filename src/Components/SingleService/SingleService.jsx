import { Link } from "react-router-dom";
import "./SingleService.css";

function SingleService({ src, link }) {
  return (
    <Link to={link}>
      <div className="service">
        <img src={src} alt="single-service" loading="lazy"/>
      </div>
    </Link>
  );
}

export default SingleService;
