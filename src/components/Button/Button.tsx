import type { FC } from "react";

import "./Button.scss";
import type { ButtonProps } from "./Button.interface";

export const Button: FC<ButtonProps> = () => {
  return <button className="button button--primary">Lick me!</button>;
};
