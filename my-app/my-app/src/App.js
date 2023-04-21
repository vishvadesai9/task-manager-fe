import React, {useState} from 'react';
import './styles.css';

import moment from 'moment'
import { Button } from "@material-ui/core"
import TaskModal from './Pages/Form'

let isEdit = false
let userTask = new Object()

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
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if(reason !== 'backdropClick') {
      setOpen(false);
  }
  };
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <div>
    <Button variant="contained" color="primary" onClick={handleOpen}>Create Task</Button>
    <TaskModal open={open} onClose={handleClose} className="modal" user_id="d187d4ec-2a93-468b-b2ca-72609f6ae92e" isEdit={isEdit} userTasks={userTask}/>    
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
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.status}</td>
            <td>{item.dueDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};



export default function App() {
  
  return (
    <div className="App">
    

      <TaskViewer
        products={[
          { id: 1, title: 'Task1', status: "DONE", dueDate: moment(new Date("2016-01-02 10:34:23")).format('MM-DD-YYYY') },
          { id: 2, title: 'Task2', status: "TO DO", dueDate: moment(new Date("2017-01-04 10:34:23")).format('MM-DD-YYYY') },
          { id: 3, title: 'Task3', status: "IN_PROGRESS", dueDate: moment(new Date("2018-01-04 10:34:23")).format('MM-DD-YYYY') },
          { id: 4, title: 'Task4', status: "IN_PROGRESS", dueDate: moment(new Date("2019-01-04 10:34:23")).format('MM-DD-YYYY') },
          { id: 5, title: 'Task5', status: "TO DO", dueDate: moment(new Date("2015-01-04 10:34:23")).format('MM-DD-YYYY') },
          { id: 6, title: 'Task6', status: "DONE", dueDate: moment(new Date("2011-01-04 10:34:23")).format('MM-DD-YYYY') },
          { id: 7, title: 'Task7', status: "TO DO", dueDate: moment(new Date("2026-01-04 10:34:23")).format('MM-DD-YYYY') },
        ]}
      />
    </div>
  );
}
