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

// Constante con los nombres y precios de cada tamaño de sandwich
const sandwichSizes = [
  {
    tamano_sandwich: 'Individual',
    precio_sandwich: 280.00
  },
  {
    tamano_sandwich: 'Doble',
    precio_sandwich: 430.00
  },
  {
    tamano_sandwich: 'Triple',
    precio_sandwich: 580.00
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
  const [sandwich, setSandwich] = useState(sandwichSizes[0] ? sandwichSizes[0].tamano_sandwich : 0);
  const prevSandwich = usePrevious(sandwich); //copia del nombre del sandwich previamente seleccionado

  // Funcion para obtener el nombre del sandwich seleccionado
  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

  // ComponentDidUpdate
  // Si el nombre del sandwich cambia, actualiza el valor del subtotal
  useEffect(() => {
    if(prevSandwich !== sandwich) { // verifica que el sandwich previamente seleccionado y el actual sean diferentes
      let aux
      if (sandwich){ // Si hay un sandwich nuevo, le suma el precio de ese sandwich al subtotal
        let newSandwich = sandwichSizes.find(el => el.tamano_sandwich === sandwich)
        aux= subtotal + parseFloat(newSandwich.precio_sandwich)
      }
      if (prevSandwich){ // Si había un sandwich seleccionado anteriormente, le resta el precio de ese sandwich al subtotal
        let oldSandwich = sandwichSizes.find(el => el.tamano_sandwich === prevSandwich)
        aux= aux - parseFloat(oldSandwich.precio_sandwich)
      }
      setSubtotal(aux) // Se actualiza el valor del subtotal
    }
  }, [prevSandwich, sandwich, subtotal])

  // ComponentDidMount
  // Al renderizar la vista, se obtienen la lista de ingredientes extra disponibles
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/main/api/Ingrediente/")
      .then(res => setIngredients(res.data))
      .catch(err => console.log(err));
}, [setIngredients]);

  // Abre o cierra el modal de finalizar pedido
  const toggle = () => setModal(!modal);

  // Crea un Pedido nuevo para luego abrir o cerrar el modal de inicio
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

  // Renderiza las opciones del combo Tamaño Sandwich
  function renderOptions(data) {
    return (
        data.map((prop, key) => {
            return (
              <option key={key}>
                {prop.tamano_sandwich}
              </option>
            );
        })
    );
  }

  // Renderiza la lista de ingredientes extra junto a un check y su respectivo precio
  function renderIngredients(data) {
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

  // Renderiza en la factura la lista de ingredientes extra del sandwich comprado junto a su respectivo precio
  function renderBillIngredients(list) {
    if (list) {
      return (
        list.map((el, key) => {
          return (
            <Col key={key}>
              <Row className='justify-content-between ml-4 pl-3'>
                <Label>
                  {`${el.nombre_ingrediente}`}
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

  // Renderiza la lista de sandwiches comprados junto su respectivo precio y posteriomente
  // usa la función renderBillIngredients para mostrar los ingredientes extra que lo componen
  function renderBill() {
    if (order){
      return (
        order.map((el, key) => {
          return (
            <Col key={key}>
              <Row className='justify-content-between ml-2 px-3'>
                <Label>
                  {`${el.tamano_sandwich}`}
                </Label>
                  {' '}
                <Label>
                  {`${el.precio_sandwich} Bs`}
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

  // Al seleccionar ingredientes extra, actualiza el valor subtotal de la orden
  function updateCheckSubtotal(prop) {
    prop.checked=!prop.checked;  // Cambia el estado del check
    let aux
    if (prop.checked) {   //Si está seleccionado suma al subtotal el precio del ingrediente extra
      aux= subtotal + parseFloat(prop.precio_ingrediente)
      setSubtotal(aux)   // Actualiza el valor del subtotal
    } else {  //Si fue deseleccionado resta al subtotal el precio del ingrediente extra
      aux= subtotal - parseFloat(prop.precio_ingrediente)
      setSubtotal(aux)   // Actualiza el valor del subtotal
    }
  }

  // Agrega un Sandwich nuevo a la orden
  function addSandwich() {
    let addSandwich = sandwichSizes.find(el => el.tamano_sandwich === sandwich) // Objeto nuevo con el tamaño y el precio del sandwich seleccionado
    let ingredientsList = ingredients.filter(el => el.checked === true) // Arreglo de ingredientes extra seleccionados
    let aux = subtotal + total // suma del subtotal y el total
    let newSandwich = {                 // Objeto con la informacion del sandwich nuevo:
      ...addSandwich,                   // Tamaño y precio
      ingredients: [...ingredientsList] // Arreglo ingredientes: nombre, id, precio, check
    }
    let item = {      // Objeto con la información del sandwich nuevo pero con el formato requerido por la base de datos
      ...addSandwich, // Tamaño y precio
      id: 0,          // id por default
      ingrediente: ingredientsList.map(ingrediente => ingrediente.id), // Arreglo del id de ingredientes extra
      pedido: idpedido // id del pedido
    }
    let newOrder = [...order] // Copia del arreglo con el pedido
    createSandiwch(item)      // Creación del sandwich en la base de datos
    newOrder.push(newSandwich)// Agregar nuevo sandwich a la lista con el pedido
    setOrder(newOrder)        // Actualizar lista del pedido
    setTotal(aux)             // Actualizar el precio total
    setModal(!modal)          // Cierra el modal
  }

  // Cancela la orden eliminando el pedido de la base de datos
  function cancelOrder() {
    axios
      .delete(`http://127.0.0.1:8000/main/api/Pedido/${idpedido}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    toggleInitModal() // Abre el modal inicial para una nueva orden
  }

  // Crea un nuevo sandwich en la base de datos
  function createSandiwch(item) {
    axios
      .post("http://127.0.0.1:8000/main/api/Sandwich/", item)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  // Finaliza el pedido actualizando los valores
  function finishOrder() {
    var currentdate = new Date();
    let aux ={
      id: idpedido,
      porcentaje_oferta: 0,
      descrip_pedido: descripcion,
      precio_pedido: total,
      fecha_pedido: currentdate.toISOString()
    }
    axios
      .post("http://127.0.0.1:8000/main/api/Pedido/", aux)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setOrder([])    // Reinicia el arreglo del pedido
    setInitModal(!initModal) // Se abre el modal inicial para iniciar una nueva orden

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
                <Button
                  className='justify-content-center home-finish-button'
                  onClick={() => finishOrder()}
                >
                  Finalizar Pedido
                </Button>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
  );
}
