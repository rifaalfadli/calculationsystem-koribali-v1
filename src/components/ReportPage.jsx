import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LightingPoleReport from "./report/lightingpole/LightingPoleReport";
import AcemastReport from "./report/acemast/AcemastReport";
import {
  ArrowLeft,
  Download,
  Trash2,
  FileText,
  AlertCircle,
  Calculator,
} from "lucide-react";

export function ReportPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data cover, condition, results, sections dari state router
  // Jika tidak ada, fallback ke array kosong untuk mencegah error
  const reportData = location.state || {
    results: JSON.parse(sessionStorage.getItem("results") || "[]"),
    resultsDo: JSON.parse(sessionStorage.getItem("resultsDo") || "[]"),
    resultsOhw: JSON.parse(sessionStorage.getItem("resultsOhw") || "[]"),
    cover: JSON.parse(sessionStorage.getItem("cover") || "{}"),
    condition: JSON.parse(sessionStorage.getItem("condition") || "{}"),
    structuralDesign: JSON.parse(
      sessionStorage.getItem("structuralDesign") || "{}",
    ),
  };

  const { results, resultsDo, resultsOhw, cover, condition, structuralDesign } =
    reportData;

  // Tombol kembali ke calculation page
  const onBack = () => navigate("/calculation");

  // State pop-up delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // Flag apakah report masih ada atau sudah dihapus
  const [hasReport, setHasReport] = useState(true);

  // Fungsi print + rename file PDF via dokumen.title (workaround umum)
  const handlePrint = () => {
    const oldTitle = document.title;
    document.title = cover.calculationNumber; // rename filename
    window.print(); // buka dialog print
    document.title = oldTitle; // kembalikan title setelah print
  };

  // Hapus report: reset flag & tutup modal
  const handleDelete = () => {
    setHasReport(false);
    setShowDeleteConfirm(false);

    navigate("/calculation", { state: { deleteReport: true } });
  };

  // Render report component based on selected project type
  const renderReport = () => {
    switch (condition?.projectType) {
      case "lightingPole":
        return (
          <div id="report-a4">
            <LightingPoleReport
              cover={cover}
              condition={condition}
              structuralDesign={structuralDesign}
              results={results}
              resultsDo={resultsDo}
            />
          </div>
        );
      case "acemast":
        return (
          <div id="report-a4">
            <AcemastReport
              cover={cover}
              condition={condition}
              structuralDesign={structuralDesign}
              results={results}
              resultsDo={resultsDo}
              resultsOhw={resultsOhw}
            />
          </div>
        );
      default:
        return <div />;
    }
  };

  // Empty State - No Report
  if (!hasReport || results.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-250">
        {/* Empty State Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6">
          <div className="max-w-2xl w-full">
            <div
              className="
                bg-white border border-gray-200 shadow-xl text-center
                rounded-2xl sm:rounded-3xl
                p-6 sm:p-12
              "
            >
              {/* Icon */}
              <div
                className="
                  mx-auto mb-4 sm:mb-6
                  flex items-center justify-center
                  w-14 h-14 sm:w-24 sm:h-24
                  rounded-xl sm:rounded-3xl
                  bg-gradient-to-br from-[#0d3b66] to-[#3399cc]
                  shadow-lg
                "
              >
                <FileText className="w-7 h-7 sm:w-12 sm:h-12 text-white" />
              </div>

              {/* Title */}
              <h1
                className="
                  text-[#0d3b66] font-semibold
                  text-base sm:text-xl
                  mb-1 sm:mb-3
                "
              >
                No Report Available
              </h1>

              <p
                className="
                  text-gray-600
                  text-xs sm:text-base
                  mb-6 sm:mb-8
                  max-w-md mx-auto
                "
              >
                You haven't generated any calculation report yet. Start by
                creating pole sections and running calculations to generate your
                first report.
              </p>

              {/* Steps */}
              <div
                className="
                  bg-gradient-to-br from-gray-50 to-white
                  border border-gray-200
                  rounded-xl sm:rounded-2xl
                  p-4 sm:p-6
                  mb-6 sm:mb-8
                "
              >
                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Input All Form",
                      desc: "Add and configure with specifications",
                    },
                    {
                      title: "Calculate Results",
                      desc: "Click calculate to process structural analysis",
                    },
                    {
                      title: "Generate Report",
                      desc: "View and export comprehensive calculation report",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-left">
                      <div
                        className="
                          flex-shrink-0
                          w-7 h-7 sm:w-8 sm:h-8
                          bg-[#3399cc] text-white
                          rounded-md sm:rounded-lg
                          flex items-center justify-center
                          text-xs sm:text-sm
                          shadow-sm
                        "
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm sm:text-base text-[#0d3b66] font-medium">
                          {item.title}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={onBack}
                className="
                  w-full sm:w-auto
                  inline-flex items-center justify-center
                  gap-2 sm:gap-3
                  px-6 sm:px-8 py-3 sm:py-4
                  text-sm sm:text-base
                  bg-gradient-to-r from-[#0d3b66] to-[#3399cc]
                  text-white rounded-xl
                  shadow-lg hover:shadow-xl transition-all
                "
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                Go to Calculator
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar - Hidden on Print */}
      <div className="bg-white print:hidden sticky top-[64px] z-30 shadow-sm border-b border-[#0d3b66]">
        <div className="mx-auto px-6 py-4 hp:px-4 hp:py-2.5">
          <div className="flex items-center justify-between">
            {/* LEFT - BACK */}
            <button
              onClick={onBack}
              className="
                flex items-center gap-2
                px-5 py-2.5 text-sm
                bg-white text-[#0d3b66]
                border border-[#0d3b66]
                rounded-lg
                hover:bg-blue-50 transition-colors

                hp:px-3
                hp:py-2
              "
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hp:hidden">Back to Calculator</span>
            </button>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3 hp:gap-2">
              {/* DELETE */}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="
                  flex items-center gap-2
                  px-5 py-2.5 text-sm
                  bg-white text-red-600
                  border border-red-300
                  rounded-lg
                  hover:bg-red-50 transition-colors

                  hp:px-3
                  hp:py-2
                "
                title="Delete Report"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hp:hidden">Delete Report</span>
              </button>

              {/* EXPORT */}
              <button
                onClick={handlePrint}
                className="
                  flex items-center gap-2
                  px-5 py-2.5 text-sm
                  bg-gradient-to-r from-[#0d3b66] to-[#3399cc]
                  text-white
                  rounded-lg
                  hover:brightness-110 transition-all shadow-sm

                  hp:px-3
                  hp:py-2
                "
                title="Export PDF"
              >
                <Download className="w-4 h-4" />
                <span className="hp:hidden">Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div
            className="
              w-full max-w-xs
              bg-white border border-gray-200
              rounded-xl shadow-xl
              p-4
              sm:max-w-md sm:p-8 sm:rounded-2xl
            "
          >
            {/* Icon */}
            <div
              className="
                mx-auto mb-3
                flex items-center justify-center
                w-10 h-10 sm:w-16 sm:h-16
                bg-red-100 rounded-full
              "
            >
              <AlertCircle className="w-5 h-5 sm:w-8 sm:h-8 text-red-500" />
            </div>
            {/* Title */}
            <h2
              className="
                text-center font-bold
                text-sm sm:text-base
                text-gray-900
                mb-1 sm:mb-2
              "
            >
              Delete Report?
            </h2>

            {/* Description */}
            <p
              className="
                text-center text-gray-600
                text-xs sm:text-sm
                mb-4 sm:mb-6
                leading-relaxed
              "
            >
              This will delete all inputs and results. This action cannot be
              undone. Continue?
            </p>

            {/* Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="
                  flex-1
                  py-2 sm:py-3 font-bold
                  text-xs sm:text-sm
                  bg-slate-100 text-slate-600
                  rounded-md sm:rounded-lg
                  hover:bg-slate-200 transition
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="
                  flex-1
                  py-2 sm:py-3 font-bold
                  text-xs sm:text-sm
                  bg-red-500 text-white
                  rounded-md sm:rounded-lg
                  hover:bg-red-600 transition
                "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Content */}
      {/* <div className="max-w-7xl mx-auto px-6 py-8">
        <div id="report-a4">
          <LightingPoleReport
            cover={cover}
            condition={condition}
            structuralDesign={structuralDesign}
            results={results}
            resultsDo={resultsDo}
          />
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-6 py-8 hp:mx-0 hp:px-0 hp:flex hp:justify-center hp:max-w-[100vh] hp:overflow-hidden">
        {renderReport()}
      </div>
    </div>
  );
}
