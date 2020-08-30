import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";
import * as Info from "./Infos.js"

import {
	Button,
	Navbar,
	Nav,
	Card,
	Container,
	CardColumns,
	Modal,
  ListGroup,
  Form,
  FormControl
} from "react-bootstrap";


const App = () => {
	// const [activeItem, setActive] = useState("book");
	const [infos, setInfos] = useState([]);
	const [modalState, setModalState] = useState({
		show: false,
		modalType: "", //showInfo, addInfo
		data: undefined,
	});
	const handleClose = () => setModalState({ show: false });
	useEffect(() => {
		fetch("/infos")
			.then((x) => x.json())
			.then((x) => setInfos(x));
	}, []);
	return (
		<>
			<Header/>
			<Container className="mt-5">
				<ListCards
					infos={infos}
					onClick={(info) => {
						setModalState({ show: true, modalType: "showInfo", data: info });
					}}
				/>
			</Container>
			<MatchModals modalState={modalState} handleClose={handleClose} />
			<AddButton onClick={() => setModalState({ 
        show: true, modalType: "addInfo", onSubmit: (event)=>{sendAddInfo(event, setModalState)}
      })}></AddButton>
		</>
	);
};
export default App;


function Header(props){
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">LOGO</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#book">書</Nav.Link>
        <Nav.Link href="#evnet">活動</Nav.Link>
        <Nav.Link href="#studio">工作室</Nav.Link>
        <Nav.Link href="#counselor">諮商師</Nav.Link>
      </Nav>
    </Navbar>
  )
}

async function sendAddInfo(event, setModalState){
  event.preventDefault()
  const newInfo = Object.fromEntries(Array.from(event.target.elements).filter(x=>x.id).map(x=>[x.id.split('.')[1], x.value]))
  Info.addInfo(newInfo).then(x=>{
    setModalState({show:false})
  })
  
}

function ListCards(props) {
	const { infos, onClick } = props;

	return (
		<CardColumns style={{fontSize: "15px"}}>
			{infos.map((info) => {
				return (
					<Card
						key={info.id}
						onClick={() => {
							onClick(info);
						}}
					>
						<Card.Img
							variant="top"
							src="https://fakeimg.pl/350x200/ff0000/000"
						/>
						<Card.Body>
							<Card.Title>{info.principal}</Card.Title>
							<Card.Text>{info.description}</Card.Text>
						</Card.Body>
					</Card>
				);
			})}
		</CardColumns>
	);
}

function MatchModals(props) {
	const { modalState, handleClose } = props;
	switch (modalState.modalType) {
		case "showInfo":
			return <InfoModal info={modalState.data} handleClose={handleClose} />;
		case "addInfo":
      return <AddInfoModal handleClose={handleClose} onSubmit={modalState.onSubmit}/>
      
		default:
			return <></>;
	}
}

function InfoModal(props) {
	const { info, handleClose } = props;
	const { principal, description, location, link } = info;
	return (
		<Modal
			show={true}
			onHide={handleClose}
			className="pb-5"
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>{principal}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ListGroup variant="flush">
					<ListGroup.Item>
						<img
							className="w-100"
							src="https://fakeimg.pl/350x200/ff0000/000"
							alt=""
						/>
					</ListGroup.Item>
					<ListGroup.Item>
          <div className="form-inline">
              <label style={{marginRight: '10px',fontWeight:'bold'}}>敘述</label>
              <div>{description}</div>
          </div>
            </ListGroup.Item>
					{location ? <ListGroup.Item>

            <div className="form-inline">
              <label style={{marginRight: '10px',fontWeight:'bold'}}>地點</label>
              <div>{location}</div>
          </div>
            

            </ListGroup.Item> : <></>}
					<ListGroup.Item>
						<a href={link} target="_blank" rel="noopener noreferrer">
							<Icon.Link45deg />
							link
						</a>
					</ListGroup.Item>
				</ListGroup>
			</Modal.Body>
		</Modal>
	);
}

function AddInfoModal(props) {
  const { handleClose, onSubmit } = props;

	return (
		<Modal
			show={true}
			onHide={handleClose}
			className="pb-5"
			size="lg" 
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>新增活動</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={onSubmit}>
					<Form.Group controlId="newInfo.principal">
						<Form.Label>主辦人/單位</Form.Label>
						<Form.Control type="text" placeholder="書名/活動名稱/諮商師/工作訪" />
					</Form.Group>
					<Form.Group controlId="newInfo.type">
						<Form.Label>類型</Form.Label>
						<Form.Control as="select">
							<option value="book">書</option>
							<option value="event">活動</option>
							<option value="studio">工作室</option>
							<option value="counselor">諮商師</option>
						</Form.Control>
					</Form.Group>
          <Form.Group controlId="newInfo.link">
						<Form.Label>連結網址</Form.Label>
						<Form.Control type="text" placeholder="https://example.com.tw" />
					</Form.Group>
					<Form.Group controlId="newInfo.description">
						<Form.Label>敘述</Form.Label>
						<Form.Control as="textarea" rows="3" />
					</Form.Group>
          <div className="d-flex">
          <Button variant="primary" type="submit" className="mx-auto">
            Submit
          </Button>
          </div>
          
				</Form>
			</Modal.Body>
		</Modal>
	);
}

function AddButton(props) {
	const { onClick } = props;
	return (
		<Button
			onClick={onClick}
			className="shadow"
			style={{
				position: "absolute",
				right: "20px",
				bottom: "20px",
				display: "grid",
				placeItems: "center",
				width: "50px",
				height: "50px",
				borderRadius: "50%",
				padding: "1px 0px 0px 1px",
			}}
		>
			<Icon.Plus size={30} />
		</Button>
	);
}
