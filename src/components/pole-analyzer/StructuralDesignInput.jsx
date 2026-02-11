export function StructuralDesign({ structuralDesign, onUpdate, errors }) {
  // Function to helper class input
  const inputClass = (hasError) =>
    `w-full px-4 py-2.5 rounded-lg outline-none transition-all text-sm border
    ${
      hasError
        ? "border border-red-500 bg-[#fff5f5] ring-1 ring-red-200 focus:border-red-500 focus:ring-1 focus:ring-red-200"
        : "border-gray-300 bg-white focus:border-[#3399cc] focus:ring-1 focus:ring-[#3399cc]"
    } hp:py-2 hp:px-3 hp:rounded-md hp:text-xs`;

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
      <div className="bg-white border border-gray-200 p-5 shadow-sm rounded-xl hp:rounded-b-lg hp:px-4 hp:py-6">
        {/* 2-Column Grid (Responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 hp:gap-y-6">
          {/* FIELD : Lowest Step (Height) */}
          <div className="relative">
            <label className="block text-gray-700 text-sm mb-2 hp:text-xs hp:mb-1">
              Lowest Step (Height)
            </label>
            <div className="relative">
              <input
                type="number"
                value={structuralDesign.lowestStep}
                onChange={(e) => onUpdate({ lowestStep: e.target.value })}
                onWheel={(e) => e.target.blur()}
                className={`${inputClass(errors.lowestStep)} pr-10 hp:pr-10`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-black-400 hp:text-xs">
                m
              </span>
            </div>
            <ErrorText show={errors.lowestStep} text="Required field" />
          </div>

          {/* FIELD : Overdesign (Factor) */}
          <div className="relative">
            <label className="block text-gray-700 text-sm mb-2 hp:text-xs hp:mb-1">
              Overdesign (Factor)
            </label>
            <div className="relative">
              <input
                type="number"
                value={structuralDesign.overDesign}
                onChange={(e) => onUpdate({ overDesign: e.target.value })}
                onWheel={(e) => e.target.blur()}
                className={`${inputClass(errors.overDesign)} pr-14 hp:pr-10`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-black-400 hp:text-xs">
                m/s
              </span>
            </div>
            <ErrorText show={errors.overDesign} text="Required field" />
          </div>
        </div>
      </div>
    </div>
  );
}
