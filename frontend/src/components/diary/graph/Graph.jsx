import ChartBodyComposition from "./ChartBodyComposition";
import ChartWeight from "./ChartWeight";

const Graph = () => {
  return (
    <div className="bg-[#C9DECF]/30 pb-20">
      <div className="flex flex-col gap-10">
        <ChartWeight />
        <ChartBodyComposition />
      </div>
    </div>
  );
};

export default Graph;
