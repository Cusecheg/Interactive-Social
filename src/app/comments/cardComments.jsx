"use client";


import styles from './cardComments.module.css'
import { FaReply, FaTrash, FaPen, FaUser } from "react-icons/fa";
import { useReducer, useEffect } from 'react';
import ReplyComments from '../replyComments/replyComments';
import data from '../../../public/data/data';


const ActionTypes = {
    SetShowReplyComments: 'SetShowReplyComments',
    SetEdit: 'SetEdit',
    SetOpenEdit: 'SetOpenEdit',
    SetLike: 'SetLike',
    SetNoLike: 'SetNolike',
}


const reducer = (state, action) => {
    switch (action.type) {

        case ActionTypes.SetShowReplyComments:
            return { ...state, showReplyComments: action.payload };

        case ActionTypes.SetEdit:
            return { ...state, edit: action.payload };

        case ActionTypes.SetOpenEdit:
            return { ...state, openEdit: action.payload };

        case ActionTypes.SetLike:
            return { ...state, like: action.payload }

        case ActionTypes.SetNoLike:
            return { ...state, noLike: action.payload }

        default:
            return state;
    }

}


function CardComments({ image, user, createdAt, score, content, id, exist, setComments, comments, globalCount, setGlobalCount }) {


    const initialState = {
        showReplyComments: false,
        edit: content,
        openEdit: false,
        like: false,
        noLike: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);


    //Update comments
    const updateComment = (e) => {
        e.preventDefault();
        if (state.edit !== content) {

            const updatedComment = comments.map(comment => {
                if (comment.id === id) {
                    return {
                        ...comment, content: state.edit, createdAt: new Date()
                    };
                }
                return comment;
            });
            setComments(updatedComment);
            localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComment }));
        }
        dispatch({ type: ActionTypes.SetOpenEdit, payload: false });
    };


    // Delete comments
    const deleteComments = (id) => {
        const updatedComments = comments.filter(item => item.id !== id);
        setComments(updatedComments);
        localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
        // alert(id);
    };




    // Add ReplyComments
    const handleReplyCommentAdded = (newComment) => {
        const updatedComments = comments.map(comment => {
            if (comment.id === id) {
                const updatedReplies = Array.isArray(comment.replies) ? [...comment.replies, newComment] : [newComment];
                return {
                    ...comment,
                    replies: updatedReplies
                };
            }
            return comment;
        });
        dispatch({ type: ActionTypes.SetShowReplyComments, payload: (false) });
        localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
        setComments(updatedComments);
        // console.log(updatedComments);
    };

    // like
    useEffect(() => {
        const likes = JSON.parse(localStorage.getItem("likes"));
        if (likes && likes[`liked-id_${id}`]) {
            dispatch({ type: ActionTypes.SetLike, payload: true })
        }
    }, [id]);

    const like = () => {

        if (!state.like && !state.noLike) {
            const updatedComments = comments.map(comment => {
                if (comment.id === id) {
                    const updatedScore = comment.score + 1;
                    return { ...comment, score: updatedScore };
                }
                return comment;
            });
            setComments(updatedComments);
            dispatch({ type: ActionTypes.SetLike, payload: true });
            localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
            const likes = JSON.parse(localStorage.getItem('likes')) || {};
            localStorage.setItem("likes", JSON.stringify({ ...likes, [`liked-id_${id}`]: true }));
            // console.log(updatedComments);
        }

        if (!state.like && state.noLike) {
            const updatedComments = comments.map(comment => {
                if (comment.id === id) {
                    const updatedScore = comment.score + 2;
                    return { ...comment, score: updatedScore };
                }
                return comment;
            });
            setComments(updatedComments);
            dispatch({ type: ActionTypes.SetLike, payload: true });
            dispatch({ type: ActionTypes.SetNoLike, payload: false });
            localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
            const likes = JSON.parse(localStorage.getItem('likes')) || {};
            localStorage.setItem("likes", JSON.stringify({ ...likes, [`liked-id_${id}`]: true, [`noliked-id_${id}`]: false }));
            // console.log(updatedComments);
        }

    }

    // nolike
    useEffect(() => {
        const likes = JSON.parse(localStorage.getItem("likes"));
        if (likes && likes[`noliked-id_${id}`]) {
            dispatch({ type: ActionTypes.SetNoLike, payload: true })
        }
    }, [id]);


    const noLike = () => {

        if (!state.noLike && !state.like) {
            const updatedComments = comments.map(comment => {
                if (comment.id === id) {
                    const updatedScore = comment.score - 1;
                    return { ...comment, score: updatedScore };
                }
                return comment;
            });
            setComments(updatedComments);
            dispatch({ type: ActionTypes.SetNoLike, payload: true });
            localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
            const likes = JSON.parse(localStorage.getItem('likes')) || {};
            localStorage.setItem("likes", JSON.stringify({ ...likes, [`noliked-id_${id}`]: true }));
            // console.log(updatedComments);
        }


        if (!state.noLike && state.like) {
            const updatedComments = comments.map(comment => {
                if (comment.id === id) {
                    const updatedScore = comment.score - 2;
                    return { ...comment, score: updatedScore };
                }
                return comment;
            });
            setComments(updatedComments);
            dispatch({ type: ActionTypes.SetNoLike, payload: true });
            dispatch({ type: ActionTypes.SetLike, payload: false });
            localStorage.setItem('dados', JSON.stringify({ ...data, comments: updatedComments }));
            const likes = JSON.parse(localStorage.getItem('likes')) || {};
            localStorage.setItem("likes", JSON.stringify({ ...likes, [`noliked-id_${id}`]: true, [`liked-id_${id}`]: false }));
            // console.log(updatedComments);
        }









    }





    return (
        <div>
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
                            <p className={styles.user}>{user}</p>
                            {exist && <div className={styles.iconUser}><FaUser/></div>}
                            <p className={styles.createdAt}>{createdAt}</p>
                                                
                        </div>
                        <div className={styles.data2}>
                            {exist ?
                                <div className={styles.icon}>
                                    <p className={styles.delete} onClick={() => {deleteComments(id)}}><FaTrash/> Delete</p>
                                    <p className={styles.edit} onClick={() => {dispatch({ type: ActionTypes.SetOpenEdit, payload: true })}}
                                        onDoubleClick={() => {dispatch({type: ActionTypes.SetOpenEdit, payload: false })}}>
                                            <FaPen/> Edit </p>
                                </div> :

                                <div className={styles.reply} onClick={() => { dispatch({ type: ActionTypes.SetShowReplyComments, payload: true})}}
                                    onDoubleClick={() => { dispatch({ type: ActionTypes.SetShowReplyComments, payload: false })}}>
                                    <FaReply />
                                    <p>Reply</p>
                                </div>
                            }

                        </div>
                    </div>
                    <div className={styles.textarea}>
                        {state.openEdit ?

                            <div className={styles.cardreply}>
                                <form onSubmit={updateComment}>
                                    <textarea name="edit" value={state.edit}
                                        onChange={(e) => { dispatch({ type: ActionTypes.SetEdit, payload: e.target.value }) }}>
                                        {content}
                                    </textarea>
                                    {state.edit !== content &&
                                        <button type='submit'>UPDATE</button>}
                                </form>

                            </div> : <p>{state.edit}</p>}

                    </div>
                </div>
            </div>
            {state.showReplyComments &&
                <div>
                    <ReplyComments user={user} globalCount={globalCount} setGlobalCount={setGlobalCount} onReplyCommentAdded={handleReplyCommentAdded} />
                </div>}
        </div>

    )
}


export default CardComments;