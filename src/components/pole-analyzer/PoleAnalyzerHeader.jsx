import { Layout, RotateCcw } from "lucide-react";

export function HeaderCalculationPage({ onResetAll }) {
  return (
    <div
      className="
        bg-gradient-to-r from-[#0d3b66] to-[#0d3b66]
        shadow-lg
        sticky top-[64px] z-30 
        px-12 py-[23px]
        hp:px-4 hp:py-3 hp:top-[64px]
      "
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 hp:gap-2">
          <div className="bg-[#3399cc] p-2 hp:p-1.5 rounded-lg">
            <Layout className="w-6 h-6 hp:w-5 hp:h-5 text-white" />
          </div>

          <div>
            <h1 className="text-white text-[15px] hp:text-sm font-bold hp:font-semibold leading-tight">
              <span className="hp:hidden">Structural</span>Calculation System
            </h1>

            {/* desktop only */}
            <p className="text-white/70 text-xs font-semibold hp:hidden">
              Professional structural analysis tools
            </p>
          </div>
        </div>

        <button
          onClick={onResetAll}
          className="
            flex items-center gap-2
            bg-gray-200 text-[#0d3b66]
            px-7 py-3
            hp:px-4 hp:py-2.5
            rounded-lg hp:rounded-md
            font-semibold
            text-sm hp:text-xs
            shadow-sm
            hover:bg-gray-300 hover:shadow-md
            active:scale-95
            transition-all duration-200 ease-out
          "
        >
          <RotateCcw className="w-5 h-5 hp:w-4 hp:h-4" />

          {/* text control */}
          <span className="hp:hidden">Reset All</span>
          <span className="hidden hp:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}
