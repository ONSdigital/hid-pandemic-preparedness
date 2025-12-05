import type { FC } from "react";

import type { ContentHighlightProps } from "./ContentHighlight.interface";

export const ContentHighlight: FC<ContentHighlightProps> = (props) => {
  return (
    <>
      <p>Hello</p>
      {/* <Dynamic content={props.content} /> */}
      {/* <div className={clsx("w-100", "py-4", "wrapper-colors")}>
            <div class="container-lg border rounded p-4 container-colors">
                {textarea.map((blok: any) => <DynamicComponent blok={blok} />)}
            </div>
        </div> */}
    </>
  );
};
