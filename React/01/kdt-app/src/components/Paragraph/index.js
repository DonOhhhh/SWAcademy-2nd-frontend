import PropTypes from 'prop-types'

function Paragraph({ children, size = 16, color="white" }) {
    return (
        <p style={{ fontSize: size, color }}>{children}</p>
    )
}

Paragraph.propTypes = {
    children: PropTypes.node.isRequired, // jsx및 element를 받을 수 있는 타입
    size: PropTypes.number,
    color: PropTypes.string
}

export default Paragraph;