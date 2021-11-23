import "./Post.css";
import React from 'react';
import firebase from "../../../utils/firebase";
import 'firebase/firestore';

export default function Post() {
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        firebase
        .firestore()
        .collection("posts")
        .orderBy("createdAt", "desc")
        .get()
        .then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map(doc => {
                return doc.data();
            });
            setPosts(data);
        });
    }, []);
    return (
        <>
        {posts.map((post) => {
            return(
                <>
                <div className="post">
                <img
                className="postImg"
                src={post.postImage}
                alt=""
                />
                <div className="postInfo">
                <span className="postTag">{post.postTag}</span>
                <span className="postTitle">{post.postTitle}</span>
                <br />
                <span className="postDate">{post.createdAt?.toDate().toLocaleDateString()}</span>
                </div>
                <p className="postDesc" style={{textAlign: "center"}}>{post.postDesc}</p>
                </div>
                </>
                )
            })}
            </>
            );
        }