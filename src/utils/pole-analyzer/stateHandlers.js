// ====================================================
// Function for Cover Input
// ====================================================
// FUNCTION: Update cover data
export const updateCover = (cover, updates, setCover) => {
  setCover({ ...cover, ...updates });
};

// ====================================================
// Function for Condition Input
// ====================================================
// FUNCTION: Update condition data
export const updateCondition = (condition, updates, setCondition) => {
  setCondition({ ...condition, ...updates });
};

// ====================================================
// Function for Structural Design Pole Input
// ====================================================
// FUNCTION: Update structural design data
export const updateStructuralDesign = (
  structuralDesign,
  updates,
  setStructuralDesign,
) => {
  setStructuralDesign({ ...structuralDesign, ...updates });
};

// ====================================================
// Function for Pole Input
// ====================================================
// FUNCTION: Add a new step (max 6 step)
export const addSection = (
  sections,
  setSections,
  setActiveTab,
  sectionIdRef,
) => {
  if (sections.length >= 6) return;

  sectionIdRef.current += 1;
  const newId = sectionIdRef.current.toString();

  setSections([
    ...sections,
    {
      id: newId,
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

  setActiveTab(newId); // set newly added section as active
};

// FUNCTION: Remove a section by ID
export const removeSection = (
  id,
  sections,
  setSections,
  activeTab,
  setActiveTab,
) => {
  if (sections.length <= 1) return;

  const index = sections.findIndex((s) => s.id === id);
  const newSections = sections.filter((s) => s.id !== id);

  setSections(newSections);

  if (activeTab === id) {
    let newIndex;

    if (index > 0) {
      // ambil section sebelumnya
      newIndex = index - 1;
    } else {
      // kalau hapus index 0, ambil yang sekarang di 0
      newIndex = 0;
    }

    setActiveTab(newSections[newIndex].id);
  }
};

// FUNCTION: Update a specific section's data
export const updateSection = (id, updates, setSections, sections) => {
  setSections(sections.map((s) => (s.id === id ? { ...s, ...updates } : s)));
};

// FUNCTION: Reset the active section to default values
export const resetCurrent = (setSections, sections, activeTab) => {
  setSections(
    sections.map((s) =>
      s.id === activeTab
        ? {
            ...s,
            name: "",
            diameterLower: "",
            diameterUpper: "",
            thicknessUpper: "",
            thicknessLower: "",
            height: "",
            quantity: "1",
          }
        : s,
    ),
  );
};

// ====================================================
// Function for Direct Object Input
// ====================================================
// FUNCTION: Add a new direct object (max 25 object) By Input
export const syncDoByInput = (
  inputValue,
  directObjects,
  setDirectObjects,
  doIdRef,
  onConfirmReduce, // callback untuk modal konfirmasi
) => {
  const targetCount = Number(inputValue);

  if (!targetCount || targetCount < 0) return;

  const safeTarget = Math.min(targetCount, 25);
  const currentCount = directObjects.length;

  // case 1: imput jumlah yang sama
  if (safeTarget === currentCount) return;

  // case 2: tambah object
  if (safeTarget > currentCount) {
    const addCount = safeTarget - currentCount;

    const newItems = [];
    for (let i = 0; i < addCount; i++) {
      doIdRef.current += 1;
      newItems.push({
        idDo: doIdRef.current.toString(),
        nameDo: "",
        typeOfDo: "omni",
        frontAreaDo: "",
        sideAreaDo: "",
        weightDo: "",
        heightDo: "",
        nncDo: "",
        qtyDo: "1",
        fixAngleDo: "",
      });
    }

    setDirectObjects([...directObjects, ...newItems]);
    return;
  }

  // case 3: kurangi object
  if (safeTarget < currentCount) {
    onConfirmReduce({
      from: currentCount,
      to: safeTarget,
    });
  }
};

// FUNCTION: Add a new direct object (max 25 object) By Click
export const addDo = (directObjects, setDirectObjects, doIdRef) => {
  if (directObjects.length >= 25) return;

  doIdRef.current += 1;
  const newIdDo = doIdRef.current.toString();

  setDirectObjects([
    ...directObjects,
    {
      idDo: newIdDo,
      nameDo: "",
      typeOfDo: "omni",
      frontAreaDo: "",
      sideAreaDo: "",
      weightDo: "",
      heightDo: "",
      nncDo: "",
      qtyDo: "1",
      fixAngleDo: "",
    },
  ]);
};

// FUNCTION: Copy Direct Object data to clipboard
export const copyDo = (directObject, setDoClipboard) => {
  setDoClipboard({
    nameDo: directObject.nameDo,
    typeOfDo: directObject.typeOfDo,
    frontAreaDo: directObject.frontAreaDo,
    sideAreaDo: directObject.sideAreaDo,
    weightDo: directObject.weightDo,
    heightDo: directObject.heightDo,
    nncDo: directObject.nncDo,
    qtyDo: directObject.qtyDo,
    fixAngleDo: directObject.fixAngleDo,
  });
};

// FUNCTION: Paste clipboard data into a specific Direct Object
export const pasteDo = (idDo, setDirectObjects, doClipboard) => {
  if (!doClipboard) return;

  setDirectObjects((prev) =>
    prev.map((doItem) =>
      doItem.idDo === idDo ? { ...doItem, ...doClipboard } : doItem,
    ),
  );
};

// FUNCTION: Remove a direct object by ID
export const removeDo = (idDo, directObjects, setDirectObjects) => {
  setDirectObjects(directObjects.filter((s) => s.idDo !== idDo));
};

// FUNCTION: Update a specific object's data
export const updateDo = (idDo, updates, setDirectObjects, directObjects) => {
  setDirectObjects(
    directObjects.map((s) => (s.idDo === idDo ? { ...s, ...updates } : s)),
  );
};

// FUNCTION: Reset the active direct object to default values
export const resetCurrentDo = (setDirectObjects, directObjects, idDo) => {
  setDirectObjects(
    directObjects.map((s) =>
      s.idDo === idDo
        ? {
            ...s,
            nameDo: "",
            frontAreaDo: "",
            sideAreaDo: "",
            weightDo: "",
            heightDo: "",
            nncDo: "",
            qtyDo: "1",
            fixAngleDo: "",
          }
        : s,
    ),
  );
};

// ====================================================
// Function for Overhead Wire Input
// ====================================================
// FUNCTION: Add a new Overhead Wire (max 8 OHW) By Input
export const syncOhwByInput = (
  inputValue,
  overheadWires,
  setOverheadWires,
  ohwIdRef,
  onConfirmReduce, // callback untuk modal konfirmasi
) => {
  const targetCount = Number(inputValue);

  if (!targetCount || targetCount < 0) return;

  const safeTarget = Math.min(targetCount, 8);
  const currentCount = overheadWires.length;

  // case 1: imput jumlah yang sama
  if (safeTarget === currentCount) return;

  // case 2: tambah object
  if (safeTarget > currentCount) {
    const addCount = safeTarget - currentCount;

    const newItems = [];
    for (let i = 0; i < addCount; i++) {
      ohwIdRef.current += 1;
      newItems.push({
        idOhw: ohwIdRef.current.toString(),
        nameOhw: "",
        weightOhw: "",
        diameterOhw: "",
        fixheightOhw: "",
        spanOhw: "",
        saggingOhw: "",
        nncOhw: "",
        fixAngleOhw: "",
        verticalAngleOhw: "",
      });
    }

    setOverheadWires([...overheadWires, ...newItems]);
    return;
  }

  // case 3: kurangi object
  if (safeTarget < currentCount) {
    onConfirmReduce({
      from: currentCount,
      to: safeTarget,
    });
  }
};

// FUNCTION: Add a new overhead wire (max 8 OHW) By Click
export const addOhw = (overheadWires, setOverheadWires, ohwIdRef) => {
  if (overheadWires.length >= 8) return;

  ohwIdRef.current += 1;
  const newIdOhw = ohwIdRef.current.toString();

  setOverheadWires([
    ...overheadWires,
    {
      idOhw: newIdOhw,
      nameOhw: "",
      weightOhw: "",
      diameterOhw: "",
      fixheightOhw: "",
      spanOhw: "",
      saggingOhw: "",
      nncOhw: "",
      fixAngleOhw: "",
      verticalAngleOhw: "",
    },
  ]);
};

// FUNCTION: Copy Overhead Wire data to clipboard
export const copyOhw = (overheadWire, setOhwClipboard) => {
  setOhwClipboard({
    nameOhw: overheadWire.nameOhw,
    weightOhw: overheadWire.weightOhw,
    diameterOhw: overheadWire.diameterOhw,
    fixheightOhw: overheadWire.fixheightOhw,
    spanOhw: overheadWire.spanOhw,
    saggingOhw: overheadWire.saggingOhw,
    nncOhw: overheadWire.nncOhw,
    fixAngleOhw: overheadWire.fixAngleOhw,
    verticalAngleOhw: overheadWire.verticalAngleOhw,
  });
};

// FUNCTION: Paste clipboard data into a specific Overhead Wire
export const pasteOhw = (idOhw, setOverheadWires, ohwClipboard) => {
  if (!ohwClipboard) return;

  setOverheadWires((prev) =>
    prev.map((ohwItem) =>
      ohwItem.idOhw === idOhw ? { ...ohwItem, ...ohwClipboard } : ohwItem,
    ),
  );
};

// FUNCTION: Remove a Overhead Wire by ID
export const removeOhw = (idOhw, overheadWires, setOverheadWires) => {
  setOverheadWires(overheadWires.filter((s) => s.idOhw !== idOhw));
};

// FUNCTION: Update a specific overhead wire's data
export const updateOhw = (idOhw, updates, setOverheadWires, overheadWires) => {
  setOverheadWires(
    overheadWires.map((s) => (s.idOhw === idOhw ? { ...s, ...updates } : s)),
  );
};

// FUNCTION: Reset the active overhead wire to default values
export const resetCurrentOhw = (setOverheadWires, overheadWires, idOhw) => {
  setOverheadWires(
    overheadWires.map((s) =>
      s.idOhw === idOhw
        ? {
            ...s,
            nameOhw: "",
            weightOhw: "",
            diameterOhw: "",
            fixheightOhw: "",
            spanOhw: "",
            saggingOhw: "",
            nncOhw: "",
            fixAngleOhw: "",
            verticalAngleOhw: "",
          }
        : s,
    ),
  );
};
