"use client";

import styles from "./page.module.css";
import CardComments from "./comments/cardComments";
import { useState} from 'react';
import CardReplies from "./replies/cardReplies";
import AddComment from "./addComment/AddComment";
import data from "../../public/data/data";
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import TimeAgo from 'javascript-time-ago'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)





export default function Home() {

  // Get initial data from localstorage or data.json


  const storedData = typeof window !== 'undefined' ? localStorage.getItem('dados') : null;
  const initialData = storedData ? JSON.parse(storedData) : data;
  const [comments, setComments] = useState(initialData.comments);

  const [globalCount, setGlobalCount] = useState((comments.length + 3));



  return (
    <main className={styles.main}>
      {comments.map(comment => (
        <div key={comment.id}>
          <CardComments
            id={comment.id}
            key={comment.id}
            image={comment.user.image.png}
            user={comment.user.username}
            createdAt={<ReactTimeAgo date={new Date(comment.createdAt)} />}
            content={comment.content}
            score={comment.score}
            exist={comment.user.username === 'Juancho'}
            repliesLength={comment.replies.length}
            setComments={setComments}
            comments={comments}
            globalCount={globalCount}
            setGlobalCount={setGlobalCount}
          />


          {comment.replies.length > 0 && comment.replies.map(reply => (
            <CardReplies
              id={reply.id}
              key={reply.id}
              image={reply.user.image.png}
              user={reply.user.username}
              createdAt={<ReactTimeAgo date={new Date(reply.createdAt)} />}
              content={reply.content}
              score={reply.score}
              exist={reply.user.username === 'Juancho'}
              setComments={setComments}
              comments={comments}
              globalCount={globalCount}
              setGlobalCount={setGlobalCount}
            />

          ))}
        </div>
      ))}
      <AddComment globalCount={globalCount} setGlobalCount={setGlobalCount} comments={comments} setComments={setComments} />

    </main>
  );
}


