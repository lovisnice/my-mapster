import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./containers/default/DafaultLayout.tsx";
import CategoryListPage from "./category/list/CategoryListPage.tsx";
import CategoryCreatePage from "./category/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./category/edit/CategoryEditPage.tsx";


const App = () => (
    <>
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<CategoryListPage/>}/>
                <Route path={"category"}>
                    <Route path={"create"} element={<CategoryCreatePage/>} />
                    <Route path={"edit/:id"} element={<CategoryEditPage/>} />
                </Route>
            </Route>
        </Routes>
    </>
);

export default App;