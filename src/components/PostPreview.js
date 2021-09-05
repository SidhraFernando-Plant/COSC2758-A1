import React from 'react'
import edit from '../img/edit.svg'
import trash from '../img/delete.svg'
import {getAvatar} from "../data/userRepository";
import {editPost, deletePost} from "../data/postRepository";
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import avatar from '../img/avatar.svg'

//props: post (Object of type: post), showReplies (boolean), username (str)
//Display a post including user who made it, date posted, post text, replies (toggle with showReplies), and ability to edit/delete if user viewing is author
export default function PostPreview(props) {
    const { id } = useParams();
    //link to PostInspect component and pass id of this post in the URL, used in link to reply
    var pathName = "/view-post/" + props.post.id;
    var postText = null;
    var avatarUrl = getAvatar(props.post.user);
    //track whether a user is editing their post or not and change display accordingly
    const [editing, setEditing] = useState(false);
    const [showReplies, setShowReplies] = useState(props.showReplies);

    // Params: newText (string)  | Return: none
    // when input newText is entered into textarea field, update postText
    function setPostInput(newText) {
        postText = newText;
    }

    // delete the post with repository method
    function startDeletePost() {
        deletePost(props.post.id);
        window.location.reload();
    }
    
    //set editing to true to make post text editable, and remove link to replies while editing
    function startEditPost() {
        setEditing(!editing);
        setShowReplies(!showReplies);
    }
    
    //save edits made to post by saving postText as the new text for the post
    function updatePost() {
        editPost(props.post.id, postText);
        window.location.reload();
    }
    
    //change state editing to false and change post to read-only
    function cancelEdit() {
      setEditing(!editing);
      setShowReplies(!showReplies);
    }
      
    return (
      <div>
        <div className="card mb-2">
          <div className="card-body bg-grey rounded border-0">
            <div className="d-flex justify-content-between">
              <div class="d-flex">
                {/* assign default avatar if user has not uploaded one */}
                {avatarUrl == "" ? (
                  <img
                    src={avatar}
                    className="post-avatar border border-light rounded-circle bg-light"
                  ></img>
                ) : (
                  <img
                    src={avatarUrl}
                    className="post-avatar border border-light rounded-circle"
                  ></img>
                )}

                <div>
                  <h5 className="card-title text-light gradient-text">
                    {props.post.user}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {props.post.date}
                  </h6>
                </div>
              </div>
              <div>
                {/* allow editing/deleting if user is author of post*/}
                {props.post.user === props.username && (
                  <span>
                    <img
                      src={edit}
                      className="profile-actions"
                      onClick={startEditPost}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    ></img>
                    <img
                      src={trash}
                      className="profile-actions"
                      onClick={startDeletePost}
                    ></img>
                  </span>
                )}
              </div>
            </div>

            {/* if user is in editing mode, display post as input field to allow changes */}
            {!editing ? (
              <p className="card-text text-light">{props.post.post}</p>
            ) : (
              <>
                <textarea
                  className="form-control mt-3"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => setPostInput(e.target.value)}
                >
                  {props.post.post}
                </textarea>
                <button
                  type="submit"
                  onClick={cancelEdit}
                  className="mt-3 btn btn-outline-info d-inline text-light"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  onClick={() => updatePost()}
                  className="mt-3 ml-3 btn btn-1 d-inline"
                >
                  SAVE
                </button>
              </>
            )}
            {/* link to PostInspect and pass the id of this component in the URL */}
            {showReplies && (
              <Link
                className="bg-secondary rounded p-2 text-light"
                to={pathName}
              >
                <u>↪Reply &#40;{props.post.replies.length} replies&#41;</u>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
}
