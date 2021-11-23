import React from 'react'
import NavbarAdmin from '../NavbarAdmin'
import firebase from 'firebase';
import { useParams, Link } from 'react-router-dom';

function OrderList() {
    const [orders, setOrders] = React.useState([]);
    const {orderID} = useParams();
    const [orderIds, setOrderIds] = React.useState([]);
    React.useEffect(() => {
        firebase
        .firestore()
        .collection('orders')
        .get()
        .then((querySnapshot)=> {
            const data = querySnapshot.docs.map(doc => {
                return doc.data();
                
            });
            setOrders(data);
            console.log(data);
        })
    },[]);
    
    React.useEffect(() => {
        
        firebase
        .firestore()
        .collection('orders')
        .doc(orderID)
        .collection('Buyer-Cart')
        .get()
        .then((Snapshot) => {
            console.log(Snapshot);
            const data1 = Snapshot.docs.map(doc => {
                return doc.data();
                
            });
            setOrderIds(data1);
            console.log(data1);
            console.log(orderID);
        })
    }, []);

    return (
        <>
        <NavbarAdmin />
        <h1 className='cakeorder'>後台系統 3 - 成功訂購單</h1>
        <div style={{marginTop: "70px"}}>
        <table className="styled-table" style={{maxWidth: "1700px"}}>
        <thead>
        <tr>
        <th style={{textAlign: 'center'}}>號碼</th>
        <th style={{textAlign: 'center'}}>訂單編號</th>
        <th style={{textAlign: 'center'}}>訂單日期</th>
        <th style={{textAlign: 'center'}}>訂單狀態</th>
        <th style={{textAlign: 'center'}}>付款狀態</th>
        <th style={{textAlign: 'center'}}>送貨狀態</th>
        <th style={{textAlign: 'center'}}>訂購人</th>
        <th style={{textAlign: 'center'}}>總數(個)</th>
        <th style={{textAlign: 'center'}}>合計</th>
        <th style={{textAlign: 'center'}}>- 其他 -</th>
        </tr>
        </thead>
        <tbody>
        {orders?.map((order, key) => {
            return(
                <tr key={key}>
                <th scope='row'>{key + 1}</th>
                <td>{order.ID}</td>
                <td>{order.createdAt?.toDate().toLocaleDateString()}</td>
                <td><button className="button_member_1 button_status">處理中</button></td>
                <td><button className="button_member_1 button_status">未付款</button></td>
                <td><button className="button_member_1 button_status">備貨中</button></td>
                <td>{order.Name} ({order.Email})</td>
                <td style={{textAlign: 'center'}}>{order.CartQty}</td>
                <td>NT$ {order.CartPrice}</td>
                
                
                <td style={{textAlign: 'center'}}>
                <Link to= {`/orderlistview/${order.ID}`}>
                <button className="button_member button_view">查看</button>
                </Link>
                <button className="button_member button_view">
                    <select> 
                        <option>---</option>
                        <option>已付款</option>
                        <option>已出貨</option>
                        <option>已送達</option>
                        <option>完成訂單</option>
                    </select>
                    </button>
                </td>
                </tr>
                );
            })}
            </tbody>
            </table>
            </div>
            </>
            )
        }
        
        
        export default OrderList;
        