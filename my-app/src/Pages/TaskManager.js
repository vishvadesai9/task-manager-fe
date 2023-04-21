import React, {useState} from 'react';
// import './Pages/styles.css';
import moment from 'moment';
import { Button } from "@material-ui/core";
import TaskModal from '../../src/Pages/Form';

let user_id = "";
let isEdit = false;
let userTask = new Object();

const TaskManager = () =>  {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if(reason !== 'backdropClick') {
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
            <div><Button variant="contained" color="primary" onClick={handleOpen}>Create Task</Button>
            <TaskModal open={open} onClose={handleClose} className="modal" user_id={user_id} isEdit={isEdit} userTasks={userTask}/>
          <table>
            <caption>Tasks</caption>
            <thead>
              <tr>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort('title')}
                    className={getClassNamesFor('title')}
                  >
                    Title
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
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>{item.due_date}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        );
      };

      return (
        <div className="App">
          <TaskViewer
            products={[
              { id: 1, title: 'Task1', description: "description", status: "DONE", due_date: moment(new Date("2016-01-02 10:34:23")).format('MM-DD-YYYY') },
              { id: 2, title: 'Task2', description: "description", status: "TO DO", due_date: moment(new Date("2017-01-04 10:34:23")).format('MM-DD-YYYY') },
              { id: 3, title: 'Task3', description: "description", status: "IN_PROGRESS", due_date: moment(new Date("2018-01-04 10:34:23")).format('MM-DD-YYYY') },
              { id: 4, title: 'Task4', description: "description", status: "IN_PROGRESS", due_date: moment(new Date("2019-01-04 10:34:23")).format('MM-DD-YYYY') },
              { id: 5, title: 'Task5', description: "description", status: "TO DO", due_date: moment(new Date("2015-01-04 10:34:23")).format('MM-DD-YYYY') },
              { id: 6, title: 'Task6', description: "description", status: "DONE", due_date: moment(new Date("2011-01-04 10:34:23")).format('MM-DD-YYYY') },
              { id: 7, title: 'Task7', description: "description", status: "TO DO", due_date: moment(new Date("2026-01-04 10:34:23")).format('MM-DD-YYYY') },
            ]}
          />
        </div>
      );
      

}

export default TaskManager