import ICategory from "../../models/ICategory";

interface CategoryListProps {
  categories: ICategory[];
  onEdit: (id: string) => void;
  onCategoryDeleted: () => void;
}

function CategoryList({ categories, onEdit, onCategoryDeleted }: CategoryListProps) {
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Не вдалось видалити категорію");
      }
      onCategoryDeleted();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Список категорій</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Категорія</th>
            <th>Назва</th>
            <th>Опис</th>
            <th>Активна</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.slug}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.isActive ? "Да" : "Нет"}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => onEdit(category.id)}
                >
                  Редагувати
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(category.id)}
                >
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;
