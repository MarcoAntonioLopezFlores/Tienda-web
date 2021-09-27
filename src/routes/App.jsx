import { LinearProgress } from '@material-ui/core'
import React,{ Suspense } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
const PublicRoute = React.lazy(()=>import('../components/routes/PublicRoute'))
const NewProducts = React.lazy(()=>import('../pages/NewProducts'))
const FooterComponent = React.lazy(()=>import('../components/home/FooterComponent'))
const PasswordSettings = React.lazy(()=>import('../pages/admin/PasswordSettings'))
const Home = React.lazy(()=>import('../pages/Home'))
const NotFound = React.lazy(()=>import('../pages/NotFound'))
const ProductDetails = React.lazy(()=>import('../pages/ProductDetails'))
const ProductDeliver = React.lazy(()=>import('../pages/customer/ProductoEnvio'))
const ProductAddress = React.lazy(()=>import("../pages/customer/ProductAddress"))
const ProductPay = React.lazy(()=>import("../pages/customer/ProductPay"))
const AdminRoute = React.lazy(()=>import('../components/routes/AdminRoute'))
const CustomerRoute = React.lazy(()=>import('../components/routes/CustomerRoute'))
const BrandsManagement= React.lazy(()=>import('../pages/admin/BrandsManagement'))
const CategoriesManagement = React.lazy(()=>import('../pages/admin/CategoriesManagement'))
const CompaniesManagement = React.lazy(()=>import('../pages/admin/CompaniesManagement'))
const ProductsManagement = React.lazy(()=>import('../pages/admin/ProductsManagement'))
const SubcategoriesManagement = React.lazy(()=>import('../pages/admin/SubcategoriesManagement'))
const UserManagement = React.lazy(()=>import('../pages/admin/UserManagment'))
const PurchaseManagement = React.lazy(()=>import('../pages/admin/PurchaseManagment'))
const LogsManagement =  React.lazy(()=>import('../pages/admin/LogsManagment'))
const LoginManagment =  React.lazy(()=>import('../pages/admin/LoginManagment'))
const Perfil = React.lazy(()=>import('../pages/customer/Perfil'))
const Pedido = React.lazy(()=>import('../pages/customer/Pedidos'))
const Carrito = React.lazy(()=>import('../pages/customer/Carrito'))
const Producto = React.lazy(()=>import('../pages/Producto'))
const AddressesManagement = React.lazy(()=>import('../pages/admin/AddressesManagement'))
const PasswordRecovery = React.lazy(()=>import('../pages/PasswordRecovery'))
const ChangePassword = React.lazy(()=>import('../pages/ChangePassword'))
const DetailPedido = React.lazy(()=>import('../pages/customer/DetailPedido'))


function App() {
  return (    
      <Router>
        <Suspense fallback={<LinearProgress />}>
        <Switch>          
          <PublicRoute path={["/","/index"]} component={Home} exact/>          
          <PublicRoute path={"/producto/detalles"} component={ProductDetails} exact/>
          <PublicRoute path={"/productos"} component={Producto} exact/>
          <PublicRoute path={"/productos/nuevos"} component={NewProducts} exact/>
          <Route path={"/recuperar"} component={PasswordRecovery} exact/>
          <Route path={"/recuperar/cambiar/:token"} component={ChangePassword} exact/>
          <CustomerRoute path={"/compra/envio"} role={2} component={ProductDeliver} exact/>
          <CustomerRoute path={"/compra/direccion"} role={2} component={ProductAddress} exact/>
          <CustomerRoute path={"/compra/pago"} role={2} component={ProductPay} exact/>
          <CustomerRoute path={"/perfil"} role={2} component={Perfil} exact/>
          <CustomerRoute path={"/pedidos/detalle"} role={2} component={DetailPedido} exact/>
          <CustomerRoute path={"/pedidos"} role={2} component={Pedido} exact/>
          <CustomerRoute path={"/carrito"} role={2} component={Carrito} exact/>
          <AdminRoute component={BrandsManagement} role={1} path="/admin/marcas" exact/>          
          <AdminRoute component={CategoriesManagement} role={1} path="/admin/categorias" exact/>
          <AdminRoute component={SubcategoriesManagement} role={1} path="/admin/subcategorias" exact/>
          <AdminRoute component={CompaniesManagement} role={1} path="/admin/companias" exact/>
          <AdminRoute component={ProductsManagement} role={1} path="/admin/productos" exact/>
          <AdminRoute component={AddressesManagement} role={1} path="/admin/companias/direccion" exact/> 
          <AdminRoute component={PasswordSettings} role={1} path="/admin/contraseña" exact/>          
          <AdminRoute component={UserManagement} role={1} path="/admin/usuarios" exact/>     
          <AdminRoute component={PurchaseManagement} role={1} path="/admin/pedidos" exact/>  
          <AdminRoute component={LogsManagement} role={1} path="/admin/bitacora" exact/>          
          <AdminRoute component={LoginManagment} role={1} path="/admin/bitacora-sesiones" exact/>           
          <Route component={NotFound}/>
        </Switch>
        <FooterComponent/>
        </Suspense>
      </Router>
  );
}
export default App;
