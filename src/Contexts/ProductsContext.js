import axios from 'axios';
import React, { useReducer } from 'react';
import { toast } from 'react-toastify';
import { API } from '../helpers/const';
export const productsContext = React.createContext()

const INIT_STATE = {
    products: null,
    productToEdit: null

}

const reduser = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {...state, products: action.payload }
        case 'GET_PRODUCTS_TO_EDIT':
            return {...state, productToEdit: action.payload }
        default: 
            return {...state}
    }
}

const ProductsContextProvider = ({ children }) => {
    const [state, dispach] = useReducer(reduser, INIT_STATE)

    const addProdact = async (newProdact) => {
        try {
            await axios.post('http://localhost:8000/products', newProdact)
            toast.success("Успешно созданно!",
            {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        } catch (e) {
            toast.warn("ошибка приложения, попробуйте еше раз",
            {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        }
    }
    const getProdacts = async () => {
        const {data} = await axios (API)
        dispach({
            type: 'GET_PRODUCTS',
            payload: data
        })
    }

    const deleteProduct = async (id) => {
        await axios.delete(`${API}/${id}`)
        getProdacts()
    }

    const getProductToEdit = async (id) => {
        const {data} = await axios.get(`${API}/${id}`)
       dispach({
           type: 'GET_PRODUCTS_TO_EDIT',
           payload: data
       })
    }

    const saveEditedProduct = async (editedProduct) => {
        await axios.patch(`${API}/${editedProduct.id}`, editedProduct)
        getProdacts()
    }

    return (
        <productsContext.Provider value={{
            products: state.products,
            productToEdit: state.productToEdit,
            addProdact,
            getProdacts,
            deleteProduct,
            getProductToEdit,
            saveEditedProduct
        }} >
            { children }
        </productsContext.Provider>
    );
};

export default ProductsContextProvider;