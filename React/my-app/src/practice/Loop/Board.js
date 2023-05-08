import PropTypes from "prop-types";

const Board = ({ articles }) => {
    return (
        <div>
            <h1>Board</h1>

            <ul>
                {articles.map(({ id, title, author }) => (
                    <li key={id}>
                        {id} | {title} | {author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

Board.propTypes = {
    articles: PropTypes.array,
};

export default Board;
