export default function Card({book, addToCart}){

    const {id, title, type, author,price, img, summary, isbn,year,pages,tags} = book

    return(
        <>
            <div className="card">
                <div className="imgContainer">
                    <img src={img} alt="" />
                </div>
                <h3 className='title'>{title}</h3>
                <h4 className='author'>{author}</h4>
                <div className="typeAndPrice">
                    <p>{type}</p>
                    
                    <p><span>{price.toFixed(2)}</span> €</p>
                    
                </div>
                <div className="buttonContainer">

                <button>
                    Ver ficha
                </button>
                <button className="cta" onClick={() => addToCart(book)}>
                    Añadir al carrito
                </button>
                </div>
            </div>
            
        </>
    )

}