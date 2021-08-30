import React from 'react'

export default function Reply(props) {
    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="bold">{props.reply.user}</div>
                    {props.reply.replyText}
                    <span className="d-block text-black-50">{props.reply.date}</span>
                </div>
            </li>
        </div>
    )
}
