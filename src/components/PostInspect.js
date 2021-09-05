import React from 'react'
import PostPreview from './PostPreview'
import { createReply, getReplies, getPostById } from '../data/postRepository';
import { useLocation, useParams } from 'react-router-dom';
import Reply from './Reply';
import { useState, useEffect } from 'react';
import CollapsibleForm from './CollapsibleForm';

//props: username (str), 
//Display a post with all of its replies, and allow user to submit a reply
export default function PostInspect(props) {
    //Retrieve the id of the post to be displayed from the URL
    const { id } = useParams();
    var post = getPostById(parseInt(id));
    var replyText;
    const [replies, setReplies] = useState(getReplies(parseInt(id)));
    
    //Secured page: only allow access if user is logged in
    useEffect(() => {
        if(props.username===null||props.username==="") {
          window.location.href = "/login";
        }
    });

    // Params: newText (string)  | Return: none
    // when input newText is entered into textarea field, update replyText
    function setReplyText(newText) {
        replyText = newText;
    }

    // Params: newReplyText (string)  | Return: none
    // submit a reply with text newReplyText to the post being displayed
    function makeReply(newReplyText) {
        var today = new Date();
        today = today.toDateString();
        createReply(newReplyText, props.username, today, id);
        setReplies(getReplies(parseInt(id)));
        //clear input field
        document.getElementById("reply-input").value = "";
    }
    
    return (
      <div  className="full-height">
        <p className="align-body">
          <a href="/posts" className="text-dark">
            ← Back to forum
          </a>
        </p>
        <div className="post m-auto">
          <div className="mt-3">
            <PostPreview post={post} showReplies={false} />
          </div>
        </div>
        <CollapsibleForm
          heading="Replies"
          formTitle="+ New reply"
          txtAreaLabel="Share your thoughts..."
          handleSubmit={makeReply}
        />

        <div className="post m-auto">
          {replies != null && replies.length != 0 ? (
            replies.map(function (reply) {
              return <Reply reply={reply} />;
            })
          ) : (
            <>
              <p>There aren't any replies yet... be the first!</p>
            </>
          )}
        </div>
      </div>
    );
}
