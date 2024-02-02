import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import UserEdit from './UserEdit';


function UserList() {

  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
    
  // Fetch Data Initial
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  };


  // Handle Edit User
  const openEditModal = (user) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditModalVisible(false);
  };

  const submitEditForm = async (name,username, email) => {
    const updatedUser = { ...editingUser, name,username, email };

    await fetch(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
          setUsers((users) =>
            users.map((user) => (user.id === editingUser.id ? updatedUser : user))
          );
          closeEditModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle Info
  const navigate = useNavigate();

  const handleInfoClick = (user) => {
    navigate(`/info/${user.id}`, { state: { user } });
  };


  // Handle Add User
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const submitForm = async (name,username, email) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        username:username,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
          closeModal();
          return res.json();
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className='container d-flex justify-content-center align-items-center '>
        <div className='users-container bg-light'>
            <div className='row users-head'>
                <div className="col-9"><h4 className='text-dark'>User List</h4></div>
                <div className="col">
                    <button type='button' className='btn btn-primary'  onClick={openModal}>Add</button>                   
                </div>
            </div>
            <UserForm
              showModal={modalVisible}
              onClose={closeModal}
              onSubmit={submitForm}           
            />

            {
              users.map((user)=>(
              <div key={user.id} className='row users-block justify-content-center align-items-center'>
                <div className="col-5 users-name">
                  <p className='text-wrap'>{user.name}</p>
                </div>

                <div className="col-2">
                        <button type='button' onClick={() => handleInfoClick(user)} className='btn btn-light'>Info</button>
                </div>

                <div className="col-2">
                    <button type='button'   onClick={() => openEditModal(user)} className='btn btn-secondary'>Edit</button>
                </div>
                
                <div className="col-3">
                    <button type='button' onClick={() => handleDelete(user.id)} className='btn btn-danger'>Delete</button>
                </div>
              </div>    
              ))
            }
            <UserEdit
                    showModal={editModalVisible}
                    onClose={closeEditModal}
                    onSubmit={submitEditForm}
                    defaultName={editingUser?.name || ''}
                    defaultUsername={editingUser?.username || ''}
                    defaultEmail={editingUser?.email || ''}
            />
        </div>
    </div>
  )
}

export default UserList