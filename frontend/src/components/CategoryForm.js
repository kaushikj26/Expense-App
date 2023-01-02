import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { startAddCategory } from "../actions/categoriesAction";

const CategoryForm=(props)=>{
    const dispatch = useDispatch()
    const user = useSelector((state)=>{
        return state.users
    }) || {}
    const loginToken = JSON.parse(localStorage.getItem('token'))
    const [name, setName] = useState('')

    const handleChange=(e)=>{
        let attr = e.target.name
        if(attr === 'name'){
            setName(e.target.value)
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const clearForm=()=>{
            setName('')
        }
        const catData={
            name: name,
            // userId : user[0]._id
        }
        dispatch(startAddCategory(catData,clearForm,loginToken))
    }

    return(
        <div style={{display:'inline-block', paddingLeft:'50px'}}>
            <h4>Categories</h4>
            <form onSubmit={handleSubmit} style={{paddingLeft:'150px'}}>
                <input type='text'name='name' value={name} onChange={handleChange} placeholder='name' />

                <input type='submit' value='Add' />
            </form>
        </div>
    )
}

export default CategoryForm