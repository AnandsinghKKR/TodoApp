import React, { useEffect, useState } from 'react'
import Header from './partials/Header.jsx'
import Todo from './partials/Todo.jsx'
import AddTodoModal from './partials/AddTodoModal.jsx'
import { getTodoListApi, getToken } from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify";


function Home() {
  const navigation =useNavigate();
  const [list,setList]=useState([]);
  const [refreshList,setRefreshList]=useState()
  // protection for user that is not logged in
  useEffect(()=>{
    if(!getToken()){
      navigation("/login");
    }
    fetchTodoList();
  },[refreshList])

  async function fetchTodoList(){
    const result=await  getTodoListApi();
    console.log(result.data.data.todos)
    if(result.status===200 && result.data.status===200){
      setList(result.data.data.todos.reverse());
    }
  }

  return (
    <div>
      <Header/>
      <ToastContainer/>
      <div className='container'>
        <div className='row justify-contenty-md-center  mt-4 '>
          {
            list.map((todo,index)=><Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
          }
       

        </div>
      </div>
      <div className='' style={{position:"fixed" , right:50 ,bottom:50,zIndex:1030}}>
        <button type='button' data-bs-toggle="modal" 
        data-bs-target="#exampleModal" className='btn btn-outline-light'> 
            Add
         </button>
      </div>
    <AddTodoModal setRefreshList={setRefreshList}/>
    </div>
  )
}

export default Home
