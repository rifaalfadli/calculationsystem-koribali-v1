// import { useEffect, useState } from "react";
import { mmToPx } from "../../../utils/report-handlers/unitConventer";

// export function useA4Pagination({ blocks, measureRef }) {
//   const [pages, setPages] = useState([]); // State storing paginated pages

//   useEffect(() => {
//     if (!measureRef.current) return; // Exit if measurement ref is not ready

//     const paginate = () => {
//       const children = Array.from(measureRef.current.children); // Get all hidden DOM blocks
//       const blockMap = new Map(blocks.map((b) => [b.id, b])); // Build map sekali (O(1) lookup)
//       const pagesTemp = []; // Temporary storage for pages

//       let currentPage = []; // Current page buffer
//       let currentHeight = 0; // Accumulated height of current page

//       const PAGE_HEIGHT = mmToPx(297); // A4 page height in px
//       const PADDING_TOP = mmToPx(15); // Top padding
//       const PADDING_BOTTOM = mmToPx(15); // Bottom padding
//       const HEADER_HEIGHT = mmToPx(10); // Header height

//       const pageLimit =
//         PAGE_HEIGHT - PADDING_TOP - PADDING_BOTTOM - HEADER_HEIGHT; // Max content height per page

//       children.forEach((child) => {
//         const h = child.offsetHeight; // Measured block height
//         const id = child.dataset.id; // Block ID to find React node
//         // Match DOM to React block
//         const block = blockMap.get(id);
//         if (!block) return;

//         if (currentHeight + h > pageLimit) {
//           // Check if block exceeds page
//           pagesTemp.push([...currentPage]); // Push current page
//           currentPage = []; // Reset page buffer
//           currentHeight = 0; // Reset height
//         }

//         currentPage.push(block.node); // Add block to current page
//         currentHeight += h; // Accumulate height
//       });

//       if (currentPage.length) pagesTemp.push(currentPage); // Push last page if exists
//       setPages(pagesTemp); // Save paginated pages to state
//     };

//     // run setelah layout paint
//     requestAnimationFrame(paginate);
//   }, [blocks, measureRef]);

//   return pages; // Return paginated pages
// }
export function paginateA4({ blocks, measureRef }) {
  if (!measureRef.current) return [];

  const children = Array.from(measureRef.current.children);
  const blockMap = new Map(blocks.map((b) => [b.id, b]));

  const PAGE_HEIGHT = mmToPx(297);
  const pageLimit = PAGE_HEIGHT - mmToPx(15) - mmToPx(15) - mmToPx(10);

  const pages = [];
  let currentPage = [];
  let currentHeight = 0;

  children.forEach((child) => {
    const h = child.offsetHeight;
    const block = blockMap.get(child.dataset.id);
    if (!block) return;

    if (currentHeight + h > pageLimit) {
      pages.push(currentPage);
      currentPage = [];
      currentHeight = 0;
    }

    currentPage.push(block.node);
    currentHeight += h;
  });

  if (currentPage.length) pages.push(currentPage);
  return pages;
}
