import avatar from '../img/avatar.svg'
import edit from '../img/edit.svg'
import trash from '../img/delete.svg'
import {deleteUser, editUser, setUser, getAvatar, setAvatar} from "../data/repository";
import { useState } from 'react';
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
  
      <div className="d-flex align-items-center justify-content-center">
        <h2 className="m-0 mr-2">{props.username}'s profile</h2>
        <img src={edit} className="profile-actions" onClick={editProfile}></img>
        <img src={trash} className="profile-actions" onClick={deleteProfile}></img>
      </div>
      <div className="profile-details d-flex flex-column bg-light rounded mt-3 border justify-content-between">
        <div className="d-flex align-items-center">
            <div className="d-flex flex-column">
            {avatarUrl==""
            ?
            <img src={avatar} className="avatar"></img>
            :
            <img src={avatarUrl} className="avatar"></img>
            }
              
            </div>
            {!editing
                ?
                <h2 className="ml-2">{props.username}</h2>
                :
                <>
                  <input type="text" value={props.user} className="form-control" id="newUsername" placeholder="Enter new username" onChange={e => setUsernameInput(e.target.value)}></input>
                </>
              }
            {//<h2 className="ml-2">{props.username}</h2>
            }
        </div>
        {!editing
          ?
          <span className="ml-2">Email: {props.email}</span>
          :
          <>
            <input type="email" value={props.email} className="form-control" id="newEmail" placeholder="Enter new email" onChange={e => setEmail(e.target.value)}></input>
          </>
        }
        {//<span className="ml-2">Email: {props.email}</span>
}
        {!editing
          ?
          <span className="ml-2">Joined on: {props.dateJoined}</span>
          :
          <>
            <div className="m-auto">
              <button type="submit" onClick={cancelEdit} className="mt-3 btn btn-outline-primary d-inline">CANCEL</button>
              <button type="submit" onClick={() => updateProfile(username, email)} className="mt-3 ml-3 btn btn-primary d-inline">UPDATE</button>
              
            </div>
          </>
        }
        <button type="submit" onClick={updateAvatar} className="mt-3 btn btn-outline-primary d-inline">Update avatar</button>

      </div>
    <ImageUpload username={props.username}/>    
    </div>
    );
  }
export default MyProfile;