import {
  FileText,
  FileDown,
  Table2,
  CalendarDays,
} from "lucide-react";

export const reportStats = [
  {
    title: "Total Reports",
    value: "1,248",
    subtitle: "Generated reports",
    icon: FileText,
    color: "#3B82F6",
  },
  {
    title: "PDF Reports",
    value: "860",
    subtitle: "Downloaded",
    icon: FileDown,
    color: "#EF4444",
  },
  {
    title: "CSV Reports",
    value: "388",
    subtitle: "Exported",
    icon: Table2,
    color: "#10B981",
  },
  {
    title: "This Month",
    value: "142",
    subtitle: "New reports",
    icon: CalendarDays,
    color: "#F59E0B",
  },
];