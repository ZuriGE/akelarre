import { useMemo } from "react"

export default function Header ({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart}){

    //State derivado
    const isEmpty = useMemo(() => cart.length ===0, [cart]) 
    const cartTotal = useMemo(()=> cart.reduce((total, item)=> total += item.price*item.quantity, 0), [cart])

   return(
    <header>
        <div className="titleContainer">
        <p>Libros</p>
        <h1>Akelarre</h1>
        </div>

        <div className="cartContainer">
            <i className="fa-solid fa-basket-shopping"></i>
            <div className="dot">
                <p>{cart.length}</p>
            </div>
            <div className="extendedCart">
                <div className="extendedCartContent">
                    {isEmpty ? (
                        <p className="textAlignCenter">El carrito está vacío</p> 
                    ):(
                        <>
                        <p className="textAlignCenter borderBottom">Tu cesta de la compra</p> 
                        

                            {cart.map((book) =>(
                                
                                    <div className="bookInCart" key={book.id} >                                            
                                        <div className="imgContainerSmall" ><img src={book.img} alt={`Portada del libro ${book.title} de {book.author}`} /></div>
                                        <div className="shoppingInfo">
                                            <p className='smallText'>{book.title}</p>
                                            <p className='smallText'>P.V.P. {book.price.toFixed(2)} €</p>
                                            <div className="quantityControl">
                                                <button 
                                                className="smallBtn smallText"
                                                onClick = {()=> decreaseQuantity(book.id)}>-</button>
                                                <p>{book.quantity}</p>
                                                <button 
                                                className="smallBtn smallText"
                                                onClick = {()=> increaseQuantity(book.id)}>+</button>
                                            </div>
                                        </div>
                                        <div className="subtotalContainer">
                                            <p className="subtotal">{(book.price*book.quantity).toFixed(2)}€</p>
                                        </div>
                                        <div  className='trashCanContainer'>

                                            <div className='trashCanBtn' onClick = {()=> removeFromCart(book.id)}> 
                                                <i className="fa-regular fa-trash-can"></i>
                                            </div> 
                                        </div>
                                    </div>

                                 
                                
                            ))}

                                <div className="cartTotal smallText">
                                    <button className="smallText" onClick={clearCart}>Vacíar la cesta</button>
                                    <p>Total: <span>{cartTotal.toFixed(2)}€</span></p>

                                </div>

                                <button className="cta buyBtn">Comprar</button>
                            </>
                        
                    )}


                    
                </div>
            </div>
        </div>

        

  </header>
   )





}