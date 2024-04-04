"use client";

import styles from './AddComment.module.css'
import avatar from "../../../public/images/avatars/image-ramsesmiron.png"
import { useState } from 'react';
import data from '../../../public/data/data';



function AddComment({ comments, setComments, globalCount, setGlobalCount }) {
    const [content, setContent] = useState('');



    // Add comments
    const handleSubmit = (e) => {
        e.preventDefault();


        const newComment =

        {
            "id": globalCount,
            "content": content,
            "createdAt": new Date(),
            "score": 0,
            "user": {
                "image": {
                  "png": "./images/avatars/image-ramsesmiron.png",
                  "webp": "./images/avatars/image-ramsesmiron.webp"
                },
                "username": "Juancho"
              },
            "replies": []
        };

        const updateComments = [...comments, newComment];
        setComments(updateComments);
        localStorage.setItem('dados', JSON.stringify({ ...data, comments: updateComments }));
        // console.log(comments);
        setContent('');
        setGlobalCount(globalCount + 1)
        // console.log(globalCount);

    };
    return (
        <div className={styles.reply}>
            <div className={styles.cardreply}>
                <img src="./images/avatars/image-ramsesmiron.png" alt="image" />
                <form onSubmit={handleSubmit}>
                    <textarea name="content" value={content} placeholder='Add a comment...' onChange={(e) => setContent(e.target.value)} cols="30" rows="10"></textarea>
                    <button type='submit'>SEND</button>
                </form>

            </div>
        </div>

    )
}

export default AddComment;
