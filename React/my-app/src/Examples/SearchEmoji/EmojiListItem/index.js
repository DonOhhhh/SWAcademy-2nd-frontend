import styled from "@emotion/styled";

const ListItem = styled.li`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 0;
    border-bottom: 1px solid black;
    cursor: pointer;

    &:hover {
        background-color: lightgray;
    }
`;

const Symbol = styled.div`
    font-size: 24px;
    margin-right: 16px;
`;

const Title = styled.div`
    width: 200px;
`;

const Keywords = styled.div`
    flex: 1;
`;

const CopyGuide = styled.div`
    color: #ddd;
`;

const EmojiListItem = ({ emoji }) => {
    return (
        <ListItem onClick={() => navigator.clipboard.writeText(emoji.symbol)}>
            <Symbol>{emoji.symbol}</Symbol>
            <Title>{emoji.title}</Title>
            <Keywords>{emoji.keywords}</Keywords>
            <CopyGuide>click to copy emoji</CopyGuide>
        </ListItem>
    );
};

export default EmojiListItem;
