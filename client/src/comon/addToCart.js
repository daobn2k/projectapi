import { storage } from "./storage"
export const addToCart = (data) =>{
    const cart = storage.getCartCurrent()
  if(cart){
  const exist = cart.find( e => e.id === data.id )
      if(exist) {
      const index = cart.findIndex( (e) => e.id === data.id)
       cart[index] = ({
          ...exist,product_quantity:exist.product_quantity + 1
        })
        storage.setCartCurrent(cart)
      }else{
        const dataSet = 
        {id:data.id,
          product_name:data.product_name,
          product_image:data.product_image,
          product_price:data.product_price,
          product_quantity:1
        }
        storage.setCartCurrent([...cart,dataSet])
      }
  }
  else{
    const dataSet= [{
        id:data.id,
        product_name:data.product_name,
        product_image:data.product_image,
        product_price:data.product_price,
        product_quantity:1
    }]
      storage.setCartCurrent(dataSet)
  }
}