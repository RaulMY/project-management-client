// components/projects/ProjectDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';
import EditProject from './EditProject';
import AddTask from '../tasks/AddTask';

const ProjectDetails = (props) => {


  const history = useHistory();
  const { id } = useParams();

  useEffect(()=>{
      getSingleProject()
  }, []);

  const [ theProject, updateProject ] = useState({
      _id: '',
      title: '',
      description: '',
      tasks: []
  });

  const getSingleProject = () => {
      axios.get(`${process.env.REACT_APP_API_URL}/projects/${id}`, {withCredentials:true})
      .then( responseFromApi =>{
          updateProject(responseFromApi.data)
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  const renderEditForm = () => {
    if(!theProject.title){
      getSingleProject();
    } else {                                                                                  
      return (<EditProject theProject={theProject} getTheProject={getSingleProject} {...props} />)
    }
  }

  const deleteProject = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/projects/${id}`, {withCredentials:true})
    .then( () =>{
        history.push('/projects'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }


  const ownershipCheck = (project) => {
      console.log(project)
      console.log(props.loggedInUser)
    if(props.loggedInUser && project.owner == props.loggedInUser._id) {
      return (
        <div>
            {/* show the task heading only if there are tasks */}
            { theProject.tasks && theProject.tasks.length > 0 && <h3>Tasks </h3> }
            {/* map through the array of tasks and... */}
            { theProject.tasks && theProject.tasks.map((task, index) => {
                return(
                    <div key={ index }>
                    {/* ... make each task's title a link that goes to the task details page */}
                        <Link to={`/projects/${theProject._id}/tasks/${task._id}`}> 
                            { task.title }
                        </Link>
                    </div>
                )
                
            }) }
          <div>{renderEditForm()} </div>
          <button onClick={() => deleteProject(theProject._id)}>Delete project</button>
            <br/>
            <div>{renderAddTaskForm()} </div>
        </div>
      )
    }
  }
  const renderAddTaskForm = () => {
    if(!theProject.title){
        getSingleProject();
      } else {
        return <AddTask theProject={theProject} getTheProject={getSingleProject} />
      }
  }

  return(
    <div>
      <h1>{theProject.title}</h1>
      <p>{theProject.description}</p>
      <div >
        {ownershipCheck(theProject)}
      </div>
      <Link to={'/projects'}>Back to projects</Link>
    </div>
  )
}

export default ProjectDetails;