type StepProps = {
  variant: "finished" | "current" | "unfinished";
  step?: number;
  detail: string;
};

const SimpleStep = (props: StepProps) => {
  if (props.variant === "unfinished") {
    return (
      <div className="">
        <div className="w-64 h-1 bg-gray-400"></div>
        <div className="mt-1">
          {props.step && <p className="font-medium text-gray-500 uppercase">{`Step${props.step}`}</p>}
          <p className="font-medium">{props.detail}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div className="w-64 h-1 bg-blue-500"></div>
      <div className="mt-1">
        {props.step && <p className="font-medium text-blue-500 uppercase">{`Step${props.step}`}</p>}
        <p className="font-medium">{props.detail}</p>
      </div>
    </div>
  );
};

type StepsProps = {
  current: number;
  details: string[];
};

const SimpleSteps = (props: StepsProps) => {
  return (
    <div className={`grid gap-3 grid-flow-col grid-rows-1 auto-cols-auto`}>
      {props.details.map((d, idx) => {
        const variant = idx + 1 > props.current ? "unfinished" : "finished";
        return (
          <div key={`simple-step-${idx + 1}`} className="mx-2">
            <SimpleStep step={idx + 1} variant={variant} detail={d} />
          </div>
        );
      })}
    </div>
  );
};

export default SimpleSteps;
