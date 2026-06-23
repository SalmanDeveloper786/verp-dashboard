export interface GrnReturnRecord {
  id: string;
  returnNumber: string;
  grnNumber: string;
  supplier: string;
  totalQuantity: number;
  totalAmount: number;
  createdBy: string;
  createdDate: string;
}

export interface HistoricalGrnRecord {
  id: string;
  createdDate: string;
  grnNumber: string;
  supplier: string;
  totalQuantity: number;
  netTotal: number;
  returnStatus: "Available" | "Partial Return" | "Returned";
}

export interface GrnReturnLineItem {
  id: string;
  sno: number;
  itemCode: string;
  itemName: string;
  originalGrnQty: number;
  maxReturnableQty: number;
  currentReturnQty: number;
  unitPrice: number;
  grossAmount: number;
  taxAmount: number;
  netReturnTotal: number;
  batchNumber: string; // BN
  expiryDate: string; // XD
}

export interface GrnReturnFormState {
  supplierName: string;
  originalGrnNumber: string;
  returnDate: string;
  paymentModeRef: "Cash" | "Credit" | "";
  returnInvoiceType: "Cost Price" | "Retail Price" | "";
  reasonForReturn: string;
  remarks: string;
  items: GrnReturnLineItem[];
}

export interface InlineReturnItem {
  id: string;
  sno: number;
  itemCode: string;
  itemName: string;
  receivedQty: number;
  returnedQty: number;
  returnQty: number;
}
