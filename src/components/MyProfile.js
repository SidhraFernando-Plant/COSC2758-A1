import avatar from '../img/avatar.svg'
import edit from '../img/edit.svg'
import trash from '../img/delete.svg'
import {deleteUser, editUser, setUser, getAvatar, setAvatar} from "../data/userRepository";
import {deletePostsByUser, updatePostsByUser} from "../data/postRepository";
import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

// props: username (str), email (str), dateJoined(str)
//Show user their profile details and allow them to edit some details
function MyProfile(props) {
  var username = null;
  var email = null;

  useEffect(() => {
    if(props.username===null||props.username==="") {
      window.location.href = "/login";
    }
  });

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
            deletePostsByUser(props.username);
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
      updatePostsByUser(props.username, newUsername);
      setEditing(!editing);
    }

    function updateAvatar() {

    }
    
    return (
    <div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Upload image</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ImageUpload username={props.username}/>
            </div>
            {/*<div class="modal-footer">
              <button type="button" class="btn btn-outline-dark text-grey white-hover dark-button" data-dismiss="modal">Close</button>
              <button type="button" class="btn bg-grey white-hover dark-button">Save changes</button>
            </div>*/}
          </div>
        </div>
      </div>
        
            <div className="d-flex align-items-center justify-content-center profile-title">
              <h2 className="m-0 mr-2">{props.username}'s profile</h2>
              <img src={edit} className="profile-actions" onClick={editProfile}></img>
              <img src={trash} className="profile-actions" onClick={deleteProfile}></img>
            </div>
            <div className="profile-details d-flex flex-column rounded mt-3 bg-grey justify-content-start">
              <div className="d-flex align-items-center profile-header">
                  <div className="d-flex flex-column">
                  {/* assign default avatar if user has not uploaded one */}
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
                        <a className="m-0 ml-2 text-muted" data-toggle="modal" data-target="#exampleModal">Update avatar</a>
                      </div>
                      :
                      <>
                        <input type="text" value={props.username} className="form-control" id="newUsername" placeholder="Enter new username" onChange={e => setUsernameInput(e.target.value)}></input>
                      </>
                    }
                  {
                  }
              </div>
              {!editing
                ?
                <span className="profile-info text-light">Email: {props.email}</span>
                :
                <>
                  <input type="email" value={props.email} className="form-control" id="newEmail" placeholder="Enter new email" onChange={e => setEmail(e.target.value)}></input>
                </>
              }
              {
      }
              {!editing
                ?
                <span className="profile-info mt-0 text-light">Vibing since {props.dateJoined}</span>
                :
                <>
                  <div className="m-auto">
                    <button type="submit" onClick={cancelEdit} className="mt-3 btn btn-outline-primary d-inline rounded-3">CANCEL</button>
                    <button type="submit" onClick={() => updateProfile(username, email)} className="mt-3 ml-3 btn btn-primary d-inline">UPDATE</button>
                    
                  </div>
                </>
              }

            </div>
    </div>
    );
  }
export default MyProfile;