import clsx from "clsx";
import type { FC } from "react";

import { TextModule } from "@components/TextModule/TextModule";

import type { ExplainerProps } from "./Explainer.interface";
import styles from "./Explainer.module.scss";

// Renders input `htmlContent` using the `TextModule` component
export const Explainer: FC<ExplainerProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["explainer-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <TextModule {...props} />
      </div>
    </div>
  );
};
