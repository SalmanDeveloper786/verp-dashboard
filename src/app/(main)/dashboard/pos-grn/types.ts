export interface GrnLineItem {
  id: string;
  itemCode: string;
  itemName: string;
  qty: number;
  retailPrice: number;
  lastPurchasePrice: number;
  price: number;
  grossAmount: number;
  discount1: number;
  discount2: number;
  discountAmount: number;
  taxAmount: number;
  netAmount: number;
  expiryDate: string; // XD
  batchNumber: string; // BN
}

export interface GrnFormState {
  supplierName: string;
  supplierOutstandingBalance: number;
  paymentMode: "Cash" | "Credit";
  purchaseOrder: string;
  billNumber: string;
  billDate: string;
  grnDate: string;
  invoiceType: string;
  remarks: string;
  items: GrnLineItem[];
}
