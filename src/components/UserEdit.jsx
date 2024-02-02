import React from 'react'

  const UserEdit = ({ showModal, onClose, onSubmit, defaultName, defaultUsername, defaultEmail  }) => {

    const handleOnSubmit = (e) => {
      e.preventDefault();
      onSubmit(e.target.name.value, e.target.username.value, e.target.email.value);
    }

  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <p className="close" onClick={onClose}>&times;</p>

        <form onSubmit={handleOnSubmit}>
          <input className='modal-input' type="text" id="name" name="name"   placeholder='Name' defaultValue={defaultName} />

          <input className='modal-input' type="text" id="username" name="username" v placeholder='Username' defaultValue={defaultUsername}  />

          <input className='modal-input' type="email" id="email" name="email" placeholder='Email' defaultValue={defaultEmail} />

          <button type="submit" className='btn btn-outline-primary' onSubmit={handleOnSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit