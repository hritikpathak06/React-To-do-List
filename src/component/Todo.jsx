import React from 'react';
import { useState } from 'react';
import Logo from '../images/logo.png'

const Todo = () => {
    const [inputdata, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [edititem, setEditItem] = useState();

    const addItems = () => {

        if (inputdata === '') {
            alert("Plzz Fill the data 😒!")
        } else if (inputdata && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === edititem) {
                        const data = { ...elem, name: inputdata }
                        return data;
                    }
                    return elem;
                })

            )
            setToggleSubmit(true)
            setInputData('')
            setEditItem(null)
        }
        else {
            const allInputData = { id: new Date().getTime().toLocaleString(), name: inputdata }
            setItems([...items, allInputData]);
            setInputData('');
        }
    }

    const deleteItems = (index) => {
        // console.log(id)
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        })
        setItems(updatedItems);
    }

    const editItems = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem)

        setToggleSubmit(false)
        setInputData(newEditItem.name)
        setEditItem(id)
    }



    const removeAll = () => {
        setItems([]);
    }


    return (
        <>
            <div className="main_div">
                <div className="child_div">
                    <figure>
                        <img src={Logo} alt="logo" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className="add_items">
                        <input
                            type="text"
                            placeholder='✍️ Add Items...'
                            value={inputdata}
                            onChange={(event) => {
                                setInputData(event.target.value)
                            }}
                        />
                        {
                            toggleSubmit ? <i
                                className='fas fa-plus'
                                title='Add Items'
                                onClick={addItems}
                            ></i> : <i
                                className='fas fa-edit'
                                title='Update Items'
                                style={{ fontSize: '2rem', cursor: 'pointer', color: 'whitesmoke' }}
                                onClick={addItems}
                            ></i>
                        }

                    </div>
                    <div className="show_items">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="each_item" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="button">
                                            <i
                                                className='fas fa-edit'
                                                title='Edit Items'
                                                onClick={() => editItems(elem.id)}
                                            ></i>
                                            <i
                                                className='fas fa-trash'
                                                title='Delete Items'
                                                onClick={() => deleteItems(elem.id)}
                                            ></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="btn_items">
                        <button
                            className='btn effect04'
                            onClick={removeAll}>Remove All</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
