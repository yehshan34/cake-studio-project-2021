import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import firebase from 'firebase'

const initialState = {
    name: '',
    email:'',
    contact: '',
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});
    const {name, email, contact } = state;
    
    const {id} = useParams();
    
    React.useEffect(() => {
        firebase
        .firestore()
        .collection("users")
        .get()
        .then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map(doc => {
                return doc.data();
            });
        });
    }, [id]);
    
    useEffect(() => {
        if(id) {
            setData({...data[id]})
        } else {
            setData({...initialState})
        }
    },[id, data])
    const handleInputChange =(e)=> {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    React.useEffect(() => {
        firebase
        .firestore()
        .collection("users")
        .orderBy("createdAt", "desc")
        .get()
        .then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map(doc => {
                return doc.data();
            });
            setData(data);
        });
    }, []);
    
    
    return (
        <div style={{marginTop: "100px"}}>
        <form
        style={{margin:"auto", padding: "15px" , maxWidth:'400px', alignContent: 'center'
    }} onSubmit={handleSubmit}>
    <label htmlFor="name">Name</label>
    <input type="text" id="name" placeholder="Your name..." value={name} 
    onChange={handleInputChange} />
    <input type='submit' value={id ? '修改' : "儲存"} />
    </form>
    </div>
    )
}

export default AddEdit
