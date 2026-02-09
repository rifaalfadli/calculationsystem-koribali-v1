import { ReportPage } from "../components/ReportPage";
import { Helmet } from "react-helmet";

export default function Report() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Report - KORI BALI</title>
          <meta
            name="report"
            content="Report System CV. KORI BALI menyajikan hasil analisis dan ringkasan data struktur pole secara lengkap."
          />
        </Helmet>

        <div className="border border-gray-250">
          <ReportPage />
        </div>
      </div>
    </>
  );
}
