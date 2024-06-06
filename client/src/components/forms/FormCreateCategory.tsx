import ICategory from "../../models/ICategory";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function FormCreateCategory() {
  const [formData, setFormData] = useState<ICategory>({
    id: uuidv4(),
    slug: "",
    name: "",
    description: "",
    imageUrl: "",
    isActive: true,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Не вдалось додати категорію");
      }
      alert("Категорія успішно додана");

      setFormData({
        id: "",
        slug: "",
        name: "",
        description: "",
        imageUrl: "",
        isActive: true,
      });
    } catch (error: any) {
      console.error("Error: ", "OUR ERROR: " + error.message);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-4">
          <form onSubmit={handleSubmit} className="container">
            <h2 className="text-center mb-4">Створення категорії</h2>
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
              <label className="form-label">URL зображення:</label>
              <input
                className="form-control"
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Додати категорію
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormCreateCategory;
