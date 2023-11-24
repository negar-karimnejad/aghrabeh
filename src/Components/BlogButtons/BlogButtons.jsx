import { Link } from "react-router-dom";
import "./BlogButtons.css";

function BlogButtons() {
  return (
    <div className="blog-buttons">
      <Link to={""}>
        <button>بعدی</button>
      </Link>
      <Link to={""}>
        <button>قبلی</button>
      </Link>
    </div>
  );
}

export default BlogButtons;
