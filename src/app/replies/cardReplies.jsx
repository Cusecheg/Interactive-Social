"use client";

import styles from './cardReplies.module.css'
import { FaPen, FaReply, FaTrash } from "react-icons/fa";
import ReplyReplies from '../replyReplies/replyReplies'
import { useReducer, useEffect } from 'react';
import data from '../../../public/data/data';



const reducer = (state, action) => {
    switch (action.type) {

        case 'SetHas':
            return { ...state, has: action.payload }
        case 'SetOpenEdit':
            return { ...state, openEdit: action.payload }
        case 'SetEdit':
            return { ...state, edit: action.payload }
        case 'SetLike':
            return { ...state, like: action.payload }

        case 'SetNoLike':
            return { ...state, noLike: action.payload }
        default:
            return state;
    }


}



function CardReplies({ image, user, createdAt, score, content, exist, comments, setComments, id, globalCount, setGlobalCount }) {

    const initialState = {
        has: false,
        openEdit: false,
        edit: content,
        like: false,
        noLike: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    //Update reply comments
    const updateReplyComment = (e) => {
        e.preventDefault();
        if (state.edit !== content) {
            const updatedComments = comments.map(comment => {
                if (comment.replies.some(reply => reply.id === id)) {
                    const updatedReplies = comment.replies.map(reply => {
                        if (reply.id === id) {
                            return { ...reply, content: state.edit }
                        }
                        return reply;
                    });
                    return { ...comment, replies: updatedReplies }
                }
                return comment;
            });

            setComments(updatedComments);
            localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
            dispatch({ type: 'SetOpenEdit', payload: false });
        }
    };



    const deleteReplyComments = () => {

        const updatedComments = comments.map(comment => {
            const updateReplies = comment.replies.filter(reply => reply.id !== id)
            return { ...comment, replies: updateReplies }
        })

        setComments(updatedComments)
        localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
        console.log(updatedComments);
    };



    // like
    useEffect(() => {
        const likes = JSON.parse(localStorage.getItem("likes"));
        if (likes && likes[`liked-id_${id}`]) {
            dispatch({ type: 'SetLike', payload: true })
        }
    }, [id]);

    const like = () => {

        if (!state.like && !state.noLike) {
            const updatedComments = comments.map(comment => {
                const updatedReplyScore = comment.replies.map(reply => {
                    if (reply.id === id) {
                        return { ...reply, score: reply.score + 1 }
                    } return reply
                })
                return { ...comment, replies: updatedReplyScore }
            });
            setComments(updatedComments);
            dispatch({ type: 'SetLike', payload: true });
            localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
            const likes = JSON.parse(localStorage.getItem('likes')) || {};
            localStorage.setItem("likes", JSON.stringify({ ...likes, [`liked-id_${id}`]: true }));
            console.log(updatedComments);
        }

        if (!state.like && state.noLike) {
            const updatedComments = comments.map(comment => {
                const updatedReplyScore = comment.replies.map(reply => {
                    if (reply.id === id) {
                        return { ...reply, score: reply.score + 2 }
                    } return reply
                })
                return { ...comment, replies: updatedReplyScore }
            });
            setComments(updatedComments);
            dispatch({ type: 'SetLike', payload: true });
            dispatch({ type: 'SetNoLike', payload: false });
            localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
            const likes = JSON.parse(localStorage.getItem('likes')) || {};
            localStorage.setItem("likes", JSON.stringify({ ...likes, [`liked-id_${id}`]: true, [`noliked-id_${id}`]: false }));
            console.log(updatedComments);
        }

    }

    // nolike
    useEffect(() => {
        const likes = JSON.parse(localStorage.getItem("likes"));
        if (likes && likes[`noliked-id_${id}`]) {
            dispatch({ type: 'SetNoLike', payload: true })
        }
    }, [id]);


    const noLike = () => {

        if (!state.noLike && !state.like) {
            const updatedComments = comments.map(comment => {
                const updatedReplyScore = comment.replies.map(reply => {
                    if (reply.id === id) {
                        return { ...reply, score: reply.score - 1 }
                    } return reply
                })
                return { ...comment, replies: updatedReplyScore }
            });

            setComments(updatedComments);
            dispatch({ type: 'SetNoLike', payload: true });
            localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
            const likes = JSON.parse(localStorage.getItem('likes')) || {};
            localStorage.setItem("likes", JSON.stringify({ ...likes, [`noliked-id_${id}`]: true }));
            console.log(updatedComments);
        }


        if (state.like) {
            const updatedComments = comments.map(comment => {
                const updatedReplyScore = comment.replies.map(reply => {
                    if (reply.id === id) {
                        return { ...reply, score: reply.score - 2 }
                    } return reply
                })
                return { ...comment, replies: updatedReplyScore }

            });
            setComments(updatedComments);
            dispatch({ type: 'SetNoLike', payload: true });
            dispatch({ type: 'SetLike', payload: false });
            localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
            const likes = JSON.parse(localStorage.getItem('likes')) || {};
            localStorage.setItem("likes", JSON.stringify({ ...likes, [`noliked-id_${id}`]: true, [`liked-id_${id}`]: false }));
            console.log(updatedComments);
        }

    }



    return (
        <div>
            <div className={styles.replies}>
                <div className={styles.line}></div>
                <div className={styles.card}>
                    <div className={styles.likes}>
                        <p className={styles.plus} onClick={like}>+</p>
                        <h3>{score}</h3>
                        <p className={styles.less} onClick={noLike}>-</p>
                    </div>
                    <div className={styles.information}>
                        <div className={styles.data}>
                            <div className={styles.data1}>
                                <img src={image} alt='image'></img>
                                <p>{user}</p>
                                <p>{createdAt}</p>
                            </div>
                            {exist ?
                                <div className={styles.icon}>
                                    <p className={styles.delete} onClick={deleteReplyComments}><FaTrash /> Delete</p>
                                    <p className={styles.edit} onClick={() => { dispatch({ type: 'SetOpenEdit', payload: true }) }}
                                        onDoubleClick={() => { dispatch({ type: 'SetOpenEdit', payload: false }) }}>
                                        <FaPen /> Edit</p>
                                </div>
                                :
                                <div className={styles.data2} onClick={() => { dispatch({ type: 'SetHas', payload: true }) }}
                                    onDoubleClick={() => { dispatch({ type: 'SetHas', payload: false }) }}>
                                    <FaReply />
                                    <p>Reply</p>
                                </div>}
                        </div>
                        <div className={styles.textarea}>

                            {state.openEdit ?

                                <div className={styles.cardreply}>
                                    <form onSubmit={updateReplyComment}>
                                        <textarea name="edit" value={state.edit}
                                            onChange={(e) => { dispatch({ type: 'SetEdit', payload: e.target.value }) }}>
                                            {content}
                                        </textarea>
                                        {state.edit !== content &&
                                            <button type='submit'>UPDATE</button>}
                                    </form>

                                </div> :
                                <div className={styles.textarea}> <p>{content}</p> </div>}

                        </div>
                    </div>
                </div>
            </div>
            {state.has ? <div> <ReplyReplies dispatch={dispatch} id={id} comments={comments} setComments={setComments} globalCount={globalCount} setGlobalCount={setGlobalCount} user={user} /></div> : null}
        </div>

    )
}


export default CardReplies;