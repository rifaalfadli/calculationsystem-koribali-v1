// ====================================================
// Global Helpers
// ====================================================
// FUNCTION: check if a value is empty
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  return value.toString().trim() === "";
};

// FUNCTION: helper to clear errors per field
export const clearError = (updates, setErrors) => {
  setErrors((prev) => {
    const next = { ...prev };

    Object.entries(updates).forEach(([key, value]) => {
      // kalau sudah ada isi, error = false
      if (value && value.toString().trim() !== "") {
        next[key] = false;
      }
    });

    return next;
  });
};

// ====================================================
// Function for Cover Input
// ====================================================
// FUNCTION: Check if cover information from is complete
export const isCoverComplete = (cover) => {
  return [
    cover.managementMark,
    cover.calculationNumber,
    cover.projectName,
    cover.date,
  ].every((v) => v && v.trim() !== "");
};

// FUNCTION: Create an error checker helper for the cover
export const getCoverErrors = (cover) => ({
  managementMark: isEmpty(cover.managementMark),
  calculationNumber: isEmpty(cover.calculationNumber),
  projectName: isEmpty(cover.projectName),
  date: isEmpty(cover.date),
});

// ====================================================
// Function for Condition Input
// ====================================================
// FUNCTION: Check if condition information form is complete
export const isConditionComplete = (condition) => {
  return [
    condition.designStandard,
    condition.windSpeed,
    condition.projectType,
  ].every((v) => v && v.trim() !== "");
};

// FUNCTION: Create an error checker helper for the condition
export const getConditionErrors = (condition) => ({
  designStandard: isEmpty(condition.designStandard),
  windSpeed: isEmpty(condition.windSpeed),
  projectType: isEmpty(condition.projectType),
});

// ====================================================
// Function for Structural Design Pole Input
// ====================================================
// FUNCTION: Check if Structural Design Pole information form is complete
export const structuralDesignComplete = (structuralDesign) => {
  return [structuralDesign.lowestStep, structuralDesign.overDesign].every(
    (v) => v && v.trim() !== "",
  );
};

// FUNCTION: Create an error checker helper for the Structural Design Pole
export const getStructuralDesignErrors = (structuralDesign) => ({
  lowestStep: isEmpty(structuralDesign.lowestStep),
  overDesign: isEmpty(structuralDesign.overDesign),
});

// ====================================================
// Function for Pole Input
// ====================================================
// FUNCTION: Check if a section/step pole is complete
export const isSectionComplete = (section) => {
  if (
    section.name.trim() === "" ||
    section.height.trim() === "" ||
    section.quantity.trim() === ""
  ) {
    return false; // fallback
  }
  if (section.poleType === "Taper") {
    // Taper: all lower + upper fields required
    return (
      section.diameterLower.trim() !== "" &&
      section.diameterUpper.trim() !== "" &&
      section.thicknessLower.trim() !== "" &&
      section.thicknessUpper.trim() !== ""
    );
  } else if (section.poleType === "Straight") {
    // Straight: only lower required
    return (
      section.diameterLower.trim() !== "" &&
      section.thicknessLower.trim() !== ""
    );
  }
  return false; // fallback
};

// FUNCTION: Create an error checker helper for the section/step
export const getSectionsErrors = (sections) => {
  const allErrors = {};

  sections.forEach((section) => {
    const e = {
      name: isEmpty(section.name),
      height: isEmpty(section.height),
      quantity: isEmpty(section.quantity),
      diameterLower: false,
      diameterUpper: false,
      thicknessLower: false,
      thicknessUpper: false,
    };

    if (section.poleType === "Taper") {
      e.diameterLower = isEmpty(section.diameterLower);
      e.diameterUpper = isEmpty(section.diameterUpper);
      e.thicknessLower = isEmpty(section.thicknessLower);
      e.thicknessUpper = isEmpty(section.thicknessUpper);
    } else {
      e.diameterLower = isEmpty(section.diameterLower);
      e.thicknessLower = isEmpty(section.thicknessLower);
    }

    if (Object.values(e).some(Boolean)) {
      allErrors[section.id] = e;
    }
  });

  return allErrors;
};

// FUNCTION: clear error for a specific section
export const clearSectionError = (sectionId, updates, setSectionsErrors) => {
  setSectionsErrors((prev) => {
    const next = { ...prev };
    const sectionError = { ...(next[sectionId] || {}) };

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.toString().trim() !== "") {
        sectionError[key] = false;
      }
    });

    // kalau semua error false, hapus object error section/step
    const hasError = Object.values(sectionError).some(Boolean);
    if (hasError) {
      next[sectionId] = sectionError;
    } else {
      delete next[sectionId];
    }

    return next;
  });
};

