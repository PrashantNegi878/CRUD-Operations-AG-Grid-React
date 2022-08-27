// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
// import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Grid,Button } from '@mui/material';
import FormDialog from './components/dialog';
// import { spacing } from '@mui/system';

const initialValue={
name:"",
age:"",
email:""};

function App() {

  const [formData,setFormData]=useState(initialValue);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  // const url="https://my-json-server.typicode.com/PrashantNegi878/JSONServerForAGGrid/users";

  const url = "https://awesome-aerial-verbena.glitch.me/users";
  // const [gridApi,setGridApi]= useState(null)
  const [rowData,setRowData] = useState(null)

  const colDefs=[
    {headerName:"ID", field:"id"},
    {headerName:"Name", field:"name"},
    {headerName:"Age", field:"age"},
    {headerName:"Email", field:"email"},
    {headerName:"Actions", field:"id",cellRendererFramework:(params)=>
    <div>
    <Button size="small" sx={{  mr: 1 }} variant="outlined" 
    onClick={()=>{handleUpdate(params.data)}} >Update</Button>
    <Button size="small" sx={{  ml: 1 }} variant="outlined" color="error" 
    onClick={()=>{handleDelete(params.value)}}
    >Delete</Button>
    </div>}
  ]

  const getUsers=()=>{
// change1
    fetch(url).then(res=>res.json()).then(res=>setRowData(res))
    
  }

  // const onGridReady=(params)=>{
  //     setGridApi(params);
  // }

  const defaultColDef={
    sortable:true,
    flex:1,
    filter:true,
    floatingFilter:true
  }

  const onChange=(e)=>{
    const {value,id}=e.target;
    // console.log(value);
    // console.log(id);

    setFormData({...formData,[id]:value});
  }

 // https://my-json-server.typicode.com/PrashantNegi878/JSONServerForAGGrid/blob/main/db.json

  const handleFormSubmit=(e)=>{
      // console.log("Submitting = "+formData.stringify());Change 2
      // if()
      e.preventDefault();

      formData.id?(fetch(url+`/${formData.id}`,{method:"PUT",body:JSON
      .stringify(formData),headers:{'content-type':"application/json"}})
      .then(resp=>resp.json()).then(resp=>getUsers(),handleClose(),setFormData(initialValue)))
      :(
      fetch(url,{method:"POST",body:JSON
      .stringify(formData),headers:{'content-type':"application/json"}})
      .then(resp=>resp.json()).then(resp=>getUsers(),handleClose(),setFormData(initialValue)))
  }

  const handleDelete=(id)=>{
    fetch(url+`/${id}`,{method:"DELETE"})
    .then(resp=>resp.json()).then(resp=>getUsers())
  }

  const handleUpdate=(data)=>{
    // console.log(data)
    setFormData(data);

    
    handleClickOpen();
    
    // fetch(url+`/${id}`,{method:"DELETE"})
    // .then(resp=>resp.json()).then(resp=>getUsers())
  }

  useEffect(()=>{
    getUsers();
  },[])

  return (
    <div className="App">
      <h1>CRUD Operations in AG-Grid</h1>
      <div className="ag-theme-alpine" style={{height: 400, width: "95%"}}>
      <Grid className="add-btn" align="right">
        <Button  variant="outlined" color="success"
        onClick={()=>{handleClickOpen()}} >Add User</Button>
      </Grid>
           <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              // onGridReady={onGridReady}
               />
       </div>
       <FormDialog open={open} handleClose={handleClose} data={formData}
        onChange={onChange} handleFormSubmit={handleFormSubmit}
       />
    </div>
    
  );
}

export default App;
