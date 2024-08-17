import React, { useEffect, useState } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { BiCartAdd } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';


const ProductPage = () => {
    const [data, setData] = useState([])
     const {addToCart} = useCart()
     const {getTotalItem} = useCart()
   
    // const [productCount, setProductCount] = useState(0)
    //  product Add to cart
    // const handleAddProduct = () => {
    //     setProductCount(productCount + 1)
    //     console.log(productCount)
    // }

    //   navigate to the cart page
    const navaigate = useNavigate()

    const handleClickCart = () => {
        navaigate('/cart')
    }
    //  fetch product data
    const fetchProduct = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    //   product name length
    const productlength = (title) => {
        return title.length > 15 ? title.slice(0, 15) + "..." : title
    }
    return (
        <div className='responsive'>
            {/* nav-section */}
            <div className='navbar'>
                <div className='navbar-item'>
                    <IoCartOutline className='icon-size' onClick={handleClickCart} />
                    <span className='cart-count'>{getTotalItem()}</span>
                    <p>Cart</p>
                </div>
            </div>
            {/* product display section */}
            <div className='product-List'>
                {data.map((item) => (
                    <div key={item.id} className='product-item'>
                        <div className='product-image'>
                            <img src={item.image} />
                        </div>
                        <div className='product-name'>
                            <p>{productlength(item.title)}</p>
                            <p> Price: ${item.price}</p>
                        </div>
                        <div onClick={() => addToCart(item)} className='btn-add'>
                            <BiCartAdd className='add-icon' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductPage