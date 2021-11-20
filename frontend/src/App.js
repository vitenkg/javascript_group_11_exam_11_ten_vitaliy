import MainPage from "./containers/MainPage/MainPage";
import Layout from "./components/UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import CreateItem from "./containers/CreateItem/CreateItem";
import Item from "./containers/Item/Item";
import LoginUser from "./containers/LoginUser/LoginUser";
import RegisterUser from "./containers/RegisterUser/RegisterUser";

const App = () => (
    <>
        <Layout>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/items/new" component={CreateItem}/>
                <Route path="/items/:id" component={Item}/>
                <Route path="/login" component={LoginUser}/>
                <Route path="/register" component={RegisterUser}/>
            </Switch>
        </Layout>
    </>

    );

export default App;
