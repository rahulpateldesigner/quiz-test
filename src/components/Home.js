import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo-images.jpg";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { BsFileEarmarkPlay } from "react-icons/bs";


const Home = ({setCategory, setTotalQuestions, setDifficulty, handleSubmit}) => {
 
  const [categoryList, setCategoryList] = useState([])
  //const [defultcategory, setDefultcategory] = useState()  
  const fatchCategory = async () => {
    await fetch(`https://opentdb.com/api_category.php`).then((response) => response.json())
    .then((data) => {
      setCategoryList(data.trivia_categories)      
      setCategory(data.trivia_categories[0].id)
      //setDefultcategory(data.trivia_categories[0].id)
    });
  };

  useEffect(() => {
    fatchCategory();      
    // eslint-disable-next-line
  },[]);
  
  return (

    <section id="homepage" className="centerAlignWrap p-1">
      <Card className="px-4 pb-4">
        <Card.Img variant="top" src={logo} />
        <Card.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Please Select a Category:</Form.Label>
              <Form.Select onChange={(e)=>{setCategory(e.target.value); }}  placeholder="Please select a Category">                         
                {categoryList.map((e, index)=>{return(<option key={e.id} value={e.id}>{e.name}</option>)})}               
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" name="questions-number">
            <Form.Label>Number of Questions:</Form.Label>
              <Form.Control onChange={(e)=>{setTotalQuestions(e.target.value)}} defaultValue={10} required aria-describedby="questions-number" type="number" min={10} max={20} />
            </Form.Group>

            <Form.Group onChange={(e)=>{setDifficulty(e.target.value)}} className="mb-3">
              
              <Row>
              <Col sm={4} className="pe-0"><Form.Label className="me-3">Select Difficulty:</Form.Label></Col>
              <Col><Form.Check defaultChecked inline type="radio" id="easy" label="Easy" name="group1" value="easy" />
              <Form.Check inline type="radio" id="medium" label="Medium" name="group1" value="medium" />
              <Form.Check inline type="radio" id="hard" label="Hard" name="group1" value="hard" />
              </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Button variant="primary" type="submit" size="lg" className="w-100" >Let's Play <BsFileEarmarkPlay /></Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Home;
