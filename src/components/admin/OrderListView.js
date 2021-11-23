import React from 'react'
import firebase from 'firebase';
import { useParams} from 'react-router-dom';
import './OrderListView.css'
import NavbarAdmin from '../NavbarAdmin';
function OrderListView() {
    const {orderID} = useParams();
    const [orderIds, setOrderIds] = React.useState([]);
    React.useEffect(() => {
        firebase
        .firestore()
        .collection('orders')
        .doc(orderID)
        .collection('Buyer-Cart')
        .get()
        .then((Snapshot) => {
            console.log(Snapshot);
            const data = Snapshot.docs.map(doc => {
                return doc.data();
                
            });
            setOrderIds(data);
            console.log(data);
        })
    }, []);
    
    const [orderDetails, setOrderDetails] = React.useState([]);
    React.useEffect(() => {
        firebase
        .firestore()
        .collection('orders')
        .doc(orderID)
        .collection('Buyer-Personal-Info')
        .get()
        .then((Snapshot) => {
            console.log(Snapshot);
            const data = Snapshot.docs.map(doc => {
                return doc.data();
                
            });
            setOrderDetails(data);
        })
    }, []);
    
    return (
        <>
        <NavbarAdmin />
        <h1 className='cakeorder'>訂購單 - 詳細資訊</h1>
        <div className="receipt_body">
        <div className="receipt_per">
        <h2 className="name_receipt"> Sunny's Studio </h2>
        <p className="greeting">－ 感謝您的訂購 －</p>
        
        <div className="order_per">
        <p> 訂單編號 : {orderID}</p>
        {orderDetails.map((orderDetail, key) => {
            return(
                <>
                <p> 訂購人 : {orderDetail.Name}</p>
                <p> 收件人 : {orderDetail.Receiver}</p>
                <p> 收件人電話 : {orderDetail.CellNo}</p>
                <p> 收件信箱 : {orderDetail.Email}</p>
                <p> 下單日期 : {orderDetail.createdAt?.toDate().toLocaleDateString()} </p>
                <p> 寄送住址 : {orderDetail.ResidentialAddress}</p>
                </>
                );
            })}
            <hr />
            <h3>訂單發票明細</h3>
            </div>
            {orderIds.map((orderId, key) => {
                return(
                    <>
                    <div className="details_orderlist">
                    <div className="product_orderlist">
                    <img src={orderId.productImg} alt="product_info"/>
                    <div className="info">
                    <h4> 品名：{orderId.productName} </h4>
                    <p> 單品價錢： NT$ {orderId.productPrice} </p><br/>
                    <p> 單品數量： {orderId.qty} </p>
                    </div>
                    </div>
                    </div>
                    <div className="totalprice">
                    <p className="sub">此商品小計<span>NT$ {orderId.TotalProductPrice} </span></p>
                    </div>
                    </>
                    );
                })}
                <hr />
                <div className="totalprice">
                {orderDetails.map((orderDetail, key) => {
            return(
                <>
                <p className="tot">總數量<span> {orderDetail.CartQty} /個</span> </p>
                <p className="tot2">此訂單總計<span> NT$ {orderDetail.CartPrice} /元</span> </p>
                </>
                );
            })}
                </div>
                </div>
                </div>
                </>
                )
                
            }
            
            export default OrderListView
            