"use client";

import styles from './replyComments.module.css'
import { useState } from 'react';



function ReplyComments({ onReplyCommentAdded, user, globalCount, setGlobalCount }) {
    const [content, setContent] = useState(`@${user}    `);


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
        }

        if (onReplyCommentAdded) {
            onReplyCommentAdded(newComment);
        }

        // Clean of the textarea
        setContent('');
        setGlobalCount(globalCount + 1)


    };
    return (
        <div className={styles.reply}>
            <div className={styles.cardreply}>
                <img src="./images/avatars/image-ramsesmiron.png" alt="image" />
                <form onSubmit={handleSubmit}>
                    <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} cols="30" rows="10"></textarea>
                    <button type='submit'>REPLY</button>
                </form>

            </div>
        </div>

    )
}

export default ReplyComments;

