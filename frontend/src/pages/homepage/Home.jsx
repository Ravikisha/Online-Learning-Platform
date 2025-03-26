import { Link } from "react-router-dom";

import "./home.css";

import homemainimg from "../../images/homemain.svg";

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1>
          Discover a <span className="highlight">New Era</span> of <br />{" "}
          Digital Learning
        </h1>
        <p>
          Experience a seamless and engaging way to learn anytime, anywhere.{" "}
          <br />
          Gain knowledge at your own pace with our interactive platform.
        </p>
        <Link to="/Register" className="register-btn">
          Get Started
        </Link>
        <p>
          Already a user?
          <Link to="/Login" className="login-btn">
            Login Here
          </Link>
        </p>
      </div>

      <div className="homepage-img-container">
        <img
          src={homemainimg}
          alt="Digital Learning"
          className="homepage-img"
        />
      </div>
    </div>
  );
}
