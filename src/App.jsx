import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Listarticles from "./components/admin/articles/Listarticles";
import Listcategories from "./components/admin/categories/Listcategories";
import Listscategories from "./components/admin/scategories/Listscategories";
import Menu from "./components/admin/Menu";

import Listarticlecard from "./components/client/Listarticlecard";
import Cart from "./components/client/panier/Cart";
import Navscroll from "./components/client/Navscroll";

function App() {
 
  return (
    <>
     <Router>
<Navscroll/>
      {/*<Menu/>*/}
<Routes>

<Route path='/cart' element={<Cart/>}/>
<Route path="/articles"  element={<Listarticles/>}/>
<Route path="/categories"  element={<Listcategories/>}/>
<Route path="/scategories"  element={<Listscategories/>}/>
<Route path="/card"  element={<Listarticlecard/>}/>
</Routes>
</Router>
    </>
  )
}

export default App
