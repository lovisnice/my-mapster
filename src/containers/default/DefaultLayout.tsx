import {Breadcrumb, Button, Layout, theme} from "antd";
import DefaultHeader from "./DefaultHeader";
import {Outlet, useNavigate} from "react-router-dom";
import "./DefaultLayout.css"
import {getLocalStorage} from "../../utils/storage/localStorageUtils.ts";


const { Content, Footer} = Layout;

const DefaultLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const admin = getLocalStorage('roles');
    if (typeof admin === 'string') {
        if (admin === 'admin') {
            navigate("/admin");
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <DefaultHeader/>
                <Content style={{ padding: '0 48px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                    >

                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Outlet />
                            {admin === 'admin' && (
                                <Button onClick={() => navigate("/admin")}>Admin Panel</Button>
                            )}
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center', bottom: "0", right: "0", left: "0"}}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default DefaultLayout;