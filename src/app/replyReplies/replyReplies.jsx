"use client";

import styles from './replyReplies.module.css'
import avatar from '../images/avatar.png'
import { useState } from 'react';
import data from '../../../public/data/data';






function ReplyReplies({ user, globalCount, setGlobalCount, comments, setComments, id, dispatch }) {

    const [content, setContent] = useState(`@${user} `);


    // Add new reply of the comment on based to the reply
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
        };

        const updatedComment = comments.map(comment => {
            if (comment.replies.find(reply => reply.id === id)) {
                const updatedReplies = [...comment.replies, newComment];
                // console.log(updatedReplies);
                return { ...comment, replies: updatedReplies }
            }
            return comment

        })


        // Save comments for the renderize
        setComments(updatedComment)

        // Clean of the textarea
        setContent('');

        //Assign id (identify) for new reply comments
        setGlobalCount(globalCount + 1)

        //Disable form 
        dispatch({ type: 'SetHas', payload: false });

        //Save data in localstorage
        localStorage.setItem("dados", JSON.stringify({ ...data, comments: updatedComment }));
    };




    return (
        <div className={styles.reply}>
            <div className={styles.line}></div>
            <div className={styles.cardreply}>
                <img src="./images/avatars/image-ramsesmiron.png" alt="image" />
                <form onSubmit={handleSubmit}>
                    <textarea name="content" value={content} onChange={(e) => { setContent(e.target.value) }} > </textarea>
                    <button type='submit'>REPLY</button>
                </form>
            </div>
        </div>

    )
}

export default ReplyReplies;