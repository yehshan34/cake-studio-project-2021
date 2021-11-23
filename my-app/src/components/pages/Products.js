// import React from 'react';
// import '../../App.css';
// import Footer from '../Footer';
// import './Products.css';
// import 'firebase/firestore';
// import firebase from "../../utils/firebase";

// export default function Products(){
//   const [products, setProducts] = React.useState([]);

//   React.useEffect(() => {
//     firebase
//     .firestore()
//     .collection("products")
//     .orderBy("createdAt", "desc")
//     .get()
//     .then((collectionSnapShot) => {
//       const data = collectionSnapShot.docs.map(doc => {
//         return doc.data();
//       });
//       setProducts(data);
//     });
//   }, []);
  
  // return (
  //   <>
  //   <h1 className='cakeorder'>訂購蛋糕</h1>
  //   <div className="menuList">
  //   {products.map((product, key) => {
  //     return (
  //       <>
  //       <div className="menuItem"  key={key}>
  //       <div className="pic-container" key={product.productID}>
  //       <div className="cake-pic" style={{ backgroundImage: `url(${product.url})` }}> </div>
  //       <button className="add-to-cart-button" >加入購物車</button>
  //       </div>
  //       <h1> {product.title} </h1>
  //       <p> NTD. {product.price} </p>
  //       </div>
  //       </>
  //       );
  //     })}
  //     </div>
  //     <Footer />
  //     </>
  //     );
    // }