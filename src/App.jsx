import { useState, useEffect } from 'react'
import './App.css'
import{db} from "./data/book_db"
import Card from './components/Card'
import Header from './components/Header'

function App() {

  //get book data from database stored in js object
  const [data]=useState(db)

  //get initial cart items from local storage (if any)
  const initialCart = () =>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart):[]
  }

  const [cart, setCart]=useState(initialCart)

  //Apply changes to locally stored cart
  useEffect (()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  //add item to shopping cart
  const addToCart = (item) => { 
    const itemExists = cart.findIndex(element=> element.id === item.id) 
    
    if (itemExists!==-1){
        const updatedCart = [...cart]
        updatedCart[itemExists].quantity++
        setCart(updatedCart)
    }else{
        item.quantity = 1
        setCart ( [...cart, item])
    }
    
  }

 //remove item from shopping cart
  const removeFromCart = (id)=>{
    setCart(prevCart => prevCart.filter((item)=> item.id!=id))
  }

//increase qty from an item in shopping cart
  const increaseQuantity=(id)=>{
    const index = cart.findIndex(element=> element.id === id) 
    const updatedCart = [...cart]
    updatedCart[index].quantity++
    setCart(updatedCart)
  }

//decrease qty from an item in shopping cart (or delete it if it reaches 0)
  const decreaseQuantity=(id)=>{
    const index = cart.findIndex(element=> element.id === id) 

    if (cart[index].quantity==1){
        removeFromCart(id)
    }else{
        const updatedCart = [...cart]
            updatedCart[index].quantity--
            setCart(updatedCart)
    }
  }

//clear whole shopping cart
  const clearCart =()=>{
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main>
        <div className="bookContainer">
          {data.map((book)=>
          <Card
            key = {book.id}
            book={book}
            addToCart={addToCart}

          />
        )}

         
        </div>

      </main>

      <footer>

      </footer>

    </>
  )
}

export default App
