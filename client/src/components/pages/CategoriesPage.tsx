import { useState, useEffect } from "react";
import CategoryList from "../../components/pages/CategoryList";
import FormEditCategory from "../forms/FormEditCategory";
import ICategory from "../../models/ICategory";

function CategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      if (!response.ok) {
        throw new Error("Не вдалось отримати категорії");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (id: string) => {
    setEditingCategoryId(id);
  };

  const handleClose = () => {
    setEditingCategoryId(null);
  };

  return (
    <div>
      <CategoryList categories={categories} onEdit={handleEdit} onCategoryDeleted={fetchCategories} />
      {editingCategoryId && (
        <FormEditCategory 
          categoryId={editingCategoryId} 
          onClose={handleClose} 
          onCategoryUpdated={fetchCategories} 
        />
      )}
    </div>
  );
}

export default CategoriesPage;