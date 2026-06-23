import { GRNReturnForm } from "../_components/grn-return-form";

export default async function AddGrnReturnPage({ searchParams }: { searchParams: { grnId?: string } }) {
  return (
    <GRNReturnForm />
  );
}
