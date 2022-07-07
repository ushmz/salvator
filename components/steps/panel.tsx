type PanelStepProps = {
  variant: "finished" | "current" | "unfinished";
  step?: number;
  detail: string;
};

export const PanelStep = (props: PanelStepProps) => {
  if (props.variant === "unfinished") {
    return (
      <div className="border rounded-md">
        <div className="w-64 h-1 bg-gray-400"></div>
        <div className="mt-1">
          {props.step && <p className="font-medium text-gray-500 uppercase">{`Step${props.step}`}</p>}
          <p className="font-medium">{props.detail}</p>
        </div>
      </div>
    );
  } else if (props.variant === "current") {
    <div className="border rounded-md">
      <div className="w-64 h-1 bg-gray-400"></div>
      <div className="mt-1">
        {props.step && <p className="font-medium text-gray-500 uppercase">{`Step${props.step}`}</p>}
        <p className="font-medium">{props.detail}</p>
      </div>
    </div>;
  }
  return (
    <div className="border rounded-md">
      <div className="w-64 h-1 bg-gray-400"></div>
      <div className="mt-1">
        {props.step && <p className="font-medium text-gray-500 uppercase">{`Step${props.step}`}</p>}
        <p className="font-medium">{props.detail}</p>
      </div>
    </div>
  );
};

type PanelStepsProps = {
  current: number;
  steps: string[];
};

const PanelSteps = (props: PanelStepsProps) => {
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

export default PanelSteps;
