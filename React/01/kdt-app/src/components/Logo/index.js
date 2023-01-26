import logo from './logo.svg';
import PropTypes from 'prop-types';

function Logo({ size = 100 }) {
    return (
        <img src={logo} className="App-logo" alt="logo" style={{ width: size, height: size }} />
    )
}

Logo.propTypes = {
    size: PropTypes.number
}

export default Logo;
