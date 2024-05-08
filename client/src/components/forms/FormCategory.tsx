import ICategory from "../../models/ICategory";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function FormCategory() {
    const [formData, setFormData] = useState<ICategory>({
        id: uuidv4(),
        slug: '',
        name: '',
        description: '',
        imageUrl: '',
        isActive: true
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, 
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Не удалось добавить категорию');
            }
            alert('Категория успешно добавлена');

            setFormData({
                id: '',
                slug: '',
                name: '',
                description: '',
                imageUrl: '',
                isActive: true
            });
        }
        catch (error) {
            console.error("Error: ", error.message);
        }
    };

    return (
        <>
        <div className="row justify-content-center">
            <div className="col-4">
                <form onSubmit={handleSubmit} className="container">
                    <h2 className="text-center mb-4">Создание категории</h2>
                    <div className="mb-3">
                        <label className="form-label">Категория:</label>
                        <input className="form-control" type="text" name="slug" value={formData.slug} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Название:</label>
                        <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Описание:</label>
                        <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL изображения:</label>
                        <input className="form-control" type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange}/>
                    </div>
                    <button className="btn btn-primary" type="submit">Добавить категорию</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default FormCategory;