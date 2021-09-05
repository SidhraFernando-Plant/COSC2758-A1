import avatar from '../img/avatar.svg'
import edit from '../img/edit.svg'
import trash from '../img/delete.svg'
import {deleteUser, editUser, setUser, getAvatar, setAvatar, userExists} from "../data/userRepository";
import {deletePostsByUser, updatePostsByUser} from "../data/postRepository";
import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

// props: username (str), email (str), dateJoined(str)
//Show user their profile details and allow them to edit some details
function MyProfile(props) {
  var username = null;
  var email = null;
  
  //track whether a user is editing their profile or not and change display accordingly
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(getAvatar(props.username));
  //Secured page: only allow access if user is logged in
  useEffect(() => {
    if(props.username===null||props.username==="") {
      window.location.href = "/login";
    }
  });

  // Params: newUsername (string)  | Return: none
  // when input newUsername is entered into textarea field, update username
  function setUsernameInput(newUsername) {
      username = newUsername;
  }

  // Params: newEmail (string)  | Return: none
  // when input newEmail is entered into textarea field, update email
  function setEmail(newEmail) {
      email = newEmail;
  }
  

  // delete the current users profile and log them out
  function deleteProfile() {
    if(window.confirm('Are you sure you want to delete your account?')) {
          deleteUser(props.username);
          deletePostsByUser(props.username);
          props.logoutUser();
          //Navigate back to home screen
          props.history.push("/");
        }
    }
    
    //change state editing to true and allow user to edit their profile
    function editProfile() {
        setEditing(true);
    }
    
    //change state editing to false and change profile information to read-only
    function cancelEdit() {
      setEditing(false);
    }

    // Params: newUsername (string), newEmail (string)  | Return: none
    // update a user's profile record in local storage with information entered in input fields
    function updateProfile(newUsername, newEmail) {
      if(userExists(newUsername)) {
        alert("Bad luck! That username is already taken");
        setEditing(false);

      }
      else {
        editUser(props.username, newUsername, newEmail);
        props.loginUser(newUsername, newEmail, props.dateJoined);
        setUser(newUsername, newEmail, props.dateJoined);
        updatePostsByUser(props.username, newUsername);
        //change back to read-only
        setEditing(false);
      }
    }
    
    return (
      <div  className="full-height">
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Upload image
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ImageUpload username={props.username} />
              </div>
              
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center profile-title">
          <h2 className="m-0 mr-2">{props.username}'s profile</h2>
          <img
            src={edit}
            className="profile-actions"
            onClick={editProfile}
          ></img>
          <img
            src={trash}
            className="profile-actions"
            onClick={deleteProfile}
          ></img>
        </div>
        <div className="profile-details d-flex flex-column rounded mt-3 bg-grey justify-content-start">
          <div className="d-flex align-items-center profile-header">
            <div className="d-flex flex-column">
              {/* assign default avatar if user has not uploaded one */}
              {avatarUrl == "" ? (
                <img src={avatar} className="avatar rounded-circle bg-light"></img>
              ) : (
                <img src={avatarUrl} className="avatar rounded-circle"></img>
              )}
            </div>
            {!editing ? (
              <div>
                <h3 className="m-0 ml-2">{props.username}</h3>
                <a
                  className="m-0 ml-2 text-muted"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Update avatar
                </a>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={props.username}
                  className="form-control"
                  id="newUsername"
                  placeholder="Enter new username"
                  onChange={(e) => setUsernameInput(e.target.value)}
                ></input>
              </>
            )}
            {}
          </div>
          {!editing ? (
            <span className="profile-info text-light">
              Email: {props.email}
            </span>
          ) : (
            <>
              <input
                type="email"
                value={props.email}
                className="form-control"
                id="newEmail"
                placeholder="Enter new email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </>
          )}
          {/* user cannot edit the date that they joined, so it is not displayed in editing mode */}
          {!editing ? (
            <span className="profile-info mt-0 text-light">
              Vibing since {props.dateJoined}
            </span>
          ) : (
            <>
              <div className="m-auto">
                <button
                  type="submit"
                  onClick={cancelEdit}
                  className="mt-3 btn btn-outline-primary d-inline rounded-3"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  onClick={() => updateProfile(username, email)}
                  className="mt-3 ml-3 btn btn-primary d-inline"
                >
                  UPDATE
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
export default MyProfile;