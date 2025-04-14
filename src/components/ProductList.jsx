import React, { useEffect } from 'react'
import Navbar from './Navbar'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProduct } from '../features/Shopcart/productSlice';
import {addToCart} from '../features/Shopcart/cartSlice'
function ProductList() {
   
  const {items:products, status} = useSelector((state) => state.products)
   const dispatch =  useDispatch();
    useEffect(()=>{
     if(status == 'idle'){
      dispatch(fetchProduct())
     }
    }, [status])
    if(status == 'Loading') return <p>Loading......</p>
    if(status == 'failed') return <p>Failed to load Products</p>
  return (
    <>
   <Navbar/>
   <div className='product-list'>
   {
    products.map(product=>(
        <div className='product-card' key={product.id}>
   <img src={product.image} alt={product.title}/>
   <h2>{product.title.length>20 ? `${product.title.slice(0, 20)}...` : product.title}</h2>
   <p>Price: {product.price}</p>
   <button onClick={()=>dispatch(addToCart(product))}>Add To Cart</button>
   </div>
    ))
   }
   
   </div>
   </>
  )
}

export default ProductList
