import { PoleStructuralAnalyzer } from "../components/PoleStructuralAnalyzer";
import { Helmet } from "react-helmet";

export default function Calculation() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Calculation - KORI BALI</title>
          <meta
            name="calculation"
            content="Calculation System CV. KORI BALI membantu Anda menghitung dan menganalisis struktur pole dengan mudah."
          />
        </Helmet>

        <div className="min-h-screen bg-gray-50 border border-gray-250">
          <PoleStructuralAnalyzer />
        </div>
      </div>
    </>
  );
}
