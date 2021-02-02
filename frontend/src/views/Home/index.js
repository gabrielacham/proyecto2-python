import React, { useState, useRef, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
 } from 'reactstrap';
import axios from 'axios';
import "./styles.css";
import logo from '../../components/Navbar/logo.png';

const sandwichSizes = [
  {
    tamano_san: 'Individual',
    precio_san: 280
  },
  {
    tamano_san: 'Doble',
    precio_san: 430
  },
  {
    tamano_san: 'Triple',
    precio_san: 580
  }
];


export default function Home(props) {

  const [modal, setModal] = useState(false);
  const [initModal, setInitModal] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState([]);
  const [idpedido, setPedidoId] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [sandwich, setSandwich] = useState(sandwichSizes[0] ? sandwichSizes[0].tamano_san : 0);
  const prevSandwich = usePrevious(sandwich);

  function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

  // ComponentDidUpdate
  useEffect(() => {
    if(prevSandwich !== sandwich) {
      let aux
      if (sandwich){
        let newSandwich = sandwichSizes.find(el => el.tamano_san === sandwich)
        aux= subtotal + newSandwich.precio_san
      }
      if (prevSandwich){
        let oldSandwich = sandwichSizes.find(el => el.tamano_san === prevSandwich)
        aux= aux-oldSandwich.precio_san
      }
      setSubtotal(aux)
    }
  }, [prevSandwich, sandwich, subtotal])

  // ComponentDidMount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/main/api/Ingrediente/")
      .then(res => setIngredients(res.data))
      .catch(err => console.log(err));
}, [setIngredients]);

  const toggle = () => setModal(!modal);

  const toggleInitModal = () => {
    var currentdate = new Date();
    let aux ={
      id:0,
      porcentaje_oferta: 0,
      descrip_pedido: descripcion,
      precio_pedido: 0,
      fecha_pedido: currentdate.toISOString()
    }
    axios
      .post("http://127.0.0.1:8000/main/api/Pedido/", aux)
      .then(res => setPedidoId(res.data.id))
      .catch(err => console.log(err));
    setInitModal(!initModal)
  };


  function renderOptions (data) {
    return (
        data.map((prop, key) => {
            return (
              <option key={key}>
                {prop.tamano_san}
              </option>
            );
        })
    );
  }

  function renderIngredients (data) {
    return (
      data ?
        data.map((prop, key) => {
            return (
              <Row
                key={key}
                className='justify-content-between ml-1 px-3'
              >
                <CustomInput
                  type="checkbox"
                  id={`ingredient${key}`}
                  label={prop.nombre_ingrediente}
                  onChange={() => updateCheckSubtotal(prop)}
                />
                <Label>
                  {`${prop.precio_ingrediente} Bs`}
                </Label>
              </Row>
            );
        }) : <div/>
    );
  }

  function renderBillIngredients(list){
    if (list) {
      return (
        list.map((el, key) => {
          return (
            <Col key={key}>
              <Row className='justify-content-between ml-4 pl-3'>
                <Label>
                  {`${el.nombre_ingrediente} Bs`}
                </Label>
                  {' '}
                <Label>
                  {`${el.precio_ingrediente} Bs`}
                </Label>
              </Row>
            </Col>
          );
        })
      );
    }
    return;
  }

  function renderBill (){
    if (order){
      return (
        order.map((el, key) => {
          return (
            <Col key={key}>
              <Row className='justify-content-between ml-2 px-3'>
                <Label>
                  {`${el.tamano_san}`}
                </Label>
                  {' '}
                <Label>
                  {`${el.precio_san} Bs`}
                </Label>
              </Row>
              {renderBillIngredients(el.ingredients)}
            </Col>
          );
        })
      );
    }
    return;
  }

  function updateCheckSubtotal (prop) {
    prop.checked=!prop.checked;
    let aux
    if (prop.checked) {
      aux= subtotal+prop.precio_ingrediente
      setSubtotal(aux)
    } else {
      aux= subtotal-prop.precio_ingrediente
      setSubtotal(aux)
    }
  }

  function addSandwich (){
    let addSandwich = sandwichSizes.find(el => el.tamano_san === sandwich)
    let ingredientsList = ingredients.filter(el => el.checked === true)
    let aux = subtotal + total
    let newSandwich = {
      ...addSandwich,
      ingredients: [...ingredientsList]
    }
    let newOrder = [...order]
    newOrder.push(newSandwich)
    setOrder(newOrder)
    setTotal(aux)
    setModal(!modal)
  }

  function cancelOrder (){
    axios
      .delete(`http://127.0.0.1:8000/main/api/Pedido/${idpedido}`)
      .catch(err => console.log(err));
  }

  return (
      <Form>
        <Row>

          {/* Init Modal */}
          <Modal
            isOpen={initModal}
            toggle={toggleInitModal}
          >
            <ModalHeader className='d-flex justify-content-center'>
              <Col>
                <Row className='justify-content-center h4'>
                  ¡Bienvenido a Sandwiches UCAB!
                </Row>
                <Row className='justify-content-center'>
                  <img
                    src={logo}
                    style={{width: '4.3rem'}}
                    alt=''
                  />
                </Row>
              </Col>
            </ModalHeader>
            <ModalBody className='d-flex justify-content-center'>
              <FormGroup>
                <Label for="descripcion">
                  Describa su Pedido
                </Label>
                <Input
                  type="textarea"
                  name="descripcion"
                  id="descripcion"
                  onChange={({ target }) => setDescripcion(target.value)}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter className='d-flex justify-content-center'>
              <Button
                onClick={toggleInitModal}
              >
                Iniciar la Compra
              </Button>
            </ModalFooter>
          </Modal>

          {/* Order Column */}
          <Col sm='7'>
            <Card className='p-3'>
              <CardTitle className='h4'>
                Ingrese su Orden
              </CardTitle>

              {/* Size Select */}
              <FormGroup>
                <Label for="sandwichSize">
                  Tamaño
                </Label>
                <CustomInput
                  className='pr-3'
                  type="select"
                  name="sandwichSize"
                  id="sandwichSize"
                  onChange={({ target }) => setSandwich(target.value)}
                >
                  {renderOptions(sandwichSizes)}
                </CustomInput>
              </FormGroup>

              {/* Additional Ingredients */}
              <FormGroup>
                <Label for="adicionales">
                  Ingredientes Adicionales
                </Label>
                <div>
                  {renderIngredients(ingredients)}
                </div>
              </FormGroup>

              <hr className="mb-2 mt-0"/>

              {/*Subtotal Row*/}
              <Row className='my-2 ml-2 mr-0 justify-content-between'>
                <Label for="subtotal">
                  Subtotal
                </Label>
                <Label for="subtotal">
                  {subtotal} Bs
                </Label>
              </Row>

              {/* Buttons Row */}
              <Row className='mx-1 mt-2'>
                {/* Cancel Button */}
                <Col sm='6'>
                  <Button
                    outline
                    onClick={() => cancelOrder()}
                    className='home-cancel-button'
                  >
                    Cancelar
                  </Button>
                </Col>

                {/* Accept Button */}
                <Col sm='6' className='d-flex justify-content-end'>
                  <Button
                    onClick={toggle}
                    className='home-button'
                  >
                    Aceptar
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Continue Modal */}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalBody className='d-flex justify-content-center h4'>
              ¿Desea agregar el sandwich a su pedido?
            </ModalBody>
            <ModalFooter className='d-flex justify-content-between'>
              <Button
                outline
                className='home-cancel-button'
                onClick={toggle}
              >
                Cancelar
              </Button>
                {' '}
              <Button
                onClick={() => addSandwich()}
              >
                Continuar
              </Button>
            </ModalFooter>
          </Modal>

          {/* Bill Column */}
          <Col sm='5'>
            <Card className='p-3'>
              <CardTitle className='h4'>
                Factura
              </CardTitle>
              {renderBill()}

              <hr className="mb-2 mt-0"/>

              {/*Subtotal Row*/}
              <Row className='my-2 ml-2 mr-0 justify-content-between'>
                <Label for="subtotal">
                  Total
                </Label>
                <Label for="subtotal">
                  {total} Bs
                </Label>
              </Row>

              <hr className="mb-2 mt-0"/>

              {/* Buttons Row */}
              <Row className='mx-1 mt-2'>
                <Button className='justify-content-center home-finish-button'>
                  Finalizar Pedido
                </Button>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
  );
}
