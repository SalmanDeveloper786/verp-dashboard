"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { GRNForm } from "../../_components/grn-form";
import { GrnFormState } from "../../types";

export default function EditGRNPage() {
  const params = useParams();
  const id = params.id as string;

  // Mocking fetched data based on the ID
  const [initialData, setInitialData] = React.useState<GrnFormState | null>(null);

  React.useEffect(() => {
    // Simulate an API call
    const timer = setTimeout(() => {
      setInitialData({
        supplierName: "PharmaCorp",
        supplierOutstandingBalance: 45000.5,
        paymentMode: "Credit",
        purchaseOrder: "PO-2026-991",
        billNumber: "BILL-5542",
        billDate: "2026-06-20",
        grnDate: "2026-06-23",
        invoiceType: "Standard",
        remarks: "Urgent restocking requested by warehouse manager.",
        items: [
          {
            id: "line-1",
            itemCode: "ITM-001",
            itemName: "Paracetamol 500mg (Box of 100)",
            qty: 50,
            retailPrice: 12.0,
            lastPurchasePrice: 8.0,
            price: 8.5,
            grossAmount: 425.0,
            discount1: 5.0,
            discount2: 0.0,
            discountAmount: 21.25,
            taxAmount: 40.37,
            netAmount: 444.12,
            expiryDate: "2028-12-31",
            batchNumber: "BN-7741",
          },
          {
            id: "line-2",
            itemCode: "ITM-045",
            itemName: "Medical Grade Masks (Pack of 50)",
            qty: 200,
            retailPrice: 25.0,
            lastPurchasePrice: 15.0,
            price: 15.0,
            grossAmount: 3000.0,
            discount1: 10.0,
            discount2: 5.0,
            discountAmount: 450.0,
            taxAmount: 255.0,
            netAmount: 2805.0,
            expiryDate: "2029-01-15",
            batchNumber: "BN-8802",
          },
        ],
      });
    }, 500); // simulate 500ms network delay

    return () => clearTimeout(timer);
  }, [id]);

  if (!initialData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm font-medium text-slate-500">Loading GRN Data...</div>
      </div>
    );
  }

  return <GRNForm initialData={initialData} />;
}
