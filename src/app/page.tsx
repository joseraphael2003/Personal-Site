import { Scaffold } from "@/components/layout/scaffold";

export default function Home() {
  return (
    <Scaffold>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Bento Grid */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-card aspect-square rounded-xl p-6 flex items-end">
            <h3 className="text-xl font-bold text-white">Project {i}</h3>
          </div>
        ))}
        {/* Extra space to allow scrolling to trigger the effect */}
        <div className="h-[100vh] col-span-full flex items-center justify-center text-muted-text/20">
          Scroll for Morph Effect
        </div>
      </div>
    </Scaffold>
  );
}
