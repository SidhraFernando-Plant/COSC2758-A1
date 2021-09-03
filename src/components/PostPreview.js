import React from 'react'
import edit from '../img/edit.svg'
import trash from '../img/delete.svg'
import {getAvatar} from "../data/userRepository";
import {editPost, deletePost} from "../data/postRepository";
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import avatar from '../img/avatar.svg'


export default function PostPreview(props) {
    const { id } = useParams();
    var pathName = "/view-post/" + props.post.id;
    var postText = null;
    var avatarUrl = getAvatar(props.post.user);
    const [editing, setEditing] = useState(false);
    const [showReplies, setShowReplies] = useState(props.showReplies);
    useEffect(() => {
        if(props.username===null||props.username==="") {
          window.location.href = "/login";
        }
    });

    function setPostInput(newText) {
        postText = newText;
    }
    function startDeletePost() {
        deletePost(props.post.id);
        window.location.reload();
    }
    
    function startEditPost() {
        setEditing(!editing);
        setShowReplies(!showReplies);
    }
    function updatePost() {
        editPost(props.post.id, postText);
        window.location.reload();
    }
    
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
                        {avatarUrl==""
                        ?
                        <img src={avatar} className="post-avatar border border-light rounded-circle"></img>
                        :
                        <img src={avatarUrl} className="post-avatar border border-light rounded-circle"></img>
                        }
                        
                        <div>
                        <h5 className="card-title text-light gradient-text">{props.post.user}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{props.post.date}</h6>
                        </div>
                    </div>
                        <div>
                            {props.post.user===props.username &&
                            <span>
                            <img src={edit} className="profile-actions" onClick={startEditPost} data-toggle="modal" data-target="#exampleModal"></img>  
                            <img src={trash} className="profile-actions" onClick={startDeletePost}></img>
                            </span>
                            }
                        </div>
                    </div>
                    
                    {!editing
                ?
                <p className="card-text text-light">{props.post.post}</p>
                :
                <>
                <textarea className="form-control mt-3" id="exampleFormControlTextarea1" rows="3" onChange={e => setPostInput(e.target.value)}>{props.post.post}</textarea>                
                <button type="submit" onClick={cancelEdit} className="mt-3 btn btn-outline-info d-inline text-light">CANCEL</button>
                <button type="submit" onClick={() => updatePost()} className="mt-3 ml-3 btn btn-1 d-inline">SAVE</button>
                </>
              }
                {showReplies &&
                    <Link className="bg-secondary rounded p-2 text-light" to={pathName}><u>↪Reply &#40;{props.post.replies.length} replies&#41;</u></Link>
                }
                
                </div>
            </div>
            
            
        </div>
    )
}
