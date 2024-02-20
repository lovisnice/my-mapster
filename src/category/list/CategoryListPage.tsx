import { Button, Col, Input, Popconfirm, Row, Table } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { APP_ENV } from "../../env";
import http_common from "../../http_common.ts";
import { ICategoryItem } from "../create/types.ts";

const CategoryListPage = () => {
    const imgURL = APP_ENV.BASE_URL + "/uploading/150_";

    const columns: ColumnsType<ICategoryItem> = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (imageName: string) => (
                <img src={`${imgURL}${imageName}`} alt="Category Image" />
            ),
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_, record) => (
                <Link to={`/category/edit/${record.id}`}>
                    <Button type="primary" icon={<EditOutlined />}>
                        Змінити
                    </Button>
                </Link>
            ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure to delete this category?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<DeleteOutlined />}>
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    const [data, setData] = useState<ICategoryItem[]>([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });


    useEffect(() => {
        fetchData();
    }, [pagination]);

    const fetchData = async () => {
        try {
            const response = await http_common.get("/api/categories", {
                params: { page: pagination.current, limit: pagination.pageSize }
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDelete = async (categoryId: number) => {
        try {
            await http_common.delete(`/api/categories/${categoryId}`);
            setData(data.filter(x => x.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        try {
            const response = await http_common.get(`/api/categories/search?query=${e.target.value}`);
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }

    };

    return (
        <>
            <Row gutter={[16, 16]} align="middle">
                <Col flex="auto">
                    <h1 style={{ marginBottom: 16 }}>Список категорій</h1>
                </Col>
                <Col flex="200px">
                    <Input.Search
                        placeholder="Search category"
                        enterButton
                        onChange={handleSearchChange}
                        //value={searchText}
                        style={{ width: '100%' }}
                    />
                </Col>
            </Row>

            <Table
                columns={columns}
                rowKey={"id"}
                dataSource={data}
                size="middle"
                pagination={pagination}
                onChange={handleTableChange}
            />

            <Link to={"/category/create"}>
                <Button type="primary" style={{ margin: '5px' }}>
                    ADD +
                </Button>
            </Link>
        </>
    );
};

export default CategoryListPage;
