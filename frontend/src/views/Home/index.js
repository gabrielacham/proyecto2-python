import React from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Button
 } from 'reactstrap';
import "./styles.css";

const sandwichSizes = ['Individual', 'Doble', 'Triple'];

const ingredients = [
  {
    name: 'Jamon',
    price: 40
  },
  {
    name: 'Champiñones',
    price: 35
  },
  {
    name: 'Pimentón',
    price: 30
  },
  {
    name: 'Doble queso',
    price: 40
  },
  {
    name: 'Aceitunas',
    price: 57.5
  },
  {
    name: 'Pepperoni',
    price: 38.5
  },
  {
    name: 'Salchichón',
    price: 62.5
  },
];

function renderOptions (data) {
  return (
      data.map((prop, key) => {
          return (
            <option>{prop}</option>
          );
      })
  );
}

function renderIngredients (data) {
  return (
      data.map((prop, key) => {
          return (
            <Row className='justify-content-between ml-1 px-3'>
              <CustomInput type="checkbox" id={`ingredient${key}`} label={prop.name} />
              <Label>{`${prop.price} Bs`}</Label>
            </Row>

          );
      })
  );
}


export default function Home() {
  return (
        <Form>
          <Row>
            {/* Order Column */}
            <Col sm='7'>
              <Card className='p-3'>

                {/* Size Select */}
                <FormGroup>
                  <Label for="sandwichSize">Tamaño</Label>
                  <CustomInput className='pr-3' type="select" name="sandwichSize" id="sandwichSize">
                    {renderOptions(sandwichSizes)}
                  </CustomInput>
                </FormGroup>

                {/* Additional Ingredients */}
                <FormGroup>
                  <Label for="adicionales">Ingredientes Adicionales</Label>
                  <div>
                    {renderIngredients(ingredients)}
                  </div>
                </FormGroup>

                {/* Buttons Row */}
                <Row className='mx-1'>
                  {/* Cancel Button */}
                  <Col sm='6'>
                    <Button outline className='home-cancel-button'>Cancelar</Button>
                  </Col>

                  {/* Accept Button */}
                  <Col sm='6' className='d-flex justify-content-end'>
                    <Button className='home-button'>Aceptar</Button>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Bill Column */}
            <Col sm='5'>
              <Card className='p-3'>
                <CardTitle>Factura</CardTitle>
              </Card>
            </Col>
          </Row>
        </Form>
  );
}
