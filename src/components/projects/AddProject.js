// components/projects/AddProject.js

import React, { useState } from 'react';
import axios from 'axios';

const AddProject = props => {

    const [ formState, updateFormState ] = useState({
        title: '',
        description: ''
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        axios.post(`${process.env.REACT_APP_API_URL}/projects`, formState, {withCredentials:true})
        .then( () => {
            props.getData();
            updateFormState({title: "", description: ""})
        })
        .catch( error => console.log(error) )
    }

    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateFormState(Object.assign({}, formState, {[name]: value}))
    }


    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={formState.title} onChange={ e => handleChange(e)}/>
                <label>Description:</label>
                <textarea name="description" value={formState.description} onChange={ e => handleChange(e)} />
                
                <input type="submit" value="Submit" />
            </form>
        </div>
        )
}

export default AddProject;