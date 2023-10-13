
import { Link } from 'react-router-dom';
import './App.css'

function App() {
  const handleAddUser=event=>{
    event.preventDefault();
    const form=event.target;
    const name=form.name.value;
    const email=form.email.value;
    const user={name,email}
    console.log(user)
    fetch('http://localhost:5000/users',{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.insertedId)
        alert("user added successfully")
      form.reset();
    })
  }

  return (
    <>
      <h1>Simple CRUD</h1>
      <form onSubmit={handleAddUser} className='display:flex;'>
          <input type='text' name="name" id="name"/>
          <br></br>
          <input type='text' name="email" id="email"/>
          <input type='submit' value="Add User"/>
          <Link to="/users">
            <button>
              Show All Users
            </button>
          </Link>
      </form>
    </>
  )
}

export default App
