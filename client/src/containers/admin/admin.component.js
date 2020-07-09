import React,{Component} from 'react';
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
 
// Pages
const Login = React.lazy(() => import('../../components/Admin/login-user/login-user.component.js'));
const Register = React.lazy(() => import('../../components/Admin/register-user/register-user.component.js'));
const Dashboard = React.lazy(() => import('../../components/Admin/Dashboard/Dashboard.js'));
const Product = React.lazy(() => import('../../components/Admin/Products/Products.js'));
const AddProduct = React.lazy(() => import('../../components/Admin/AddProduct/Addproduct.js'));
const User = React.lazy(() => import('../../components/Admin/Users/Users.js'));
const AddUser = React.lazy(() => import('../../components/Admin/AddUser/AddUser.js'));

// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
class AdminPage extends Component{
    render(){
        return(
            <BrowserRouter basename='/admin'>
                <React.Suspense fallback={loading()}>
                <Switch>
                    <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                    <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                    <Route exact path="/dashboard" name="Dashboard Page" render={props => <Dashboard {...props}/>} />
                    <Route exact path="/product" name="Products Page" render={props => <Product {...props}/>} />
                    <Route exact path="/product/addproduct" name="Add Products Page" render={props => <AddProduct {...props}/>} />
                    <Route exact path="/user" name="Userts Page" render={props => <User {...props}/>} />
                    <Route exact path="/user/adduser" name="Add User Page" render={props => <AddUser {...props}/>} />
                    {/* <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                    <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                    <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
                    </Switch>
                </React.Suspense>

            </HashRouter>
        )
    }
}
export default AdminPage