import React, {ChangeEvent, useEffect} from 'react';
// import logo from './logo.svg';


import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';

import toast from 'toasted-notes' 
// import { getPriority } from 'os';

// import IconKey from "./images/key-solid.svg";
// import IconCopy from "./images/copy-regular.svg"

import { generatePass, PasswordProps } from "./password";

import 'toasted-notes/src/styles.css';
import './App.scss';



// function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
//   return propertyNames.map((n) => o[n]);
// }

// function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
//   return o[propertyName]; // o[propertyName] is of type T[K]
// }

function App() {

  const [passwordProps, setPasswordProps] = React.useState<PasswordProps>({
    strong: false,
    isBigLetter: true,
    isSmLetter: true,
    isNumbers: true,
    isSymbol: true
  })
  const [password,setPassword] = React.useState<string>(''/*generatePass(passwordProps)*/)

  //navigator.clipboard.writeText
  useEffect(()=>{

      setPassword(generatePass(passwordProps))
      
  },[ passwordProps])


  useEffect(()=>{    
    // try {
    //   navigator.clipboard.writeText('')
    // } catch (error) {
    //   console.error(error)
    // }
    // let s:ToastPosition='';    

    toast.notify("Пароль сгенерирован",{
      position:"top-right",
      duration:1500, 
      type:"success"
    })
  }, [password])

  const generate = () => {
    setPassword(generatePass(passwordProps))
  }

  const copy = () => {
    navigator.clipboard.writeText(password)
    toast.notify("Пароль скопирован",{
      position:"top-right",
      duration:1500, 
      type:"success"
    })
  }

  const handleStrongPassword = (event:ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
      // setStrong(checked)
      let pas = {...passwordProps};
      if(pas.isNumbers && !pas.isBigLetter && !pas.isSmLetter && !pas.isSymbol){
        pas.strong = false
      } else {
        pas.strong = checked;
      }      
      setPasswordProps(pas)
      // generate()
  }

  const handlePasswordParamChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;    
    const pas = {...passwordProps};

    let sw = (pas.isBigLetter ? 1 : 0) + (pas.isSmLetter ? 1 : 0 ) + (pas.isNumbers ? 1 : 0) + (pas.isSymbol ? 1 : 0)

    if(sw>1 || checked){
        switch (name) {
          case "isBigLetter":           
            pas.isBigLetter = checked  
            if ( pas.isNumbers && !pas.isBigLetter && !pas.isSmLetter && !pas.isSymbol ) {
               pas.strong = false       
            }  
            break;
          case "isSmLetter":
            pas.isSmLetter = checked    
            if (pas.isNumbers && !pas.isBigLetter && !pas.isSmLetter && !pas.isSymbol ) {
              pas.strong = false
            }
            break
          case "isNumbers":
            pas.isNumbers = checked
            break
          case "isSymbol":
            pas.isSymbol = checked  
            if ( pas.isNumbers && !pas.isBigLetter && !pas.isSmLetter && !pas.isSymbol ) {
               pas.strong = false       
            }          
            break
          default:
            break;
        }

        setPasswordProps(pas)
    }
  }

  return (
    <Container fluid="md" className="Password-app" >
      <Row lg={2}></Row>
      <Row >
        <Col /*lg={{ span: 6, offset: 3 }} */>
          <Card>
            <Card.Body>
              <Card.Title>Генератор паролей</Card.Title>
              <Form>
                <Form.Group>
                  <InputGroup size="lg">
                    {/* <InputGroup.Prepend>              
                      <InputGroup.Text id="inputGroup-sizing-lg">Large</InputGroup.Text>
                    </InputGroup.Prepend> */}
                    <FormControl 
                      value={password} 
                      readOnly={true} 
                      id="generated_password"
                      aria-label="Пароль" 
                      // aria-describedby="inputGroup-sizing-sm" 
                      onClick={copy}
                    />
                  </InputGroup>                  
                </Form.Group>
                <Form.Group >
                  <Form.Check
                    // type="checkbox"
                    type="switch"
                    id="strongPass"
                    name="strongPass"
                    label="Усиленый пароль"
                    checked={passwordProps.strong}
                    onChange={handleStrongPassword}                    
                    custom
                  />                  
                </Form.Group>
                <FormGroup >
                  <Form.Switch 
                    id="isBigLetter"
                    name="isBigLetter"
                    label="Большие буквы"                   
                    checked={passwordProps.isBigLetter} 
                    onChange={handlePasswordParamChange}                   
                  />                  
                  <Form.Switch 
                    id="isSmLetter"
                    name="isSmLetter"
                    label="маленькие буквы"                    
                    checked={passwordProps.isSmLetter}
                    onChange={handlePasswordParamChange}
                  />
                  <Form.Switch 
                    id="isNumbers"
                    name="isNumbers"
                    label="Цифры"
                    checked={passwordProps.isNumbers}
                    onChange={handlePasswordParamChange}
                  />
                  <Form.Switch
                    id="isSymbol"
                    name="isSymbol"
                    label="Символы"
                    checked={passwordProps.isSymbol}
                    onChange={handlePasswordParamChange}
                    size="lg"
                  />
                </FormGroup>                
                <Button 
                  variant="outline-primary"
                  onClick={generate}
                  size="lg"
                  block
                >
                  Сгенерировать пароль
                </Button>                
              </Form>

            </Card.Body>
          </Card>          
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}

export default App;
