

export default function BookFile({infoBook, hideBookInfo, addToCart}){

    const {id, title, type, author,price, img, summary, isbn,year,pages,tags} = infoBook

    return(
        <main className='modalContainer'>
            <div className="infoCard">
                <div className="imgContainerInfo">
                    <img src={img} alt={`Portada del libro ${title} de ${author}`} />
                </div>

                <div className="innerContainer">
                    <h2>{title} <span>de {author} ({year})</span> </h2>
                    <div className="flexCont">
                        <p className="smallText">Formato: {type}</p>
                        <p className="smallText">Nº de páginas: {pages}</p>
                        <p className="smallText">ISBN: {isbn}</p>
                    </div>
                    <p className='sinTitle'>Sinopsis:</p>
                    <p>{summary}</p>

                    <button className="cta bookFileBtn" onClick={() => addToCart(infoBook)}>
                    Añadir al carrito
                    </button>

                    <button className="closeInfo" onClick={hideBookInfo}><i className="fa-solid fa-xmark"></i></button>
                </div>


            </div>

        </main>
    )
}