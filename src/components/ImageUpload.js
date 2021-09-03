import React from 'react'
import { useState } from 'react';
import { setAvatar } from '../data/userRepository';

// Params: file (file)  | Return: none
// convert uploaded file <file> into a base 64 blob url
const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
    })

// props: username (str) | User can upload an image that will be saved to localStorage, can be embedded into other components
export default function ImageUpload(props) {
    const [dataUri, setDataUri] = useState('')

    // Params: file (file)  | Return: none
    // when a file is uploaded to the file input, convert it to a base 74 blob url and store this blob in state dataUri
    const onChange = (file) => {
  
    if(!file) {
        setDataUri('');
        return;
    }
    //do not allow files bigger than 1MB
    if(file.size > 1048576){
        alert("File is too big!");
        return;
    }

    fileToDataUri(file)
        .then(dataUri => {
        setDataUri(dataUri)
        })
    }

    // Params: none  | Return: none
    // save the blob url in state daraUri in this users record in local storage to update their avatar
    // save function has not been passed with props as this resulted in issues when passing the blob to the function in parent component
    function saveAvatar() {
        setAvatar(props.username, dataUri);
        window.location.reload();
    }

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

