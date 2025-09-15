import type { FC } from "react";
import clsx from "clsx";

import type { StatisticsAndTextProps } from "./StatisticsAndText.interface";
import { CardStat } from "../../CardStat/CardStat";

export const StatisticsAndText: FC<StatisticsAndTextProps> = (props) => {
  return (
    <div className={clsx("w-100")}>
      <div className="container-lg">
        <div className="row row-cols-1 row-cols-lg-2 g-4">
          {props.statisticCards.map((card) => (
            <div key={card.id} className="col">
              <CardStat {...card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
