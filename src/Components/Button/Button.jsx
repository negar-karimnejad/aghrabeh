import {MdKeyboardArrowLeft} from "react-icons/md"
import "./Button.css";


function Button() {
  return (
    <button className="button">
      مشاهده همه
      <span>
        <MdKeyboardArrowLeft />
      </span>
    </button>
  );
}

export default Button;
