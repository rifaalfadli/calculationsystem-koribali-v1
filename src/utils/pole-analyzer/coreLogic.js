import {
  calculatePoleResults,
  structuralDesignResults,
  calculateDoResults,
  calculateOhwResults,
} from "./calculationResults";

// ===============================================================================
// FUNCTION: Perform calculation for all form
// ===============================================================================
export const handleCalculateResults = (
  handleIsConditionComplete,
  showToast,
  structuralDesign,
  structuralDesignComplete,
  sections,
  handleIsSectionComplete,
  directObjects,
  handleIsDoComplete,
  overheadWires,
  handleIsOhwComplete,
  setResults,
  setResultStructuralDesign,
  setResultsDo,
  setResultsOhw,
  setShowResults,
) => {
  const errors = {
    structuralDesign: false,
    condition: false,
    section: false,
    directObject: false,
    overheadWire: false,
  };

  // VALIDATION: condition information
  if (!handleIsConditionComplete()) {
    showToast("Please complete all Standard and Condition fields.");
    errors.condition = true;
  }

  // VALIDATION: structural design information
  if (!structuralDesignComplete()) {
    showToast("Please complete all Pole Specification fields.");
    errors.structuralDesign = true;
  }

  // VALIDATION: each section/step pole
  for (let section of sections) {
    if (!handleIsSectionComplete(section)) {
      showToast("Please complete all Pole Specification fields.");
      errors.section = true;
      break;
    }
  }

  // VALIDATION: each direct object
  for (let directObject of directObjects) {
    if (!handleIsDoComplete(directObject)) {
      showToast("Please complete all Direct Object fields.");
      errors.directObject = true;
      break;
    }
  }

  // VALIDATION: each overhead wire
  for (let overheadWire of overheadWires) {
    if (!handleIsOhwComplete(overheadWire)) {
      showToast("Please complete all Overhead Wire fields.");
      errors.overheadWire = true;
      break;
    }
  }

  const isValid = Object.values(errors).every((v) => v === false);

  // STOP kalau tidak valid
  if (!isValid) {
    return { isValid, errors };
  }

  // FUNCTION: Calculate results for all pole sections
  const calculatedResults = calculatePoleResults(sections);
  const calculatedResultsDo = calculateDoResults(directObjects);
  const calculatedStructuralDesign = structuralDesignResults(structuralDesign);
  const calculatedResultsOhw = calculateOhwResults(overheadWires);

  setResults(calculatedResults);
  setResultStructuralDesign(calculatedStructuralDesign);
  setResultsDo(calculatedResultsDo);
  setResultsOhw(calculatedResultsOhw);
  setShowResults(true);

  // ALL CHECK PASSED
  return { isValid, errors };
};

// ===============================================================================
// FUNCTION: Validate all inputs before generating the final report
// ===============================================================================
export const makeReport = (
  results,
  showToast,
  handleIsCoverComplete,
  handleIsConditionComplete,
  structuralDesignComplete,
  sections,
  handleIsSectionComplete,
  directObjects,
  handleIsDoComplete,
  overheadWires,
  handleIsOhwComplete,
) => {
  const errors = {
    results: false,
    cover: false,
    condition: false,
    structuralDesign: false,
    section: false,
    directObject: false,
    overheadWire: false,
  };

  // CHECK 1: Results
  if (results.length === 0) {
    showToast("No calculation results pole available.");
    errors.results = true;
  }

  // CHECK 3: Cover
  if (!handleIsCoverComplete()) {
    showToast("Please complete the Cover Information first.");
    errors.cover = true;
  }

  // CHECK 4: Condition
  if (!handleIsConditionComplete()) {
    showToast("Please complete all Standard and Condition information first.");
    errors.condition = true;
  }

  // CHECK 5: Structural Design
  if (!structuralDesignComplete()) {
    showToast("Please complete all Pole Specification first.");
    errors.structuralDesign = true;
  }

  // CHECK 6: Sections/Steps
  for (let section of sections) {
    if (!handleIsSectionComplete(section)) {
      showToast("Please complete all Pole Specification first.");
      errors.section = true;
      break;
    }
  }

  // CHECK 7: Direct Object
  for (let directObject of directObjects) {
    if (!handleIsDoComplete(directObject)) {
      showToast("Please complete all Direct Object first.");
      errors.directObject = true;
      break;
    }
  }

  // CHECK 8: Overhead Wire
  for (let overheadWire of overheadWires) {
    if (!handleIsOhwComplete(overheadWire)) {
      showToast("Please complete all Overhead Wire first.");
      errors.overheadWire = true;
      break;
    }
  }

  const isValid = Object.values(errors).every((v) => v === false);

  return { isValid, errors };
};

// ===============================================================================
// FUNCTIONS: Completely reset all calculation data, UI states, and storage
// ===============================================================================
export const deleteReport = (
  setResults,
  setResultsDo,
  setResultsOhw,
  setResultStructuralDesign,
  setShowResults,
  setCover,
  setCondition,
  setStructuralDesign,
  setSections,
  setDirectObjects,
  setOverheadWires,
  setActiveTab,
  setIsExpandedCondition,
  setIsExpandedPole,
  sectionIdRef,
  doIdRef,
  ohwIdRef,
  setIsExpandedDo,
  setIsExpandedOhw,
) => {
  // Hapus hasil kalkulasi
  setResults([]);
  setResultsDo([]);
  setResultsOhw([]);
  setResultStructuralDesign([]);
  setShowResults(false);

  // Reset Cover
  setCover({
    managementMark: "",
    calculationNumber: "",
    projectName: "",
    contentr2: "",
    contentr3: "",
    date: "",
  });

  // Reset Condition
  setCondition({
    designStandard: "",
    windSpeed: "",
    projectType: "",
  });

  // Reset Structural Design
  setStructuralDesign({
    lowestStep: "",
    overDesign: "",
  });

  // Reset Sections (1 section default)
  setSections([
    {
      id: "1",
      name: "",
      material: "STK400",
      poleType: "Straight",
      diameterLower: "",
      diameterUpper: "",
      thicknessLower: "",
      thicknessUpper: "",
      height: "",
      quantity: "1",
    },
  ]);

  // Reset Direct Objects
  setDirectObjects([]);
  doIdRef.current = 0;

  // Reset Overhead Wire
  setOverheadWires([]);
  ohwIdRef.current = 0;

  // Reset active tab ke section 1
  setActiveTab("1");
  sectionIdRef.current = 1;

  // Reset UI control
  setIsExpandedCondition(true);
  setIsExpandedPole(true);
  setIsExpandedDo(false);
  setIsExpandedOhw(false);

  // Hapus semua sessionStorage
  // sessionStorage.clear();
  sessionStorage.removeItem("cover");
  sessionStorage.removeItem("condition");
  sessionStorage.removeItem("structuralDesign");
  sessionStorage.removeItem("sections");
  sessionStorage.removeItem("directObjects");
  sessionStorage.removeItem("overheadWires");
  sessionStorage.removeItem("results");
  sessionStorage.removeItem("resultsDo");
  sessionStorage.removeItem("resultsOhw");
};
