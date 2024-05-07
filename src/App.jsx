import './App.css'
import { useCart } from './hooks/useCart'
import Card from './components/Card'
import Header from './components/Header'
import BookFile from './components/BookFile'

function App() {
 
  const {data, cart, showInfo, infoBook, showBookInfo, hideBookInfo, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal} = useCart()
  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main>

        {!showInfo ? (
          <div className="bookContainer">
            {data.map((book)=>
              <Card
                key = {book.id}
                book={book}
                addToCart={addToCart}
                showBookInfo={showBookInfo}
              />
           )}         
          </div>
        ):(

         
           <BookFile
            infoBook={infoBook}
            addToCart={addToCart}
            
            hideBookInfo={hideBookInfo}
            ></BookFile>
          
        )
        
        }      


      </main>

      <footer className="footer">
            <div className="footerContainer">
                <p>Akelarre - Tu tienda de libros online</p>
            </div>
        </footer>

    </>
  )
}

export default App
