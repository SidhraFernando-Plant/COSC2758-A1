import React from 'react'
import PostPreview from './PostPreview'
import { createReply, getReplies, getPostById } from '../data/repository';
import { useLocation, useParams } from 'react-router-dom';
import Reply from './Reply';
import { useState, useEffect } from 'react';


export default function PostInspect(props) {
    useEffect(() => {
        if(props.username===null||props.username==="") {
          window.location.href = "/login";
        }
    });

    var sample = {post: "fourth post", user: "Anotheruser", date: "Mon Aug 30 2021", id: 4};
    const { id } = useParams();
    var post = getPostById(parseInt(id));
    var replyText;
    function setReplyText(newText) {
        replyText = newText;
    }

    function makeReply(textPost) {
        var today = new Date();
        today = today.toDateString();
        createReply(replyText, props.username, today, id);
        setReplies(getReplies(parseInt(id)));
        document.getElementById("reply-input").value = "";
    }
    const [replies, setReplies] = useState(getReplies(parseInt(id)));
    return (
        <div>
            <p className="align-body"><a href="/posts" className="text-dark">← Back to forum</a></p>
            <div className="post m-auto">
            <div className="mt-3">
                <PostPreview post={post} showReplies={false}/>
            </div>
            <div className="d-flex justify-content-between align-items-center m-auto">
              <h2>Replies</h2>
                <button className="btn bg-grey white-hover dark-button" type="button" data-toggle="collapse" data-target="#collapseExample" ar aria-expanded="false" aria-controls="collapseExample">
                  + New reply
                </button>
              </div>
              <div className="collapse" id="collapseExample">
            <div className="card card-body mb-3">
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Share your thoughts...</label>
                    <textarea id="reply-input" className="form-control" rows="3" onChange={e => setReplyText(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn btn-1 d-inline post-button" data-toggle="collapse" data-target="#collapseExample" ar aria-expanded="false" aria-controls="collapseExample" onClick={() => makeReply(replyText)}>Submit</button>
                </div>
                
        </div>
            </div>
                
                <div className="post m-auto">
                
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
                
                </div>
        </div>
    )
}
