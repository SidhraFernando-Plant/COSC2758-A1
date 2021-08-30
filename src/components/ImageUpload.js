import React from 'react'
import { useState } from 'react';
import { setAvatar } from '../data/repository';

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
    })

export default function ImageUpload(props) {
    const [dataUri, setDataUri] = useState('')

    const onChange = (file) => {
  
    if(!file) {
        setDataUri('');
        return;
    }

    fileToDataUri(file)
        .then(dataUri => {
        setDataUri(dataUri)
        })
    }

    function saveAvatar() {
        setAvatar(props.username, dataUri);
        window.location.reload();
    }
  

    return (
        <div>
            
            <img width="200" height="200" src={dataUri} alt="avatar"/>
            <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
            <button onClick={() => {saveAvatar()}} type="submit" class="btn btn-primary m-auto">SAVE</button>
        </div>
    )

}

