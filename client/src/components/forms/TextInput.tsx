import { Input, InputProps } from "@rebass/forms";

type Props = {
  field: any;
  name: string;
  id: string;
  value: string;
  form: { touched: any; errors: any };
  type: "text" | "number";
};

const TextInput = ({ field, id, type="text", ...props }: Props) => {
  return <Input id={id} type={type} {...field} {...props} mb={3} />;
};

export default TextInput;
