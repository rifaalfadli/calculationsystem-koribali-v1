import React, { useState } from "react";
import PropTypes from "prop-types";
import { FileText, FileSpreadsheet, CheckCircle2 } from "lucide-react";

export function ResultsTable({ results, resultsDo, resultsOhw, onCoverInput }) {
  const [page] = useState(0);
  const r = results[page]; // current Pole

  const [pageDo] = useState(0);
  const rDo = resultsDo[pageDo]; // current DO

  const [pageOhw] = useState(0);
  const rOhw = resultsOhw[pageOhw]; // current OHW

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d3b66] to-[#0d3b66] px-6 py-5 hp:px-4 hp:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* LEFT */}
          <div className="flex items-center gap-3 hp:gap-2">
            <div className="bg-white/10 backdrop-blur-sm p-2 hp:p-1.5 rounded-lg">
              <CheckCircle2 className="w-6 h-6 hp:w-5 hp:h-5 text-white" />
            </div>

            <div>
              <h2 className="text-white mb-0.5 text-sm hp:text-xs font-semibold">
                Calculation Results
              </h2>

              {/* hide description on mobile */}
              <p className="text-white/70 text-xs font-medium hp:hidden">
                Comprehensive structural analysis output
              </p>
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={onCoverInput}
            className="
              flex items-center gap-2
              px-7 py-2.5
              hp:px-3 hp:py-2
              bg-white text-[#0d3b66]
              rounded-lg hp:rounded-md
              text-sm hp:text-xs
              shadow-md hover:shadow-lg
              transition-all duration-300
              transform hover:scale-105
              border-2 border-transparent
              font-medium
            "
          >
            <FileText className="w-5 h-5 hp:w-4 hp:h-4" />

            {/* text shorten on mobile */}
            <span className="hp:hidden">Make Report</span>
            <span className="hidden hp:inline">Report</span>
          </button>
        </div>
      </div>

      {/* ==============================================> Tabel Result Pole <============================================== */}
      {r && (
        <div className="mx-6 my-6 mb-16 space-y-6 hp:mx-2 hp:mt-4 hp:mb-8 ">
          <div className="bg-gradient-to-r from-[#0d3b66] to-[#0d3b66] px-5 py-4 shadow-sm hp:px-4 hp:py-3">
            <div className="flex items-center gap-3 hp:gap-2">
              <div className="bg-white/15 backdrop-blur-sm p-2 rounded-lg hp:p-1.5">
                <FileSpreadsheet className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm leading-tight hp:text-xs">
                  Pole Specifications
                </h3>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50 text-[#0d3b66] text-xs hp:text-[10px]">
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    POLE
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Description
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Pole Type
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Dia Upper
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Dia Lower
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Thick Upper
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Thick Lower
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">Length</div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Height (z)
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold whitespace-nowrap hp:font-medium">
                      Center Point
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 whitespace-nowrap hp:text-[10px]">
                      CP (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Material
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#3399cc]/10 transition-colors text-xs hp:text-[10px]"
                  >
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.pole}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.description}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.poleType}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.poleType === "Straight" ? r.diaLower : r.diaUpper}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.diaLower}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.poleType === "Straight" ? r.thickLower : r.thickUpper}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.thickLower}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.length}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.heightPole}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.centerPoint}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.material}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50 text-[#0d3b66] text-xs hp:text-[10px]">
                  <th
                    className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium"
                    colSpan={4}
                  >
                    Allowable (Stress)
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold hp:font-medium">
                      Section Area
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (cm<sup>2</sup>)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold hp:font-medium">
                      Section Modulus
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (cm<sup>3</sup>)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold hp:font-medium">
                      Moment Inertia
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (cm<sup>4</sup>)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold hp:font-medium">Ip</div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (cm<sup>4</sup>)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold hp:font-medium">
                      Radius Gyration
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (cm)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold hp:font-medium">
                      Taper Ratio
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (mm)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium"
                    rowSpan={2}
                  >
                    Type of taper
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold whitespace-nowrap hp:font-medium">
                      HeightSection
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 whitespace-nowrap hp:text-[10px]">
                      (mm)
                    </div>
                  </th>
                </tr>

                <tr className="bg-blue-50 text-[#0d3b66] text-xs hp:text-[10px]">
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    fb
                  </th>
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    stb
                  </th>
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    sts
                  </th>
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    stc
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#3399cc]/10 transition-colors text-xs hp:text-[10px]"
                  >
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.fb}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.stb}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.sts}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.stc}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.sectionArea.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.sectionModulus.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.momentInertia.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.ip}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.radiusGyr.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.poleType === "Straight" ? "" : r.taperRatio}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center text-[12px] hp:px-3 hp:py-2 hp:text-[10px]">
                      {r.poleType === "Straight" ? "" : r.typeofTaper}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.heightSection}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==============================================> Tabel Result Direct Object <============================================== */}
      {rDo && (
        <div className="mx-6 my-6 mb-16 space-y-6 hp:mx-2 hp:mt-4 hp:mb-8">
          <div className="bg-gradient-to-r from-[#0d3b66] to-[#0d3b66] px-5 py-4 shadow-sm hp:px-4 hp:py-3">
            <div className="flex items-center gap-3 hp:gap-2">
              <div className="bg-white/15 backdrop-blur-sm p-2 rounded-lg hp:p-1.5">
                <FileSpreadsheet className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm leading-tight hp:text-xs">
                  Direct Object Calculation
                </h3>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50 text-[#0d3b66] text-xs hp:text-[10px]">
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    DO
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Description
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">Massa</div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (kg)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Fixed Load
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Front Area
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (m<sup>2</sup>)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Side Area
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (m<sup>2</sup>)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">Cf</div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Height (Z)
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Wind Load Area Front
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold  hp:font-medium">
                      Wind Load Area Side
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold  hp:font-medium">
                      Seismic Load
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold  hp:font-medium">
                      Quantity
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {resultsDo.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#3399cc]/10 transition-colors text-xs hp:text-[10px]"
                  >
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.doNum}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.nameDo}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.weightDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.flDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.frontAreaDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.sideAreaDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.cfDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.heightDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.wlafDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.wlasDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.slDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.qtyDo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==============================================> Tabel Result Overhead Wire <============================================== */}
      {rOhw && (
        <div className="mx-6 my-6 mb-16 space-y-6 hp:mx-2 hp:mt-4 hp:mb-8">
          <div className="bg-gradient-to-r from-[#0d3b66] to-[#0d3b66] px-5 py-4 shadow-sm hp:px-4 hp:py-3">
            <div className="flex items-center gap-3 hp:gap-2">
              <div className="bg-white/15 backdrop-blur-sm p-2 rounded-lg hp:p-1.5">
                <FileSpreadsheet className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm leading-tight hp:text-xs">
                  Overhead Wire Calculation
                </h3>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50 text-[#0d3b66] text-xs hp:text-[10px]">
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    OHW
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Description
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">Diameter</div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">Span</div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (m)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Sagging Ratio
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (%)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">Weight</div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (kg/m)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">FL</div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (kg)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">FL</div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold whitespace-nowrap hp:font-medium">
                      Area
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 whitespace-nowrap hp:text-[10px]">
                      (m<sup>2</sup>)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Cf
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Height (Z)
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (mm)
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {resultsOhw.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#3399cc]/10 transition-colors text-xs hp:text-[10px]"
                  >
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.ohwNum}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.nameOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.diameterOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.spanOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.saggingOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.weightOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.flOhwKg}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.flOhwN}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.AreaOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.cfOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.fixheightOhw}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50 text-[#0d3b66] text-xs hp:text-[10px]">
                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Wind Load
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Fix Angle
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Seismic Load
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Pw_Fix
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Pw_Straight
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Pw_Oblique
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Tension Fix
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Tension Straight
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Tension Oblique
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold hp:font-medium">
                      Vertical Angle
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 hp:text-[10px]">
                      (deg)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold hp:font-medium">
                    Cos Vertical Angle
                  </th>
                </tr>
              </thead>

              <tbody>
                {resultsOhw.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#3399cc]/10 transition-colors text-xs hp:text-[10px]"
                  >
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.wlOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.fixAngleOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.slOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.pwFixOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.pwStraightOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.pwObliqueOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.tensionFixOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.tensionStraightOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.tensionObliqueOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.verticalAngleOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center hp:px-3 hp:py-2">
                      {r.cosVerticalAngleOhw}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================== EMPTY STATE ===================== */}
      {results.length === 0 && (
        <div className="p-16 text-center">
          <FileSpreadsheet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">
            No calculation results yet. Please input pole data and click
            Calculate.
          </p>
        </div>
      )}
    </div>
  );
}

