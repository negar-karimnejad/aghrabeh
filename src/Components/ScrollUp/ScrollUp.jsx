import { MdKeyboardArrowUp } from "react-icons/md";
import "./ScrollUp.css";

function ScrollUp() {
  const scrollUp = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="scroll-up" onClick={scrollUp}>
      <MdKeyboardArrowUp />
    </div>
  );
}

export default ScrollUp;