// ====================================================
// Function for Direct Object Input
// ====================================================
// FUNCTION: Check if a direct object is complete
export const isDoComplete = (directObject) => {
  // field wajib untuk all type
  const baseComplete =
    directObject.nameDo.trim() !== "" &&
    directObject.frontAreaDo.trim() !== "" &&
    directObject.weightDo.trim() !== "" &&
    directObject.heightDo.trim() !== "" &&
    directObject.nncDo.trim() !== "" &&
    directObject.qtyDo.trim() !== "";

  if (!baseComplete) return false;

  // tambahan khusus directional
  if (directObject.typeOfDo === "directional") {
    return (
      directObject.sideAreaDo.trim() !== "" &&
      directObject.fixAngleDo.trim() !== ""
    );
  }

  return true;
};

// FUNCTION: Create an error checker helper for the direct object
export const getDoErrors = (directObjects) => {
  const allErrors = {};

  directObjects.forEach((directObject) => {
    const e = {
      nameDo: isEmpty(directObject.nameDo),
      frontAreaDo: isEmpty(directObject.frontAreaDo),
      weightDo: isEmpty(directObject.weightDo),
      heightDo: isEmpty(directObject.heightDo),
      nncDo: isEmpty(directObject.nncDo),
      qtyDo: isEmpty(directObject.qtyDo),
      sideAreaDo: false,
      fixAngleDo: false,
    };

    if (directObject.typeOfDo === "directional") {
      e.sideAreaDo = isEmpty(directObject.sideAreaDo);
      e.fixAngleDo = isEmpty(directObject.fixAngleDo);
    }

    if (Object.values(e).some(Boolean)) {
      allErrors[directObject.idDo] = e;
    }
  });

  return allErrors;
};

// FUNCTION: clear error for a specific direct object
export const clearDoError = (idDo, updates, setDoErrors) => {
  setDoErrors((prev) => {
    const next = { ...prev };
    const doError = { ...(next[idDo] || {}) };

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.toString().trim() !== "") {
        doError[key] = false;
      }
    });

    // kalau semua error false => hapus object error DO
    const hasError = Object.values(doError).some(Boolean);
    if (hasError) {
      next[idDo] = doError;
    } else {
      delete next[idDo];
    }

    return next;
  });
};

// ====================================================
// Function for Overhead Wire Input
// ====================================================
// FUNCTION: Check if a overhead wire is complete
export const isOhwComplete = (overheadWire) => {
  // field wajib untuk all type
  const baseComplete =
    overheadWire.nameOhw.trim() !== "" &&
    overheadWire.weightOhw.trim() !== "" &&
    overheadWire.diameterOhw.trim() !== "" &&
    overheadWire.fixheightOhw.trim() !== "" &&
    overheadWire.spanOhw.trim() !== "" &&
    overheadWire.saggingOhw.trim() !== "" &&
    overheadWire.nncOhw.trim() !== "" &&
    overheadWire.fixAngleOhw.trim() !== "" &&
    overheadWire.verticalAngleOhw.trim() !== "";

  if (!baseComplete) return false;

  return true;
};

// FUNCTION: Create an error checker helper for the overhead wire
export const getOhwErrors = (overheadWires) => {
  const allErrors = {};

  overheadWires.forEach((overheadWire) => {
    const e = {
      nameOhw: isEmpty(overheadWire.nameOhw),
      weightOhw: isEmpty(overheadWire.weightOhw),
      diameterOhw: isEmpty(overheadWire.diameterOhw),
      fixheightOhw: isEmpty(overheadWire.fixheightOhw),
      spanOhw: isEmpty(overheadWire.spanOhw),
      saggingOhw: isEmpty(overheadWire.saggingOhw),
      nncOhw: isEmpty(overheadWire.nncOhw),
      fixAngleOhw: isEmpty(overheadWire.fixAngleOhw),
      verticalAngleOhw: isEmpty(overheadWire.verticalAngleOhw),
    };

    if (Object.values(e).some(Boolean)) {
      allErrors[overheadWire.idOhw] = e;
    }
  });

  return allErrors;
};

// FUNCTION: clear error for a specific overhead wire
export const clearOhwError = (idOhw, updates, setOhwErrors) => {
  setOhwErrors((prev) => {
    const next = { ...prev };
    const ohwError = { ...(next[idOhw] || {}) };

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.toString().trim() !== "") {
        ohwError[key] = false;
      }
    });

    // kalau semua error false => hapus wire error OHW
    const hasError = Object.values(ohwError).some(Boolean);
    if (hasError) {
      next[idOhw] = ohwError;
    } else {
      delete next[idOhw];
    }

    return next;
  });
};
