import React, {useEffect, useState} from 'react';
// import './Pages/styles.css';
import moment from 'moment';
import { Button } from "@material-ui/core";
import TaskModal from '../../src/Pages/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

let user_id = "";
let isEdit = false;
let userTasks = [];
let userTask = new Object();

const TaskManager = () =>  {
  let [gettingTasks, setGettingTasks] = useState(false);

  const getTasks = async ()=> {
    try {
      setGettingTasks(true)
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
      const url = `https://task-manager-api-tcy9.onrender.com/tasks/?user_id=${user_id}`;
      let response = await fetch(url, requestOptions)
      let responseJson = await response.json()
      console.log(responseJson)
      if (responseJson.success){
        userTasks = responseJson.data
      }
      else{
        //error
      }
  } catch (error) {
    console.error(error);
  } finally {
    setGettingTasks(false)
  }
  } 

  const deleteTask = async (task_id)=> {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    const url = `https://task-manager-api-tcy9.onrender.com/tasks/${task_id}/`;
    let response = await fetch(url, requestOptions)
    getTasks();
  }

  useEffect(() => {
    getTasks();
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    
    setOpen(true);
  };

const openEditModel = (item) => {
  isEdit=true
  userTask = item
  handleOpen();
}

  const handleClose = (event, reason) => {
    if(reason !== 'backdropClick') {
      isEdit=false
      setTimeout(function(){
        getTasks();
     }, 2000);
      setOpen(false);
  }
  };

    const useSortableData = (items, config = null) => {
        const [sortConfig, setSortConfig] = React.useState(config);
      
        const sortedItems = React.useMemo(() => {
          let sortableItems = [...items];
          if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
              if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
              }
              if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
              }
              return 0;
            });
          }
          return sortableItems;
        }, [items, sortConfig]);
      
        const requestSort = (key) => {
          let direction = 'ascending';
          if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
          ) {
            direction = 'descending';
          }
          setSortConfig({ key, direction });
        };
      
        return { items: sortedItems, requestSort, sortConfig };
      };
      const TaskViewer = (props) => {
        
        const { items, requestSort, sortConfig } = useSortableData(props.products);
        const getClassNamesFor = (name) => {
          if (!sortConfig) {
            return;
          }
          return sortConfig.key === name ? sortConfig.direction : undefined;
        };
        return (
           <div>{ !gettingTasks ? (<div><Button variant="contained" color="primary" onClick={handleOpen}>Create Task</Button>
          <TaskModal open={open} onClose={handleClose} user_id={user_id} isEdit={isEdit} userTask={userTask}/>
          <table>
            <caption>Tasks</caption>
            <thead>
              <tr>
                <th>
                Title
                  <button
                    type="button"
                    onClick={() => requestSort('title')}
                    className={getClassNamesFor('title')}
                  >
                 
                  </button>
                </th>
                <th>
                  Description
                </th>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort('status')}
                    className={getClassNamesFor('status')}
                  >
                    Status
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort('dueDate')}
                    className={getClassNamesFor('dueDate')}
                  >
                    Due Date
                  </button>
                </th>
                <th> 
                    Edit/Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.task_id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>{item.due_date}</td>
                  <td>
                  <Button variant="contained" color="primary" onClick={() => openEditModel(item)}>Edit</Button>
                  <Button style={{marginLeft: "5px"}} onClick={() => deleteTask(item.task_id)}>Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </table></div>) : null}
          </div> 
            
        );
      };

      return (
        <div className="App">
        
          <TaskViewer
            products={userTasks} 
          />
        </div>
      );
      

}

export default TaskManager



