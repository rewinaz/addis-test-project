import { Select } from "@rebass/forms";
import { genres } from "../../data";
import { Children } from "react";

type Props = {
  field: any;
  name: string;
  id: string;
  value: string;
  form: { touched: any; errors: any };
  children:any;
};

const SelectField = ({ field, id, name,children, ...props }: Props) => {
  return (
    <Select
      id={id}
      name={name}
      {...field}
      {...props}
      sx={{
        backgroundColor: "#333333",
        color: "white",
        mb: 3,
      }}
    >
      {
		children
	  }
    </Select>
  );
};

export default SelectField;
