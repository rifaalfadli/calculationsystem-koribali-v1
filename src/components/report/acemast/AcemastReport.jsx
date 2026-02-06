import React from "react";
import AcemastPages from "./AcemastPages";
import "../../../styles/page.css";

export default function AcemastReport({
  cover,
  condition,
  structuralDesign,
  results,
  resultsDo,
  resultsOhw,
}) {
  return (
    <>
      {/* Render actual A4 pages using paginated data */}
      <AcemastPages
        cover={cover}
        condition={condition}
        results={results}
        resultsOhw={resultsOhw}
        resultsDo={resultsDo}
        structuralDesign={structuralDesign}
      />
    </>
  );
}
