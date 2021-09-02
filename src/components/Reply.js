import React from 'react'
import { getAvatar } from '../data/repository';
import avatar from '../img/avatar.svg'

export default function Reply(props) {
    var avatarUrl = getAvatar(props.reply.user);
    return (
        <div>
            <li className="list-group-item d-flex justify-content-start align-items-start">
            {avatarUrl==""
                ?
                    <img src={avatar} className="post-avatar"></img>
                :
                <img src={avatarUrl} className="post-avatar rounded-circle"></img>
            }
                <div className="ms-2">
                    <h4 className="m-0">{props.reply.user}</h4>
                    {props.reply.replyText}
                    <span className="d-block text-black-50">{props.reply.date}</span>
                </div>
            </li>
        </div>
    )
}
