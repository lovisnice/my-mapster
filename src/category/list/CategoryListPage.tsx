import { Button, List, message } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import http_common from "../../http_common.ts";

interface Category {
    id: number;
    name: string;
    description: string;
    // Add other fields as needed
}

const CategoryItem: React.FC<{ category: Category, onDelete: (id: number) => void }> = ({ category, onDelete }) => {
    const handleDelete = () => {
        onDelete(category.id);
    };

    return (
        <List.Item
            key={category.id}
            actions={[
                <Link to={`/category/edit/${category.id}`}><Button type="link">Edit</Button></Link>,
                <Button type="primary" onClick={handleDelete}>Delete</Button>
            ]}
        >
            <div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                {/* Render your photo here */}
                {/* <img src={category.photo} alt={category.name} /> */}
            </div>
        </List.Item>
    );
};

const CategoryListPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await http_common.get("/api/categories");
                setCategories(response.data); // Assuming response.data contains the list of categories
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleDeleteCategory = async (id: number) => {
        try {
            // You can implement the delete logic here
            // await http_common.delete(`/api/categories/${id}`);
            // Update the categories state after deletion
            setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
            message.success('Category deleted successfully!');
        } catch (error) {
            console.error("Error deleting category:", error);
            message.error('Failed to delete category!');
        }
    };

    return (
        <>
            <h1>Список категорій</h1>
            <Link to={"/category/create"}>
                <Button size={"large"}>Додати</Button>
            </Link>
            <List
                itemLayout="vertical"
                dataSource={categories}
                renderItem={category => (
                    <CategoryItem key={category.id} category={category} onDelete={handleDeleteCategory} />
                )}
            />
        </>
    );
}

export default CategoryListPage;
