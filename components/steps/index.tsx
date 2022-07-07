import { PanelStep } from "./panel";
import { SimpleStep } from "./simple";
import { CircularStep } from "./circular";

type StepsProps = {
  valiant: "simple" | "panel" | "circular";
  current: number;
  steps: string[];
};

const Steps = (props: StepsProps) => {
  return (
    <div className={`grid gap-3 grid-flow-col grid-rows-1 auto-cols-auto`}>
      {props.steps.map((d, idx) => {
        const variant = idx + 1 > props.current ? "unfinished" : "finished";
        return (
          <div key={`simple-step-${idx + 1}`} className="mx-2">
            <PanelStep step={idx + 1} variant={variant} detail={d} />
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
