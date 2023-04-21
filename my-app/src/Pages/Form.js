import React, { useState } from "react";
import { Button, Modal, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, CircularProgress } from "@material-ui/core";
import { Typography } from '@material-ui/core';

function TaskModal({ open, onClose, user_id, isEdit, userTask }) {

  const today = new Date().toISOString().slice(0, 10)
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [status, setStatus] = useState("To do");
  let [dueDate, setDueDate] = useState(new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)); // 2 days from today
  let [loading, setLoading] = useState(false);
  if (isEdit && userTask) {
    setTitle(userTask.title)
    setDescription(userTask.description)
    setStatus(userTask.status)
    setDueDate(new Date(userTask.due_date))

  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const requestOptions = {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user_id, title: title, description: description, status: status, due_date:dueDate })
      }
      const url = isEdit ? `https://task-manager-api-tcy9.onrender.com/tasks/${userTask.task_id}/` : 'https://task-manager-api-tcy9.onrender.com/tasks/';
      let response = await fetch(url, requestOptions)
      let responseJson = await response.json()
      console.log(responseJson)
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
    
    console.log({ title, description, status, dueDate });
    // Refresh to the task table page
    onClose();
  };

  return (
    <Modal 
        open={open} 
        onClose={onClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    >
    <div style={{ backgroundColor: 'white', padding: '0px', borderRadius: '5px', border: '2px', height: isEdit ? "75%" : "62%", width: "23em"}}>
      <form onSubmit={handleSubmit} >
      <div style={{ padding: "20px", backgroundColor:"#303f9f", color: "white",  borderRadius: '5px 5px 0px 0px'}}>
          <Typography variant="h6" gutterBottom>
          {isEdit ? 'Edit Task' : 'Create Task'}
          </Typography>
        </div>
        <div style={{ margin: "20px" }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
        <div style={{ margin: "20px" }}>
          <TextField label="Description"
              multiline
              minRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{ maxLength: 1000 }} 
              required
              />
        </div>
        <div style={{ marginTop: "10px", marginRight: "5%", display: "flex", alignItems: "flex-end", justifyContent: "end",
            fontSize: "12px" }}>{description.length} / 1000</div>
        {isEdit ? (
        <div style={{ margin: "20px"  }}>
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="To do">To do</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
            <FormHelperText>Select task status</FormHelperText>
          </FormControl>
        </div>
        ): null}
        <div style={{ margin: "20px" }}>
          <TextField type="date" label="Due Date" onChange={(e) => setDueDate(new Date(e.target.value))} defaultValue={dueDate.toISOString().slice(0, 10)} inputProps={{ min: today}}/>
        </div>
        <div style={{ margin: "20px"}}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Submit"}
          </Button>
          <Button type="close" variant="contained" color="secondary" style={{ marginLeft: "10px"}} disabled={loading}>
            Cancel
          </Button>
            </div>
      </form>
      </div>
    </Modal>
  );
}
export default TaskModal;
