import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [idToDelete, setIdToDelete] = useState();
  const [id, setId] = useState();
  const [firstname, setFirstName] = useState();
  const [surname, setSurname] = useState();
  const [server, setServer] = useState([])

  const handleInsert = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const data = {
      id: parseInt(id),
      firstname: firstname,
      surname: surname
    }

    const response = await fetch("http://localhost:8001/api/users", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    if (response.ok) {
      serverResponse();
    }
  }

  const handleUpdate = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const data = {
      id: id ? parseInt(id) : "",
      firstname: firstname !== "" ? firstname : "",
      surname: surname  !== "" ? surname : ""
    }

    const response = await fetch("http://localhost:8001/api/users/update", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    })

    if (response.ok) {
      serverResponse();
    }
  }

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      id: parseInt(idToDelete)
    }

    const response = await fetch("http://localhost:8001/api/users/delete", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    })

    if (response.ok) {
      serverResponse();
    }
  }

  async function serverResponse () {
    const response = await fetch("http://localhost:8001/api/users")
    console.log("status code", response)
    const data = await response.json();
    console.log("data", data)
    setServer(data)
  }

  useEffect(() => {
    serverResponse();
  }, [])

  return (
    <div className="App">
      <div className='content'>
      <div className="forms">
        <div className="form-container">
          <form onSubmit={(e) => handleInsert(e)} className='insert-user'>
            Insert a new user
            <input type='integer' placeholder='ID of user' onChange={(e) => { setId(e.target.value) }}></input>
            <input type='text' placeholder='First-Name' onChange={(e) => { setFirstName(e.target.value) }}></input>
            <input type='text' placeholder='Surname' onChange={(e) => { setSurname(e.target.value) }}></input>
            <input type='submit'></input>
          </form>

          <form onSubmit={(e) => handleUpdate(e)} className='update-user'>
            Modify a user
            <input type='integer' placeholder='ID of user' onChange={(e) => { setId(e.target.value) }}></input>
            <input type='text' placeholder='Name' onChange={(e) => { setFirstName(e.target.value) }}></input>
            <input type='text' placeholder='Surname' onChange={(e) => { setSurname(e.target.value) }}></input>
            <input type='submit'></input>
          </form>
          <form onSubmit={(e) => handleDelete(e)} className='delete-user'>
            Delete a user
            <input type='integer' placeholder='ID of user' onChange={(e) => { setIdToDelete(e.target.value) }}></input>
            <input type='submit'></input>
          </form>
        </div>
      </div>
      <div className="view-users">
          <div className='id'>ID</div>
          <div className='name'>Name</div>
          <div className='surname'>Surname</div>
          {server.map(item => {
            return (
              <>
                <div className='id-rowdata'>{item.id}</div>
                <div className='first-rowdata'>{item.firstname}</div>
                <div className='surname-rowdata'>{item.surname}</div>
              </>
            )
          })}
        </div>
        </div>
    </div>
  );
}

export default App;
