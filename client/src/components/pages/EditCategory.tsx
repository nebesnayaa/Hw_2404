import { useState } from "react";
import CategoryList from "../../components/pages/CategoryList";
import FormEditCategory from "../forms/FormEditCategory";

export default function CategoryPage() {
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingCategoryId(id);
  };

  const handleClose = () => {
    setEditingCategoryId(null);
  };

  return (
    <div>
      <CategoryList onEdit={handleEdit} />
      {editingCategoryId && (
        <FormEditCategory categoryId={editingCategoryId} onClose={handleClose} />
      )}
    </div>
  );
}