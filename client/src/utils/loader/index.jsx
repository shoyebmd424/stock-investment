import { Spinner } from "reactstrap";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="hair-loader">
      <Spinner className="m-5" color="primary">
        Loading...
      </Spinner>
    </div>
  );
};

export default Loader;
