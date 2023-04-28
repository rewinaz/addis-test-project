import { Input, InputProps } from "@rebass/forms";

type Props = {};

const TextInput = (props: InputProps) => {
  return <Input {...props} mb={3} />;
};

export default TextInput;
