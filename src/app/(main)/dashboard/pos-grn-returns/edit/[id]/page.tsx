import { GRNReturnForm } from "../../_components/grn-return-form";

export default async function EditGrnReturnPage({ params }: { params: { id: string } }) {
  // Pass the id to trigger the 'Edit' contextual headers and action buttons.
  return (
    <GRNReturnForm returnId={params.id} />
  );
}
