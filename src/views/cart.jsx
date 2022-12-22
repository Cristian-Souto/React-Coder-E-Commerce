import { Layout } from "../components/Layout";
import Item from "../components/Item";
import { TrashWidget } from "../components/TrashWidget";
import CheckoutView from "./checkout";
import { useContext} from "react";
import { CartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const CartView = () => {
  const { productsAdded: items, importeTotal } = useContext(CartContext);
  const navigate = useNavigate();

  function goToCheckout() {
    return navigate('/checkout')
  }

  return (
    <Layout>
      { <div style={{maxWidth:'90%',display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center',margin:'auto'}}>
       { items.length === 0 ? (
          <div style={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
            <h1 className="text-2xl">No has agregado productos al carrito</h1>
            <button
              onClick={() => navigate("/")}
              style={{borderRadius:'8px',color:'white',fontWeight:'bolder',backgroundColor:'slategrey',padding:'1rem .8rem',marginTop:'2rem'}}
            >
              Ir al Inicio
            </button>
          </div>
        ) : (
          <div>
            <div style={{display:'flex',flexDirection:'column'}}>
              {items.map((product) => {
                const quantityAdded = product.quantityAdded
                return (
                  <div style={{position:'relative'}}>
                    <Item
                      product={product.item}
                      quantityAdded={quantityAdded} 
                    />
                    <TrashWidget itemId={product.item.id} />
                  </div>
                );
              })}
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',marginTop:'3rem'}}>
              <div style={{display:'flex',flexDirection:'column'}}>
                <span>
                  Total a pagar: <strong>${importeTotal}</strong>
                </span>
                <button
                  onClick={goToCheckout}
                  style={{borderRadius:'8px',color:'white',fontWeight:'bolder',backgroundColor:'darkslateblue',padding:'1rem .8rem',marginTop:'2rem'}}
                >
                  Ir al Checkout
                </button>
              </div>
            </div>
          </div>
       )}
      </div>}
    </Layout>
  )
}

export default CartView;