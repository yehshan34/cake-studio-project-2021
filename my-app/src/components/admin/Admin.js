import React,{useState} from 'react'
import { Container, Header, Form, Image, Button} from 'semantic-ui-react';
import firebase from '../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import './Admin.css';
import {useHistory} from 'react-router-dom';
import NavbarAdmin from '../NavbarAdmin';
import Swal from 'sweetalert2';

function Admin() {
    const history = useHistory();
    const [postTitle, setpostTitle] = React.useState('');
    const [postDesc, setpostDesc] = React.useState('');
    const [postTag, setpostTag] = React.useState('');
    // const [postTime, setpostTime] = React.useState('');
    // const [posts, setPosts] = React.useState([]);
    // const [postName, setPostName] = React.useState('');
    const [postImage, setpostImage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [successMsg, setSuccessMsg]=useState('');
    
    // React.useEffect(() => {
    //     firebase
    //     .firestore()
    //     .collection("posts")
    //     .get()
    //     .then((collectionSnapShot) => {
    //         const data = collectionSnapShot.docs.map((doc) => {
    //             return doc.data();
    //         });
    //         setPosts(data);
    //     });
    // }, []);
    // const options = posts.map((post, index) => {
    //     return {
    //         text: post.postTag,
    //         value: post.postTag,
    //     }
    // })
    
    const previewUrl = postImage ? URL.createObjectURL(postImage) : "https://react.semantic-ui.com/images/wireframe/image.png";
    
    function onSubmit() {
        const documentRef = firebase.firestore().collection("posts").doc();
        const fileRef = firebase.storage().ref('post-images/'+documentRef.id);
        fileRef.put(postImage,{contentType: postImage?.type}).then(() => {
            fileRef.getDownloadURL().then((imageUrl)=> {
                documentRef
                .set({
                    postTitle,
                    postDesc,
                    postTag: postTag,
                    createdAt: firebase.firestore.Timestamp.now(),
                    postImage: imageUrl
                })
                .then(() => {
                    Swal.fire({
                        title: "成功送出",
                        text: "已新增部落格",
                        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/personal-project-sunny.appspot.com/o/pic4.png?alt=media&token=eadf68d1-84dc-4cff-b890-5e930f9384c0',
                        imageWidth: 400,
                        imageHeight: 300,
                        imageAlt: 'Custom image',
                        customClass: {
                            confirmButton: "confirmbutton",
                            cancelButton: "cancelbutton",
                          },
                      })
                    history.push('/admin-0');
                }) 
            })
        })
        
    }
    
    return (
        <>
        <NavbarAdmin />
        <h1 className='cakeorder'>後台系統 1 - 部落格</h1>
        <Container className="blog-container">
        <Header className="post-blog-heading">發表文章</Header>
        <p>文章將按照日期先後排序</p>
        <Form onSubmit={onSubmit}>
        <Image src={previewUrl} className="preview-img"
        floated="left"
        />
        {/* <Button className="upload-pic-button" basic as="label "htmlFor="post-image">上傳文章圖片</Button> */}
        <Form.Input className="upload-pic-button" type="file" id="post-image"  
        onChange={(e) => setpostImage(e.target.files[0])}
        />
        <Form.Input 
        placeholder="輸入文章標題..."
        value={postTitle} 
        onChange={(e) => setpostTitle(e.target.value)}
        />
        <Form.TextArea
        placeholder="輸入文章內容..." 
        value={postDesc} 
        onChange={(e) => setpostDesc(e.target.value)}
        />
        <select onChange={(e) => setpostTag(e.target.value)}> 
        <option key="option0" value="selectPostTag">選一個標籤</option>
        <option key="option1" value="活動消息">活動消息</option>
        <option key="option2" value="課程花絮">課程花絮</option>
        <option key="option3" value="學生作品">學生作品</option>
        <option key="option4" value="近期規劃">近期規劃</option>
        </select>
        <Button className="send-post-button" loading={isLoading}>送出文章</Button>
        </Form>
        </Container>
        </>
        )
    }
    
    export default Admin;
    