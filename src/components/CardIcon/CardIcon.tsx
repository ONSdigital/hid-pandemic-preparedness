import type { FC } from "react";
// import clsx from "clsx";

import type { CardIconProps } from "./CardIcon.interface";

export const CardIcon: FC<CardIconProps> = (props) => {
  return (
    <div className="card">
      <div className="card-body">This is some text within a card body.</div>
    </div>
  );
};
