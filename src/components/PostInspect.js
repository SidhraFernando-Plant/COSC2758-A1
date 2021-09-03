import React from 'react'
import PostPreview from './PostPreview'
import { createReply, getReplies, getPostById } from '../data/postRepository';
import { useLocation, useParams } from 'react-router-dom';
import Reply from './Reply';
import { useState, useEffect } from 'react';
import CollapsibleForm from './CollapsibleForm';


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

    function makeReply(newReplyText) {
        var today = new Date();
        today = today.toDateString();
        createReply(newReplyText, props.username, today, id);
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
            
            </div>
            <CollapsibleForm heading="Replies" formTitle="+ New reply" txtAreaLabel="Let sidi know what you think..." handleSubmit={makeReply}/>
                
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
