import { FaSpinner } from "react-icons/fa";

export const Spinner = (props) => (
  <span {...props}>
    <FaSpinner className="icon-loading" />
  </span>
);
