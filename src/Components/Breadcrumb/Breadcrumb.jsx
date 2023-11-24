import { Link } from "react-router-dom";
import "./Breadcrumb.css";

export default function Breadcrumb({ links }) {
  return (
    <section className="breadcrumb">
      <div className="container">
        <div className="breadcrumb__content">
          <ul className="breadcrumb__list">
            <li className="breadcrumb__item">
              <Link to={`/`} className="breadcrumb__link">
                صفحه نخست
              </Link>
              <i className="fas fa-angle-left breadcrumb__icon"></i>

              {links.map((link) => (
                <li className="breadcrumb__item" key={link.id}>
                  <Link to={link.to} className="breadcrumb__link">
                    {link.title}
                  </Link>
                  {links.length > link.id && (
                    <i className="fas fa-angle-left breadcrumb__icon"></i>
                  )}
                </li>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
