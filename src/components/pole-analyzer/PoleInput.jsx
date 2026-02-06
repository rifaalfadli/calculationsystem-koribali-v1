import React from "react";

export function PoleInput({ section, onUpdate, errors }) {
  // Function to helper class input
  const inputClass = (hasError) =>
    `w-full px-4 py-2.5 rounded-lg outline-none transition-all border text-sm pr-14
  ${
    hasError
      ? "border border-red-500 bg-[#fff5f5] ring-1 ring-red-200 focus:border-red-500 focus:ring-1 focus:ring-red-200"
      : "border-gray-300 bg-white focus:border-[#3399cc] focus:ring-1 focus:ring-[#3399cc]"
  } hp:pl-2 hp:py-2  hp:rounded-md hp:text-xs`;

  // Function to helper text error
  const ErrorText = ({ show, text }) =>
    show ? (
      <div className="absolute left-0 -bottom-5 flex items-center gap-1 text-[11px] text-red-500 hp:text-[9px] hp:-bottom-4">
        <span>*{text}</span>
      </div>
    ) : null;

  return (
    <div className="space-y-6 hp:space-y-4">
      {/* Basic Information */}
      <div>
        <h3 className="text-[#0d3b66] mb-4 flex items-center gap-2 text-sm font-medium hp:text-xs hp:gap-1">
          <div className="w-1 h-4 bg-[#3399cc] rounded-full hp:h-4"></div>
          Basic Information
        </h3>

        {/* Section Name input */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 hp:px-4 hp:py-5 hp:rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 hp:gap-5">
            <div className="relative">
              <label className="block text-gray-700 text-sm mb-2 hp:text-xs hp:mb-1">
                Pole Name
              </label>
              <input
                type="text"
                value={section.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="e.g., 支柱-1"
                className={inputClass(errors.name)}
              />
              <ErrorText show={errors.name} text="Required field" />
            </div>

            {/* Material Type selector */}
            <div className="relative">
              <label className="block text-gray-700 text-sm mb-2 hp:text-xs hp:mb-1">
                Material Type
              </label>
              <select
                value={section.material}
                onChange={(e) => onUpdate({ material: e.target.value })}
                className={inputClass(errors.material)}
              >
                <option value="STK400">STK400</option>
                <option value="STK490">STK490</option>
                <option value="STK500">STK500</option>
                <option value="STK540">STK540</option>
                <option value="STKR400">STKR400</option>
              </select>
              <ErrorText show={errors.material} text="Required field" />
            </div>

            {/* Pole Type selector */}
            <div>
              <label className="block text-gray-700 text-sm mb-2 hp:text-xs hp:mb-1">
                Pole Type
              </label>
              <select
                value={section.poleType}
                onChange={(e) => onUpdate({ poleType: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all bg-white hp:p-2 hp:ounded-md hp:text-xs"
              >
                <option value="Straight">Straight</option>
                <option value="Taper">Taper</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div>
        <h3 className="text-[#0d3b66] mb-4 flex items-center gap-2 text-sm font-medium hp:text-xs hp:gap-1">
          <div className="w-1 h-5 bg-[#3399cc] rounded-full hp:h-4"></div>
          Dimensions & Specifications
        </h3>

        <div className="bg-white p-5 rounded-xl border border-gray-200 hp:px-4 hp:py-5 hp:rounded-lg">
          {/* Straight type => 2 columns */}
          {section.poleType === "Straight" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Straight Diameter */}
              <div className="relative">
                <label className="block text-gray-600 text-sm mb-2 hp:text-xs hp:mb-1">
                  Diameter Pole
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.diameterLower}
                    onChange={(e) =>
                      onUpdate({ diameterLower: e.target.value })
                    }
                    className={inputClass(errors.diameterLower)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-black-400 hp:text-xs">
                    mm
                  </span>
                </div>
                <ErrorText show={errors.diameterLower} text="Required field" />
              </div>

              {/* Straight Thickness */}
              <div className="relative">
                <label className="block text-gray-600 text-sm mb-2 hp:text-xs hp:mb-1">
                  Thickness Pole
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.thicknessLower}
                    onChange={(e) =>
                      onUpdate({ thicknessLower: e.target.value })
                    }
                    className={inputClass(errors.thicknessLower)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-black-400 hp:text-xs">
                    mm
                  </span>
                </div>
                <ErrorText show={errors.thicknessLower} text="Required field" />
              </div>
            </div>
          ) : (
            /* Taper type => 4 columns */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Diameter Lower */}
              <div className="relative">
                <label className="block text-gray-600 mb-2 hp:text-xs hp:mb-1">
                  Diameter Lower
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.diameterLower}
                    onChange={(e) =>
                      onUpdate({ diameterLower: e.target.value })
                    }
                    className={inputClass(errors.diameterLower)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400 hp:text-xs">
                    mm
                  </span>
                </div>
                <ErrorText show={errors.diameterLower} text="Required field" />
              </div>

              {/* Diameter Upper */}
              <div className="relative">
                <label className="block text-gray-600 mb-2 hp:text-xs hp:mb-1">
                  Diameter Upper
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.diameterUpper}
                    onChange={(e) =>
                      onUpdate({ diameterUpper: e.target.value })
                    }
                    className={inputClass(errors.diameterUpper)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400 hp:text-xs">
                    mm
                  </span>
                </div>
                <ErrorText show={errors.diameterUpper} text="Required field" />
              </div>

              {/* Thickness Lower */}
              <div className="relative">
                <label className="block text-gray-600 mb-2 hp:text-xs hp:mb-1">
                  Thickness Lower
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.thicknessLower}
                    onChange={(e) =>
                      onUpdate({ thicknessLower: e.target.value })
                    }
                    className={inputClass(errors.thicknessLower)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400 hp:text-xs">
                    mm
                  </span>
                </div>
                <ErrorText show={errors.thicknessLower} text="Required field" />
              </div>

              {/* Thickness Upper */}
              <div className="relative">
                <label className="block text-gray-600 mb-2 hp:text-xs hp:mb-1">
                  Thickness Upper
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.thicknessUpper}
                    onChange={(e) =>
                      onUpdate({ thicknessUpper: e.target.value })
                    }
                    className={inputClass(errors.thicknessUpper)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400 hp:text-xs">
                    mm
                  </span>
                </div>
                <ErrorText show={errors.thicknessUpper} text="Required field" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Height and Quantity */}
      <div>
        <h3 className="text-[#0d3b66] mb-4 flex items-center text-sm gap-2 font-medium hp:text-xs hp:gap-1">
          <div className="w-1 h-5 bg-[#3399cc] rounded-full hp:h-4"></div>
          Additional Parameters
        </h3>

        <div className="bg-white p-5 rounded-xl border border-gray-200 hp:px-4 hp:py-5 hp:rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 hp:gap-5">
            {/* Height input */}
            <div className="relative">
              <label className="block text-gray-700 text-sm mb-2 hp:text-xs hp:mb-1">
                Height (Z/H)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={section.height}
                  onChange={(e) => onUpdate({ height: e.target.value })}
                  className={inputClass(errors.height)}
                />
                <span className="absolute right-4 text-sm top-1/2 -translate-y-1/2 text-black-400 hp:text-xs">
                  mm
                </span>
              </div>
              <ErrorText show={errors.height} text="Required field" />
            </div>

            {/* Quantity input */}
            <div className="relative">
              <label className="block text-gray-700 text-sm mb-2 hp:text-xs hp:mb-1">
                Quantity
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={section.quantity}
                  onChange={(e) => onUpdate({ quantity: e.target.value })}
                  placeholder="1"
                  min="1"
                  className={inputClass(errors.quantity)}
                />
                <span className="absolute right-4 text-sm top-1/2 -translate-y-1/2 text-black-400 hp:text-xs">
                  pcs
                </span>
              </div>

              <ErrorText show={errors.quantity} text="Required field" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
