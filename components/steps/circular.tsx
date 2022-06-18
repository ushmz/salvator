import { Check } from "react-feather";

function range(start: number, end: number) {
  const arr = Array<number>(end - start + 1);
  for (let i = 0; i <= end - start; i++) {
    arr[i] = start + i;
  }
  return arr;
}

type StepProps = {
  variant: "finished" | "current" | "unfinished";
};

const CircularStep = ({ variant }: StepProps) => {
  if (variant === "finished") {
    return (
      <div className="w-6 h-6 bg-blue-500 rounded-full grid">
        <Check className="mt-1 justify-self-center" color="white" size={18} />
      </div>
    );
  } else if (variant === "current") {
    return (
      <div className="w-6 h-6 border-2 border-blue-500 rounded-full grid">
        <div className="justify-self-center w-2 h-2 mt-1.5 bg-blue-500 rounded-full" />
      </div>
    );
  }
  return (
    <div className="w-6 h-6 border-2 border-gray-400 rounded-full grid">
      <div className="justify-self-center"></div>
    </div>
  );
};

type CircularStepsProps = {
  current: number;
  max: number;
};

const CircularSteps = ({ current, max }: CircularStepsProps) => {
  return (
    <div className="flex">
      {current === 1 ? (
        <CircularStep variant="current" key={`circular-setp-1`} />
      ) : (
        <CircularStep variant="finished" key={`circular-setp-1`} />
      )}
      {range(2, max).map((i) => {
        if (i === current) {
          return (
            <div key={`circular-setp-${i}`} className="flex items-center justify-center">
              <span className="w-20 h-0.5 text-center bg-blue-500"></span>
              <CircularStep variant="current" key={`circular-setp-${i}`} />
            </div>
          );
        } else if (i <= current) {
          return (
            <div key={`circular-setp-${i}`} className="flex items-center justify-center">
              <div className="w-20 h-0.5 bg-blue-400"></div>
              <CircularStep variant="finished" />
            </div>
          );
        } else if (i >= current) {
          return (
            <div key={`circular-setp-${i}`} className="flex items-center justify-center">
              <div className="w-20 h-0.5 bg-gray-400"></div>
              <CircularStep variant="unfinished" />
            </div>
          );
        }
      })}
    </div>
  );
};

export default CircularSteps;
