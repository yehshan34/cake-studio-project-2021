// import React from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// export function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           訂購資料填寫
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={props.handleSubmit}>
//           <Form.Group controlId="formBasicName">
//             <Form.Label>姓名</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="請輸入您的姓名..."
//               name="name"
//               onChange={props.handleOnChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formBasicSubject">
//             <Form.Label>標題</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="訂購標題"
//               name="subject"
//               onChange={props.handleOnChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formBasicToEmail">
//             <Form.Label>是否對任何食品過敏</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="若有，請填寫過敏食物"
//               name="toEmail"
//               onChange={props.handleOnChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formBasicEmail">
//             <Form.Label>信箱</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="請輸入您的信箱..."
//               name="email"
//               onChange={props.handleOnChange}
//             />
//             <Form.Text className="text-muted">
//             您的姓名、電子郵件等個人資料，僅供本公司寄送之用，並不做其他用途
//             </Form.Text>
//           </Form.Group>

//           <Form.Group controlId="exampleForm.ControlTextarea1">
//             <Form.Label>其他：想提醒我們注意的話</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows="3"
//               name="message"
//               onChange={props.handleOnChange}
//             />
//           </Form.Group>

//           <Button variant="warning" type="submit">
//             提交表單
//           </Button>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="warning" onClick={props.onHide}>
//           關閉
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export function fetchFromServer(url, data, method) {
//   const response = fetch(url, {
//     method: method,
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   return response;
// }
