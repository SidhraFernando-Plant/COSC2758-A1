import avatar from '../img/avatar.svg'
import edit from '../img/edit.svg'
import trash from '../img/delete.svg'
import {deleteUser, editUser, setUser, getAvatar, setAvatar} from "../data/repository";
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
function MyProfile(props) {
  var username = null;
  var email = null;

  function setUsernameInput(newUsername) {
      username = newUsername;
  }

  function setEmail(newEmail) {
      email = newEmail;
  }
    const [editing, setEditing] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(getAvatar(props.username));
    function deleteProfile() {
        //change to better alert
        //if(window.confirm('Are you sure you want to delete your account?')) {
            deleteUser(props.username);
            props.logoutUser();
            props.history.push("/");
        //}
    }
    function editProfile() {
        setEditing(!editing);
    }
    function cancelEdit() {
      setEditing(!editing);
    }
    function updateProfile(newUsername, newEmail) {
      editUser(props.username, newUsername, newEmail);
      props.loginUser(newUsername, newEmail, props.dateJoined);
      setUser(newUsername, newEmail, props.dateJoined);
      setEditing(!editing);
    }

    function updateAvatar() {

    }
    
    return (
    <div>
  
      <div className="d-flex align-items-center justify-content-center profile-title">
        <h2 className="m-0 mr-2">{props.username}'s profile</h2>
        <img src={edit} className="profile-actions" onClick={editProfile}></img>
        <img src={trash} className="profile-actions" onClick={deleteProfile}></img>
      </div>
      <div className="profile-details d-flex flex-column bg-light rounded mt-3 justify-content-start">
        <div className="d-flex align-items-center profile-header">
            <div className="d-flex flex-column">
            {avatarUrl==""
            ?
            <img src={avatar} className="avatar rounded-circle"></img>
            :
            <img src={avatarUrl} className="avatar rounded-circle"></img>
            }
              
            </div>
            {!editing
                ?
                <div>
                  <h3 className="m-0 ml-2">{props.username}</h3>
                  <p className="m-0 ml-2 text-muted">Update avatar</p>
                </div>
                :
                <>
                  <input type="text" value={props.user} className="form-control" id="newUsername" placeholder="Enter new username" onChange={e => setUsernameInput(e.target.value)}></input>
                </>
              }
            {
            }
        </div>
        {!editing
          ?
          <span className="profile-info">Email: {props.email}</span>
          :
          <>
            <input type="email" value={props.email} className="form-control" id="newEmail" placeholder="Enter new email" onChange={e => setEmail(e.target.value)}></input>
          </>
        }
        {
}
        {!editing
          ?
          <span className="profile-info mt-0">Vibing since {props.dateJoined}</span>
          :
          <>
            <div className="m-auto">
              <button type="submit" onClick={cancelEdit} className="mt-3 btn btn-outline-primary d-inline rounded-3">CANCEL</button>
              <button type="submit" onClick={() => updateProfile(username, email)} className="mt-3 ml-3 btn btn-primary d-inline">UPDATE</button>
              
            </div>
          </>
        }

      </div>
    <ImageUpload username={props.username}/>    
    </div>
    );
  }
export default MyProfile;