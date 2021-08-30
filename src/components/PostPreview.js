import React from 'react'
import edit from '../img/edit.svg'
import trash from '../img/delete.svg'
import EditPostForm from './EditPostForm';
import {editPost, deletePost} from "../data/repository";
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';


export default function PostPreview(props) {
    const { id } = useParams();
    var pathName = "/view-post/" + props.post.id;
    var postText = null;
    const [editing, setEditing] = useState(false);
    function setPostInput(newText) {
        postText = newText;
    }
    function startDeletePost() {
        deletePost(props.post.id);
    }
    function startEditPost() {
        setEditing(!editing);
    }
    function updatePost() {
        editPost(props.post.id, postText);
        window.location.reload();
    }
    function cancelEdit() {
      setEditing(!editing);
    }
      
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{props.post.user}</h5>
                        <div>
                            {props.post.user===props.username &&
                            <span>
                            <img src={edit} className="profile-actions" onClick={startEditPost} data-toggle="modal" data-target="#exampleModal"></img>  
                            <img src={trash} className="profile-actions" onClick={startDeletePost}></img>
                            </span>
                            }
                        </div>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">{props.post.date}</h6>
                    {!editing
                ?
                <p className="card-text">{props.post.post}</p>
                :
                <>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setPostInput(e.target.value)}>{props.post.post}</textarea>                
                <button type="submit" onClick={cancelEdit} className="mt-3 btn btn-outline-primary d-inline">CANCEL</button>
                <button type="submit" onClick={() => updatePost()} className="mt-3 ml-3 btn btn-primary d-inline">SAVE</button>
                </>
              }
                    
                <Link to={pathName}>↪Reply &#40;{props.post.replies.length} replies&#41;</Link>
                </div>
            </div>
            
            
        </div>
    )
}
