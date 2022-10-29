import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Post = ({title, content, onClick}) => {
 
  return (
    <div className='card mb-2'>
        <div className='p-3'> 
        <div className='note-header row'>
            <div className='col-6'>
        <p className = 'note-title'> {title}</p>
            </div>
            <div className='col-6 d-flex justify-content-end align-self-start'>
                <div className='row '>
        
                <button className = "col" onClick = {onClick}>Delete</button>
                </div>
            </div>
        </div>
            <div>
            <p className = 'note-content'> {content}</p>
            </div>
            </div>

        <style jsx = "true">
            {`.note-title{
                font-size: 18px;
                
                }
               .note-content{
                color: gray;
               } 
                `
            }
        </style>
    </div>

  );
}

export default Post;