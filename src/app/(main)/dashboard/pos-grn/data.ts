export interface GrnRecord {
  id: string;
  createdDate: string;
  billNumber: string;
  grnNumber: string;
  createdBy: string;
  supplier: string;
  totalQuantity: number;
  grossTotal: number;
  totalDiscount: number;
  totalTax: number;
  netTotal: number;
  remarks: string;
  returnStatus: "None" | "Partial" | "Full";
}

export const mockGrnData: GrnRecord[] = [
  {
    id: "1",
    createdDate: "12-05-2026",
    billNumber: "BILL-1001",
    grnNumber: "GRN-2026-001",
    createdBy: "Alice Smith",
    supplier: "PharmaCorp Inc.",
    totalQuantity: 1500.5,
    grossTotal: 25000.0,
    totalDiscount: 500.0,
    totalTax: 1200.0,
    netTotal: 25700.0,
    remarks: "Standard weekly delivery",
    returnStatus: "None",
  },
  {
    id: "2",
    createdDate: "13-05-2026",
    billNumber: "BILL-1002",
    grnNumber: "GRN-2026-002",
    createdBy: "Bob Johnson",
    supplier: "HealthCare Supplies LLC",
    totalQuantity: 3200.0,
    grossTotal: 48000.0,
    totalDiscount: 1200.0,
    totalTax: 2400.0,
    netTotal: 49200.0,
    remarks: "Urgent restocking",
    returnStatus: "None",
  },
  {
    id: "3",
    createdDate: "14-05-2026",
    billNumber: "BILL-1003",
    grnNumber: "GRN-2026-003",
    createdBy: "Charlie Brown",
    supplier: "MediEquip Ltd.",
    totalQuantity: 450.25,
    grossTotal: 8500.0,
    totalDiscount: 0.0,
    totalTax: 425.0,
    netTotal: 8925.0,
    remarks: "Partial return expected",
    returnStatus: "Partial",
  },
  {
    id: "4",
    createdDate: "15-05-2026",
    billNumber: "BILL-1004",
    grnNumber: "GRN-2026-004",
    createdBy: "Diana Prince",
    supplier: "Global Meds",
    totalQuantity: 520.0,
    grossTotal: 12000.0,
    totalDiscount: 300.0,
    totalTax: 600.0,
    netTotal: 12300.0,
    remarks: "Damaged box returned",
    returnStatus: "Full",
  },
  {
    id: "5",
    createdDate: "16-05-2026",
    billNumber: "BILL-1005",
    grnNumber: "GRN-2026-005",
    createdBy: "Alice Smith",
    supplier: "PharmaCorp Inc.",
    totalQuantity: 1359.25,
    grossTotal: 49332.53,
    totalDiscount: 1000.0,
    totalTax: 2466.62,
    netTotal: 50799.15,
    remarks: "Bulk order discount",
    returnStatus: "None",
  },
];
