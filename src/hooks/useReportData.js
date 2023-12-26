import { useContext } from "react";
import { ReportContext } from "../context/usePichart";


const useReportData = () => {
    return useContext(ReportContext)
}
export default useReportData;