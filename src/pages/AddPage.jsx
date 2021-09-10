import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { productsContext } from '../Contexts/ProductsContext';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router';

const AddPage = () => {
    const { addProdact } = useContext(productsContext)
    const [newProdact, setNewProdact] = useState ({
        title: "",
        price: "",
        photo: "",
        description: ""

    })
    function handleInputs(e) {
        let obj = {
            ...newProdact, [e.target.name] : e.target.value
        }
        setNewProdact(obj);
    }
    const history = useHistory()
    function handleClick() {
        if (!newProdact.title.trim() || !newProdact.price.trim() || !newProdact.photo.trim() || !newProdact.description.trim()) {
            return toast.warn('Заполните все поля!!!',
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
        addProdact(newProdact)
        setNewProdact(
            {
                title: "",
                price: "",
                photo: "",
                description: ""
        
            }
        )
            
           
                history.push("/")   
        
    }
    

    return (
        <div>
            <Form.Control value={newProdact.title} onChange={handleInputs} name="title" size="lg" type="text" placeholder="Ведите наименование продукта" />
            <Form.Control value={newProdact.price} onChange={handleInputs} name="price" size="lg" type="text" placeholder="Ведите цену продукта" />
            <Form.Control value={newProdact.photo} onChange={handleInputs} name="photo" size="lg" type="text" placeholder="Ведите изображение продукта" />
            <Form.Control value={newProdact.description} onChange={handleInputs} name="description" size="lg" type="text" placeholder="Ведите описание продукта" />
            <Button onClick={handleClick} variant="dark">Добавить</Button>{' '}
            <ToastContainer /> 
        </div>
    );
};

export default AddPage;