import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { BiLoaderAlt, BiSkipNext } from "react-icons/bi";
import { BsRepeat } from "react-icons/bs";

const Play = ({ category = 9, totalQuestions, difficulty }) => { 
  const [curruntQueNo, setCurruntQueNo] = useState(0);
  const [score, setScore] = useState([0 , totalQuestions]);
  const [overallscore, setOverallscore] = useState([JSON.parse(localStorage.getItem("score")), JSON.parse(localStorage.getItem("queAttempted"))]);
  const [categoryName, setCategoryName] = useState();
  const [quizFinised, setQuizFinised] = useState(false);
  const [gameState, setGameState] = useState({
    curruntQueText: "",
    ansOptions: [],
    correctAns: "",
    optionList: [],
  });
  const fatchData = async () => {
    await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then((response) => response.json())
      .then((data) => {
        setGameState({
          curruntQueText: data.results[curruntQueNo].question,
          ansOptions: data.results[curruntQueNo].incorrect_answers,
          correctAns: data.results[curruntQueNo].correct_answer,
          optionList: data.results[curruntQueNo].incorrect_answers
            .concat(data.results[curruntQueNo].correct_answer)
            .sort(function (a, b) {
              return Math.random() * 2 - 1;
            }),
        });
        setCategoryName(data.results[0].category);
      });
  };
  
  
  const handleOptionSelected = (e, x) => {
    const btnClasslist = e.target.classList;
    let btnoverlay = document.querySelector(".btnOverlay");
    btnoverlay.style.display = "block";
    
    if (gameState.correctAns.toLowerCase() === x.toLowerCase()) {
      btnClasslist.add("btn-success");      
      setScore([score[0] + 1, totalQuestions]);
    } else { btnClasslist.add("btn-danger");}
    setTimeout(function () {
      btnClasslist.remove("btn-success", "btn-danger");
      btnoverlay.style.display = "none";
      handleNextQue();      
    }, 600);
  };

  const handleNextQue = () => {    
    if (curruntQueNo < totalQuestions - 1) { setCurruntQueNo(curruntQueNo + 1); } else { 
      setQuizFinised(true); 
      let ovSC = JSON.parse(localStorage.getItem("score")) + score[0];      
      var ovQA;
      if(JSON.parse(localStorage.getItem("queAttempted")) !== null){
        ovQA =  parseInt(JSON.parse(localStorage.getItem("queAttempted"))) + score[1]
        setOverallscore([ovSC, ovQA]);
        console.log('here')
      }else{
        ovQA = score[1]        
        setOverallscore([ovSC, ovQA]);
        console.log('there')
      }      
      localStorage.setItem("score", JSON.stringify(ovSC));
      localStorage.setItem("queAttempted", JSON.stringify(ovQA));
    }
  };
  
  useEffect(() => {
    fatchData();    
    // eslint-disable-next-line
  }, [curruntQueNo]);

  // const playagain = () => { 
  //   setQuizFinised(false);
  //   setCurruntQueNo(0);    
  //   setScore([]);
  // };

  return (
    <section id="quizPage" className="centerAlignWrap">      
      {!quizFinised && (
        <section className="quizeBox text-center position-relative">
          <h1>Quiz Mode</h1>          
          <Badge className="scoreBadge" pill bg="success">Score: {score[0]}/{score[1]}</Badge>
          <Badge className="correctAnd" bg="dark">Correct Answer <hr className="m-2" />"{gameState.correctAns}"<hr className="m-2"/>For testing purpose only</Badge>
          <hr />
          <Row>
            <Col className="text-start">
              <h5>
                <Badge className="xs-full" bg="secondary">
                  Question: {curruntQueNo + 1}/{totalQuestions}
                </Badge>
              </h5>
            </Col>
            <Col className="text-end">
              <h5>
                <Badge className="xs-full" bg="success">#{categoryName}</Badge>
              </h5>
            </Col>
          </Row>
          <Row className="my-4 pt-2"><Col><h2>{gameState.curruntQueText.length > 0 ? gameState.curruntQueText :  <BiLoaderAlt />}</h2></Col>
          </Row>
          <Row md={2} xs={1} className="position-relative"><div className="btnOverlay"></div>
            {gameState.optionList.map((i, index) => {
              return (<Col className="my-2" key={index}><Button onClick={(e) => {handleOptionSelected(e, i);}} className="optionsCta fullCta" size="lg" variant="primary"> {i} </Button></Col>);
            })}
          </Row>
          <Row className="pt-5">
            <Col className="text-start">
              <Link to="/"><Button variant="danger"> Exit <RxExit /> </Button></Link>
            </Col>
            <Col className="text-end">
              <Button variant="outline-secondary" onClick={handleNextQue}>Skip <BiSkipNext /></Button>
            </Col>
          </Row>
        </section>
      )}
      {quizFinised && (
        <section className="quizeBox mt-2 scoreBoard text-center">
          <h1>Result</h1>
          <hr />
          <h4 className="my-2">{score[0] >= score[1] / 2 ? "Well Done!" : "You can better than this!"}</h4>
          <h5 className="mt-3 mb-4">
            You Scored <Badge pill bg="secondary">{score[0]}/{score[1]}</Badge> in Currunt Quiz.
          </h5>
          <h6>Your Overall Score is <Badge pill bg="success">{overallscore[0]}/{overallscore[1]}</Badge></h6>          
          <hr />
          <Link to="/"><Button variant="primary"><BsRepeat /> Play Again</Button></Link>
        </section>
      )}
    </section>
  );
};

export default Play;
