// import React from "react";
// import { useRef, useMemo } from "react";
// import { createBlocks } from "./LightingPoleBlock";
// import { useA4Pagination } from "../hooks/useReportPagination";
// import LightingPolePages from "./LightingPolePages";
// import "../../../styles/page.css";

// export default function LightingPoleReport({
//   cover,
//   condition,
//   structuralDesign,
//   results,
//   resultsDo,
// }) {
//   const blocks = useMemo(
//     () => createBlocks(results, resultsDo, structuralDesign),
//     [results, resultsDo, structuralDesign],
//   ); // Memoize blocks so they are created only once
//   const measureRef = useRef(null); // Ref to hidden div for measuring block heights

//   // Get paginated pages based on lighting pole pages height
//   const pages = useA4Pagination({
//     blocks,
//     measureRef,
//   });

//   return (
//     <>
//       {/* Render actual lighting pole pages pages using paginated data */}
//       <LightingPolePages
//         cover={cover}
//         condition={condition}
//         results={results}
//         pages={pages}
//       />

//       {/* Reference to this hidden container for measuring each block's height */}
//       <div ref={measureRef} className="measure-container">
//         {/* Hidden measurement container off-screen to calculate block heights */}
//         {blocks.map((b) => (
//           <div key={b.id} data-id={b.id} className="measure-block">
//             {b.node} {/* Render each block for height measurement */}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
import React, { useRef, useMemo, useState, useLayoutEffect } from "react";
import { createBlocks } from "./LightingPoleBlock";
import { paginateA4 } from "../hooks/useReportPagination";
import LightingPolePages from "./LightingPolePages";
import "../../../styles/page.css";

export default function LightingPoleReport({
  cover,
  condition,
  structuralDesign,
  results,
  resultsDo,
}) {
  // 1️⃣ blocks tetap memo (INI SUDAH BENAR)
  const blocks = useMemo(
    () => createBlocks(results, resultsDo, structuralDesign),
    [results, resultsDo, structuralDesign],
  );

  // 2️⃣ ref untuk measurement
  const measureRef = useRef(null);

  // 3️⃣ pages = null dulu (belum render final)
  const [pages, setPages] = useState(null);

  // 4️⃣ HITUNG PAGINATION SEKALI, SEBELUM PAINT
  useLayoutEffect(() => {
    if (!measureRef.current) return;

    const paginatedPages = paginateA4({
      blocks,
      measureRef,
    });

    setPages(paginatedPages);
  }, [blocks]);

  // 5️⃣ FASE 1 — measurement ONLY (user TIDAK LIHAT)
  if (!pages) {
    return (
      <div ref={measureRef} className="measure-container">
        {blocks.map((b) => (
          <div key={b.id} data-id={b.id} className="measure-block">
            {b.node}
          </div>
        ))}
      </div>
    );
  }

  // 6️⃣ FASE 2 — FINAL RENDER (HANYA SEKALI)
  return (
    <LightingPolePages
      cover={cover}
      condition={condition}
      results={results}
      pages={pages}
    />
  );
}
