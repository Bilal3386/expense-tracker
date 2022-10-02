import { useState } from "react";
import Authentication from "./components/auth/Authentication";
import Header from "./components/layout/Header";
import Cart from './components/cart/Cart'



function App() {
  const [cartShow, setCartShow] = useState(false)

  const closeCartHandler = () => {
    setCartShow(false)
  }
  const showCartHandler = () => 
  {
    setCartShow(true)
  }
  return (
    <>
    {cartShow && <Cart onCloseCart={closeCartHandler}/>}
    <Header onShowCart={showCartHandler}/>
      <main>
        <Authentication />
      </main>
    </>
  );
}

export default App;
