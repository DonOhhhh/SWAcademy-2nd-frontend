import logo from "./logo.svg";
import PropTypes from "prop-types";

function Logo({ size = 50 }) {
    return (
        <img
            src={logo}
            style={{ width: size, height: size }}
            className="App-logo"
            alt="logo"
        />
    );
}

Logo.propTypes = {
    size: PropTypes.number,
};

export default Logo;
