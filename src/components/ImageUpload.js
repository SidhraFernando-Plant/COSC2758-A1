import React from 'react'
import { useState } from 'react';
import { setAvatar } from '../data/userRepository';

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

    if(file.size > 2097152){
        alert("File is too big!");
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


    var uploadField = document.getElementById("file");

    
  

    return (
        <div className="d-flex">
            {dataUri===''
            ?
            <div className="img-preview">
                Image preview will be shown here
            </div>
            :
            <img className="img-preview rounded-circle" src={dataUri} alt="avatar"/>
            }
            <div className="d-flex flex-column justify-content-between ml-3">
                <div className="alert alert-danger form-width m-auto" role="alert">
                    error
                </div>
                <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
                <button onClick={() => {saveAvatar()}} type="submit" class="btn btn-1">SAVE</button>
            </div>
        </div>
    )

}

