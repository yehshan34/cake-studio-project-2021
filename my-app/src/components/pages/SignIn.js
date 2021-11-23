import { Menu, Form, Container,Message,Button } from 'semantic-ui-react';
import firebase from '../../utils/firebase';
import { useHistory } from 'react-router';
import "firebase/auth";
import React from 'react';
import './SignIn.css';
import Footer from '../Footer';
export default function SignIn() {
    const history = useHistory();
    const [activeItem, setActiveItem] = React.useState("register");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    
    function onSubmit() {
        setIsLoading(true);
        if(activeItem==='register') {
            firebase
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .then(()=> {
                history.push('/');
                setIsLoading(false);
            })
            .catch((error)  => {
                switch(error.code) {
                    case 'auth/email-already-in-use':
                    setErrorMessage('信箱已存在')
                    break;
                    case 'auth/invalid-email':
                    setErrorMessage('信箱格式不正確');
                    break;
                    case 'auth/weak-password':
                    setErrorMessage('密碼強度不足');
                    break;
                    default:
                }
            });
        } else if (activeItem ==='signin') {
            firebase
            .auth()
            .signInWithEmailAndPassword(email,password)
            .then(()=> {
                history.push('/');
                setIsLoading(false);
            })
            .catch((error)  => {
                switch(error.code) {
                    case 'auth/invalid-email':
                    setErrorMessage('信箱格式不正確');
                    break;
                    case 'auth/user-not-found':
                    setErrorMessage('信箱不存在');
                    break;
                    case 'auth/wrong-password':
                    setErrorMessage('密碼錯誤');
                    break;
                    default:
                }
            });
        }
    }
    
    return (
        <>
        <h1 className='account'>會員專區</h1>
        <Container className="login">
        <Menu className="loginContainer">
        <div style={{display: "flex", justifyContent:"space-around", width:"100%"}}>
        <Menu.Item style={{textAlign: "center", cursor:"pointer"}}
        active={activeItem==='register'}
        onClick={()=> {
            setErrorMessage('');
            setActiveItem('register');
        }}
        >註冊</Menu.Item>
        <Menu.Item style={{textAlign: "center", color:"#288e96"}} > | </Menu.Item>
        <Menu.Item style={{textAlign: "center", cursor:"pointer"}} 
        active={activeItem==='signin'}
        onClick={()=>{
            setErrorMessage('');
            setActiveItem('signin');
        }
    }
    >登入</Menu.Item>
    </div>
    <Form onSubmit={onSubmit} className="btnContainer">
    <Form.Input 
    label="信箱" 
    value={email}
    onChange={(e) => setEmail(e.target.value)} 
    placeholder="請輸入信箱" 
    />
    <Form.Input 
    label="密碼" 
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="請輸入密碼" 
    type="password"
    />
    {errorMessage && <Message className="errorMsg" negative>{errorMessage}</Message>}
    <Button className="button_login" loading={isLoading}>
    {activeItem === 'register' && '註冊'}
    {activeItem === 'signin' && '登入'}
    </Button>
    </Form>
    </Menu>
    
    </Container>
    <Footer />
    </>
    ) 
    ;
}
