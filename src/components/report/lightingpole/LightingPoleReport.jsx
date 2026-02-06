import React from "react";
import { useRef, useMemo } from "react";
import { createBlocks } from "./LightingPoleBlock";
import { useA4Pagination } from "../hooks/useReportPagination";
import LightingPolePages from "./LightingPolePages";
import "../../../styles/page.css";

export default function LightingPoleReport({
  cover,
  condition,
  structuralDesign,
  results,
  resultsDo,
}) {
  const blocks = useMemo(
    () => createBlocks(results, resultsDo, structuralDesign),
    [results, resultsDo, structuralDesign],
  ); // Memoize blocks so they are created only once
  const measureRef = useRef(null); // Ref to hidden div for measuring block heights

  // Get paginated pages based on lighting pole pages height
  const pages = useA4Pagination({
    blocks,
    measureRef,
  });

  return (
    <>
      {/* Render actual lighting pole pages pages using paginated data */}
      <LightingPolePages
        cover={cover}
        condition={condition}
        results={results}
        pages={pages}
      />

      {/* Reference to this hidden container for measuring each block's height */}
      <div
        ref={measureRef}
        style={{
          position: "fixed",
          top: "-10000px",
          left: 0,
          visibility: "hidden",
          width: "210mm",
        }}
      >
        {/* Hidden measurement container off-screen to calculate block heights */}
        {blocks.map((b) => (
          <div key={b.id} data-id={b.id} className="measure-block">
            {b.node} {/* Render each block for height measurement */}
          </div>
        ))}
      </div>
    </>
  );
}