// SKEMA DATA: Dokumentasi tipe data dan satuan variabel teknik yang diperlukan untuk merender tabel hasil analisis struktur.
ResultsTable.propTypes = {
  // step pole
  results: PropTypes.arrayOf(
    PropTypes.shape({
      pole: PropTypes.string,
      description: PropTypes.string,
      poleType: PropTypes.string,
      diaUpper: PropTypes.number,
      diaLower: PropTypes.number,
      thickUpper: PropTypes.number,
      thickLower: PropTypes.number,
      length: PropTypes.number,
      heightPole: PropTypes.number,
      centerPoint: PropTypes.number,
      fb: PropTypes.number,
      stb: PropTypes.number,
      sts: PropTypes.number,
      stc: PropTypes.number,
      sectionArea: PropTypes.number,
      sectionModulus: PropTypes.number,
      momentInertia: PropTypes.number,
      radiusGyr: PropTypes.number,
      taperRatio: PropTypes.number,
      material: PropTypes.string,
      ip: PropTypes.number,
      heightSection: PropTypes.number,
      typeofTaper: PropTypes.string,
    }),
  ).isRequired,

  // direct object
  resultsDo: PropTypes.arrayOf(
    PropTypes.shape({
      doNum: PropTypes.string,
      nameDo: PropTypes.string,
      typeOfDo: PropTypes.string,
      frontAreaDo: PropTypes.number,
      sideAreaDo: PropTypes.number,
      weightDo: PropTypes.number,
      heightDo: PropTypes.number,
      nncDo: PropTypes.number,
      qtyDo: PropTypes.number,
      fixAngleDo: PropTypes.number,
      flDo: PropTypes.number,
      cfDo: PropTypes.number,
      wlafDo: PropTypes.number,
      wlasDo: PropTypes.number,
      slDo: PropTypes.number,
    }),
  ).isRequired,

  // overhead wire
  resultsOhw: PropTypes.arrayOf(
    PropTypes.shape({
      ohwNum: PropTypes.string,
      nameOhw: PropTypes.string,
      weightOhw: PropTypes.number,
      diameterOhw: PropTypes.number,
      fixheightOhw: PropTypes.number,
      spanOhw: PropTypes.number,
      saggingOhw: PropTypes.number,
      nncOhw: PropTypes.number,
      fixAngleOhw: PropTypes.number,
      verticalAngleOhw: PropTypes.number,
      flOhwKg: PropTypes.number,
      flOhwN: PropTypes.number,
      AreaOhw: PropTypes.number,
      cfOhw: PropTypes.number,
      wlOhw: PropTypes.number,
      slOhw: PropTypes.number,
      pwFixOhw: PropTypes.number,
      pwStraightOhw: PropTypes.number,
      pwObliqueOhw: PropTypes.number,
      tensionFixOhw: PropTypes.number,
      tensionStraightOhw: PropTypes.number,
      tensionObliqueOhw: PropTypes.number,
      cosVerticalAngleOhw: PropTypes.number,
    }),
  ).isRequired,
};
