// FL/m [flp_u] (Fix Load, weight of Straight Pipe [ kg/m ]
export function calculateFlU(DpL, TpL) {
  const pi_c = 3.14159265358979;
  // DpL = Diameter Pole in mm
  // TpL = Thickness Pole in mm
  const FlU =
    (((pi_c / 4) * (DpL ** 2 - (DpL - 2 * TpL) ** 2)) / 10 ** 6) * 7850;

  return FlU;
}

// Function for cross section Area Round pole [A] (cm^2)
export function calculateCrossAp(DpL, TpL) {
  const pi_c = 3.14159265358979;
  // DpL = Diameter Pole in mm
  // TpL = Thickness Pole in mm
  const CrossAp = ((pi_c / 4) * (DpL ** 2 - (DpL - 2 * TpL) ** 2)) / 100;

  return CrossAp;
}

// Function for Moment Inertia of Round pole [I] (cm^4)
export function calculateInasMp(DpL, TpL) {
  const pi_c = 3.14159265358979;
  // DpL = Diameter Pole in mm
  // TpL = Thickness Pole in mm
  const InasMp = ((pi_c / 64) * (DpL ** 4 - (DpL - 2 * TpL) ** 4)) / 10000;

  return InasMp;
}

// Function for Section modulus of Round Pole [Z] (cm^3)
export function calculateSecMdl(DpL, TpL) {
  const pi_c = 3.14159265358979;
  // DpL = Diameter Pole in mm
  // TpL = Thickness Pole in mm
  const SecMdl = (pi_c * (DpL ** 4 - (DpL - TpL * 2) ** 4)) / (32 * DpL) / 1000;

  return SecMdl;
}

// Function for Radius Gyration (cm)
export function calculateRadGy(DpL, TpL) {
  // DpL = Diameter Pole in mm
  // TpL = Thickness Pole in mm
  const RadGy = (((1 / 16) * (DpL ** 2 + (DpL - 2 * TpL) ** 2)) / 100) ** 0.5;

  return RadGy;
}
