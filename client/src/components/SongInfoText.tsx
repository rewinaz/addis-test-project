import { Text, Flex, Heading } from "rebass";

type Props = {
  title: string;
  subTitle: string;
};

const SongInfoText = ({ title, subTitle }: Props) => {
  return (
    <Flex flexDirection={"column"} mb={1}>
      <Text
        fontSize={3}
        sx={{ textTransform: "capitalize", fontWeight: "bold" }}
      >
        {title}
      </Text>
      <Text
        fontSize={1}
        color={"#949494"}
		pl={3}
        sx={{ textTransform: "capitalize" }}
      >
        {subTitle}
      </Text>
    </Flex>
  );
};

export default SongInfoText;
