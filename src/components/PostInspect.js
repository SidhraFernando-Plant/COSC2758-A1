import React from 'react'
import PostPreview from './PostPreview'
import { createReply, getReplies, getPostById } from '../data/repository';
import { useLocation, useParams } from 'react-router-dom';
import Reply from './Reply';

export default function PostInspect(props) {
    var sample = {post: "fourth post", user: "Anotheruser", date: "Mon Aug 30 2021", id: 4};
    const { id } = useParams();
    var post = getPostById(parseInt(id));
    var replies = getReplies(parseInt(id));
    var replyText;
    function setReplyText(newText) {
        replyText = newText;
    }

    function makeReply(textPost) {
        var today = new Date();
        today = today.toDateString();
        createReply(replyText, props.username, today, id);
    }

    return (
        <div>
            <h1>Post</h1>
            <div>
            <div className="card card-new-post">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{post.user}</h5>
                        
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">{post.date}</h6>
                    
                <p className="card-text">{post.post}</p>
                </div>
            </div>
            <h2 className="mt-3 mb-3">Replies</h2>
            <div className="card card-body card-new-post">
                <div className="form-group">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="m-0" for="exampleFormControlTextarea1">Type your reply...</label>
                        <button type="submit" className="btn btn-primary d-inline post-button" onClick={() => makeReply(replyText)}>Submit</button>
                    </div>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" onChange={e => setReplyText(e.target.value)}></textarea>
                    </div>
                    
                </div>
            </div>
                
                <div className="ml-4">
                <ol>
                {replies != null && replies.length!=0
                    ?
                    replies.map(function(reply){
                    return <Reply reply={reply}/>;
                })
                    :
                    <>
                    <p>There aren't any replies yet... be the first!</p>
                    </>
                }
                </ol>
                </div>
        </div>
    )
}
