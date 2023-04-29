import React from "react";
import styled from "styled-components";

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return <ErrorMessageStyle>{message}</ErrorMessageStyle>;
};

const ErrorMessageStyle = styled.div`
  color: red;
  font-size: 0.8rem;
`;

export default ErrorMessage;
