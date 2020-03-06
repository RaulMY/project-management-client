// components/projects/EditProject.js

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const EditProject = props => {

const history = useHistory();
  const [ formState, updateFormState ] = useState({
      title: props.theProject.title,
      description: props.theProject.description
  })

  const handleFormSubmit = (event) => {

    event.preventDefault();

    axios.put(`${process.env.REACT_APP_API_URL}/projects/${props.theProject._id}`, formState, {withCredentials:true})
    .then( () => {
        props.getTheProject();
        // after submitting the form, redirect to '/projects'
        history.push('/projects');    
    })
    .catch( error => console.log(error) )
  }

  const handleChange = (event) => {  
    const { name, value } = event.target;
    updateFormState(Object.assign({}, formState, {[name]: value}))
  }

    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={formState.title} onChange={e => handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={formState.description} onChange={e => handleChange(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
}

export default EditProject;