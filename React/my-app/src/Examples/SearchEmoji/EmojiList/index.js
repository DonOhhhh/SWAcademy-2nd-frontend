import styled from "@emotion/styled";
import EmojiListItem from "../EmojiListItem";

const Container = styled.ul`
    width: 100%;
    padding: 0;
`;

const EmojiList = ({ emojis, keyword }) => {
    return (
        <Container>
            {emojis
                .filter(
                    (emoji) =>
                        emoji.title.indexOf(keyword) > -1 ||
                        emoji.keywords.indexOf(keyword) > -1
                )
                .map((emoji) => (
                    <EmojiListItem key={emoji.title} emoji={emoji} />
                ))}
        </Container>
    );
};

export default EmojiList;
