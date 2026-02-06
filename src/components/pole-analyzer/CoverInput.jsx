import { RotateCcw, ChevronRight } from "lucide-react";

export function CoverInput({ cover, onUpdate, onMake, errors }) {
  // Function to reset all imputs to default (empty)
  const handleReset = () => {
    onUpdate({
      managementMark: "",
      calculationNumber: "",
      projectName: "",
      contentr2: "",
      contentr3: "",
      date: "",
    });
  };

  // Function to helper class input
  const inputClass = (hasError) =>
    `w-full px-4 py-2 rounded-lg outline-none transition-all border
  ${
    hasError
      ? "border border-red-500 bg-[#fff5f5] ring-1 ring-red-200 focus:border-red-500 focus:ring-1 focus:ring-red-200"
      : "border-gray-300 bg-white focus:border-[#3399cc] focus:ring-1 focus:ring-[#3399cc]"
  } hp:py-2 hp:px-2 hp:rounded-md hp:text-xs`;

  // Function to helper text error
  const ErrorText = ({ show, text }) =>
    show ? (
      <div className="absolute left-0 -bottom-5 flex items-center gap-1 text-[11px] text-red-500 hp:text-[9px] hp:-bottom-4">
        <span>*{text}</span>
      </div>
    ) : null;

  return (
    <div>
      {/* FORM CARD WRAPPER */}
      <div className="bg-white border border-gray-200 p-5 rounded-b-xl shadow-sm hp:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-7 hp:gap-y-5">
          {/* FIELD: Management Code */}
          <div className="relative">
            <label className="block text-gray-700 mb-2 text-sm font-medium hp:text-xs hp:mb-1">
              Management Code
            </label>
            <input
              type="text"
              value={cover.managementMark}
              onChange={(e) => {
                // Take user input => convert it to capital letters
                const raw = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");

                // Only take a maximum of 3 letters
                const letters = raw.slice(0, 3);

                // Auto format: A ー B ー C
                const formatted = letters.split("").join(" ー ");

                onUpdate({ managementMark: formatted });
              }}
              className={inputClass(errors.managementMark)}
            />
            <ErrorText show={errors.managementMark} text="Required field" />
          </div>

          {/* FIELD: Calculation Document Number */}
          <div className="relative">
            <label className="block text-gray-700 mb-2 text-sm font-medium hp:text-xs hp:mb-1">
              Calculation Document Number
            </label>
            <input
              type="text"
              value={cover.calculationNumber}
              onChange={(e) => onUpdate({ calculationNumber: e.target.value })}
              className={inputClass(errors.calculationNumber)}
            />
            <ErrorText show={errors.calculationNumber} text="Required field" />
          </div>

          {/* FIELD: Project Name */}
          <div className="relative md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium hp:text-xs hp:mb-1">
              Line 1
            </label>
            <input
              type="text"
              value={cover.projectName}
              onChange={(e) => onUpdate({ projectName: e.target.value })}
              className={inputClass(errors.projectName)}
            />
            <ErrorText show={errors.projectName} text="Required field" />
          </div>

          {/* FIELD: Content Row 2 (Optional) */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium hp:text-xs hp:mb-1">
              Line 2 (Optional)
            </label>
            <input
              type="text"
              value={cover.contentr2}
              onChange={(e) => onUpdate({ contentr2: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all bg-white  hp:py-2 hp:px-2 hp:rounded-md hp:text-xs"
            />
          </div>

          {/* FIELD: Content Row 3 (Optional) */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium hp:text-xs hp:mb-1">
              Line 3 (Optional)
            </label>
            <input
              type="text"
              value={cover.contentr3}
              onChange={(e) => onUpdate({ contentr3: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all bg-white  hp:py-2 hp:px-2 hp:rounded-md hp:text-xs"
            />
          </div>

          {/* FIELD: Document Date */}
          <div className="relative md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium hp:text-xs hp:mb-1">
              Document Date
            </label>
            <input
              type="date"
              value={cover.date}
              onChange={(e) => onUpdate({ date: e.target.value })}
              className={inputClass(errors.date)}
            />
            <ErrorText show={errors.date} text="Required field" />
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-200 hp:mt-6"></div>

        {/* FOOTER: LEFT (Reset) & RIGHT (Make Report) */}
        <div className="flex justify-between items-center pt-6 hp:pt-4">
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-7 py-2.5 h-[45px] bg-[#eef2f6] text-[#0d3b66]
            border-2 border-[#d0d7e2] rounded-lg hover:bg-[#e2e8f0] transition-colors font-medium hp:h-[40px] hp:text-xs hp:px-[20px] hp:py-[10px] hp:h-0"
          >
            <RotateCcw className="w-5 h-5 hp:w-4 hp:h-4" />
            Reset
          </button>

          {/* Make Report Button */}
          <button
            onClick={onMake}
            className="flex items-center gap-2 px-7 py-2.5 h-[45px] 
            bg-gradient-to-r from-[#0d3b66] to-[#3399cc]
            text-white rounded-lg 
            hover:brightness-110 transition-all shadow-sm font-medium hp:h-[40px] hp:text-xs hp:px-[20px] hp:py-[10px]"
          >
            Make Report
            <ChevronRight className="w-5 h-5 hp:w-4 hp:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
