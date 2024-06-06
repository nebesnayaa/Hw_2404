import ICategory from "../../models/ICategory";
import { useState, useEffect } from "react";

interface FormEditCategoryProps {
  categoryId: string;
  onClose: () => void;
  onCategoryUpdated: () => void;
}

function FormEditCategory({ categoryId, onClose, onCategoryUpdated }: FormEditCategoryProps) {
  const [formData, setFormData] = useState<ICategory | null>(null);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch(`http://localhost:3000/categories/${categoryId}`);
        if (!response.ok) {
          throw new Error("Не вдалось отримати категорію");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchCategory();
  }, [categoryId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => prevState ? {
      ...prevState,
      [name]: value,
    } : null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (formData) {
        const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Не удалось обновить категорию");
        }
        alert("Категория успешно обновлена");
        onCategoryUpdated();
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!formData) return <div>Загрузка...</div>;

  return (
    <>
      <form onSubmit={handleSubmit} className="container">
        <h2 className="text-center mb-4">Редагування категорії</h2>
        <div className="mb-3">
          <label className="form-label">Категорія:</label>
          <input
            className="form-control"
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Назва:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Опис:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL изображения:</label>
          <input
            className="form-control"
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Активна:</label>
          <input
            className="form-check-input"
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData((prevState) => prevState ? ({
                ...prevState,
                isActive: e.target.checked,
              }) : null)
            }
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Оновити категорію
        </button>
        <button className="btn btn-secondary" type="button" onClick={onClose}>
          Відмінити
        </button>
      </form>
    </>
  );
}

export default FormEditCategory;