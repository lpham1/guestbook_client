import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Post from './components/post'
const MyModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState('')
  const [content, setcontent] = useState('')
  const [posts, setPosts] = useState([])

  const baseURL = 'http://127.0.0.1:8000/notes/'

  const createNote = async (event) => {
    event.preventDefault()
    const new_request = new Request(
      'http://127.0.0.1:8000/notes/',
      {
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'Application/Json'
        },
        method: 'POST',
      }
    );

    const response = fetch(new_request);
    if (response.ok) {
      // console.log(data)
    }
    else {
      console.log(response.status)
      console.log("Failed Network request")
    }

    setTitle('')
    setcontent('')
    setShow(false)
    getAllPosts()
  }

  const getAllPosts = async () => {
    const response = await fetch('http://127.0.0.1:8000/notes/')
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      setPosts(data)
    }
    else {
      console.log(response.status)
      console.log("Failed Network request")
    
    }
  }
  // const response = await fetch(`${baseURL}`)
  // const responseClone= response.clone(); // 1
  // fetch(`${baseURL}`)
  //   .then(function (response) {
  //      // 2
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     // Do something with data
  //     console.log(data)
  //     setPosts(data)
  //   }, function (rejectionReason) { // 3
  //     console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
  //     responseClone.text() // 5
  //       .then(function (bodyText) {
  //         console.log('Received the following instead of valid JSON:', bodyText); // 6
  //       });
  //   });

  

  useEffect(
    () => {
      getAllPosts();
    }, []
  )

  const deleteItem= async (noteId) => {
    console.log(noteId)

    const response = await fetch(`${baseURL}/${noteId}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      console.log(response.status)
    }

    getAllPosts()
  }

  return (
    <><div className='row d-flex justify-content-center'>
      <div className='col-12 mb-2'>
        <Button variant="dark" onClick={handleShow}>
          Add note
        </Button>
      </div>
      <div className='col-12 flex-fill'>
        {posts.length > 0 ?
          (<div className='posts'>
            {posts.map((item) => (
              <Post
                key={item.id}
                title={item.title}
                content={item.content}
                onClick={deleteItem(item.id)}
              />
            )
            )
            }
          </div>)
          : (
            <div>
              <p>No note created</p>
            </div>
          )}
      </div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">New note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className='form-group'>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} className="form-control" />

            </div>
            <div className='form-group'>
              <label htmlFor="content">content</label>
              <textarea name='content' id="" cols="30" rows="10" className='form-control'
                value={content}
                onChange={(e) => setcontent(e.target.value)} />
            </div>

          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <input type="submit" value="Save" className='btn btn-primary' onClick={createNote} />
        </Modal.Footer>
      </Modal><style jsx='true'>{`
        label{
          font-size: 20px;
        }
        .form-control{
          width: 100%;
        }
        .form-group{
          margin: 20px;
        }
        .posts:hover{
          transform: scale(1.1)
        }
      `}</style>
    </div >
    </>

  );
}

export default MyModal;