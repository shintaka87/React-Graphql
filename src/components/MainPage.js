import React, { useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_TASKS } from '../queries';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_TASK, UPDATE_TASK } from '../queries';

import { DELETE_TASK } from '../queries';


const MainPage = () => {
    const {
        loading:loadingTask,
        data:dataTasks,
        error:errorTasks
    } = useQuery(GET_TASKS);
    const [tasks, setTasks] = useState([]);
    // const [selectedTask, setSelectedTask] = useState([]);
    // // const [editedTask, setEditedTask] = useState({id: '', title: ''});
    const [editedTask, setEditedTask] = useState();
    // const [id, setId] = useState(1);

    const [createTask] = useMutation(CREATE_TASK, {
        refetchQueries:[{ query: GET_TASKS}],
    });
    const [updateTask] = useMutation(UPDATE_TASK, {
        refetchQueries:[{ query: GET_TASKS}],
    });

    const [deleteTask] = useMutation(DELETE_TASK,{
        refetchQueries: [{ query: GET_TASKS}],
    });


  return (
    <>
       <input type="text" value={tasks} onChange={(event) => setTasks(event.target.value)}></input>
       <button onClick={
           editedTask
            ? async()=> {
                try{
                    await updateTask({
                        variables:{
                            id: editedTask,
                            title: tasks
                        },
                        });    
                         } catch(err){
                             alert(err.message);
                         }
                         setEditedTask("")
                         setTasks("")
            }
            : async() => {
                try{
                    await createTask({
                        variables:{
                            title: tasks
                        },
                        });    
                         } catch(err){
                             alert(err.message);
                         }
                         setTasks("")
       }}
       >{editedTask ? "Update": "Create"}</button>
        <ul>
           {/* {console.log(dataTasks)} */}
            { dataTasks && dataTasks.allTasks&&  dataTasks.allTasks.edges.map((task) =>(
                <li key={task.node.id}>
                    {task.node.title}
                   <div>
                       <button 
                       onClick={async () => {
                           try{
                               await deleteTask({
                                   variables: {
                                       id: task.node.id,
                                   },
                               });
                           }catch(err){
                               alert(err.message);
                           }
                       }

                       }
                    >Delete</button>
                    <button onClick={()=>{
                        setEditedTask(task.node.id);
                        setTasks(task.node.title);
                    }}>Edit</button>
                   </div>
                    </li>
                    ))}
        </ul>
        
    </>
  )
};

export default MainPage;