import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc  } from "firebase/firestore";
import { useState } from 'react';
import { getStorage, ref, deleteObject } from "firebase/storage";



const Comment = ({commentObj, isOwner})=>{
  const [edit,setEdit] =useState(false);
  const [comment,setComment] = useState(commentObj.comment);

  console.log(commentObj);
  const deleteComment = async()=> {
    const storage = getStorage();

    const deleteConfirm = window.confirm('정말 삭제할까요?');
    if(deleteConfirm){
      await deleteDoc(doc(db, "comments", commentObj.id));

      if(commentObj.image !== ''){
         // Create a reference to the file to delete
        const desertRef = ref(storage, commentObj.image);

        // Delete the file
        deleteObject(desertRef).then(() => {
        alert('글이 삭제 되었습니다.')
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      }
     
    }
  }

  const toggleEditMode = ()=>{
    setEdit(prev=>!prev);
  }
  const onSubmit = async (e)=>{
    e.preventDefault();
    const commentRef = doc(db, "comments", commentObj.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(commentRef, {
      comment: comment
    });
    setEdit(false);

  }
  const onChange = (e)=>{
    //입력한 내용을 comment에 반영
    setComment(e.target.value)
  }
  return (
      <ListGroup.Item>
        <div className='d-flex justify-content-between align-items-center'>
          {
            edit ?
            <Form className='w-100' onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="Comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" value={comment} rows={3} onChange={onChange} />
              </Form.Group>
              <div className='d-flex gap-1'>
                <Button type="submit" variant="primary" size="sm">입력</Button>
                <Button variant="secondary" size="sm" onClick={toggleEditMode}>취소</Button>
              </div>
              
            </Form>
            :
            <>
            {commentObj.comment}
            {
            commentObj.image !== '' && 
             <div>
              <img src={commentObj.image} alt="" width="50"/>
             </div>
            }
            {

            isOwner && <div className='d-flex gap-1'>
              <Button variant="secondary" size="sm" onClick={toggleEditMode}>수정</Button>
              <Button variant="danger" size="sm" onClick={deleteComment}>삭제</Button>
            </div>

            }
            </>
          }
          
        </div>
         
         
       </ListGroup.Item>
  )
}

export default Comment;