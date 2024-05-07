import { useState, useEffect, useMemo } from "react";
import { db } from "../data/book_db";

export const useCart = () => {
	//state to show/hide book info file
	const [showInfo, setShowInfo] = useState(false);
	const [infoBook, setInfoBook] = useState(null);

	const showBookInfo = (book) => {
		setInfoBook(book);
		setShowInfo(true);
	};

	const hideBookInfo = () => {
		setShowInfo(false);
	};

	//get book data from database stored in js object
	const [data] = useState(db);

	//get initial cart items from local storage (if any)
	const initialCart = () => {
		const localStorageCart = localStorage.getItem("cart");
		return localStorageCart ? JSON.parse(localStorageCart) : [];
	};

	const [cart, setCart] = useState(initialCart);

	//Apply changes to locally stored cart
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	//add item to shopping cart
	const addToCart = (item) => {
		const itemExists = cart.findIndex((element) => element.id === item.id);

		if (itemExists !== -1) {
			const updatedCart = [...cart];
			updatedCart[itemExists].quantity++;
			setCart(updatedCart);
		} else {
			item.quantity = 1;
			setCart([...cart, item]);
		}
	};

	//remove item from shopping cart
	const removeFromCart = (id) => {
		setCart((prevCart) => prevCart.filter((item) => item.id != id));
	};

	//increase qty from an item in shopping cart
	const increaseQuantity = (id) => {
		const index = cart.findIndex((element) => element.id === id);
		const updatedCart = [...cart];
		updatedCart[index].quantity++;
		setCart(updatedCart);
	};

	//decrease qty from an item in shopping cart (or delete it if it reaches 0)
	const decreaseQuantity = (id) => {
		const index = cart.findIndex((element) => element.id === id);

		if (cart[index].quantity == 1) {
			removeFromCart(id);
		} else {
			const updatedCart = [...cart];
			updatedCart[index].quantity--;
			setCart(updatedCart);
		}
	};

	//clear whole shopping cart
	const clearCart = () => {
		setCart([]);
	};

	//State derivado
	const isEmpty = useMemo(() => cart.length === 0, [cart]);
	const cartTotal = useMemo(() => cart.reduce((total, item) => (total += item.price * item.quantity), 0), [cart]);

	return {
		data,
		cart,
		showInfo,
		infoBook,
		showBookInfo,
		hideBookInfo,
		addToCart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
		clearCart,
		isEmpty,
		cartTotal,
	};
};
