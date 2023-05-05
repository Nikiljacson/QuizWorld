import React, { useState } from 'react';
import './Quiz.css';
import opensound from '../Assets/opensound.mp3';
import wow from '../Assets/wow.mp3';
import awesome from '../Assets/awesome.mp3';
import average from '../Assets/average.mp3';
import poor from '../Assets/poor.mp3';
import beep from '../Assets/beep.mp3';

function Quiz() {
    const [questions,setQuestions] = useState('');
    const [answer,setAnswer] = useState();
    const [count,setCount] = useState(1);
    const [correctAns,setCorrectAns] = useState();
    const [countCrtAns,setCountCrtAns] = useState(0);
    const [startQuiz,setStartQuiz] = useState(false);

    const encodedText = questions;
    const parser = new DOMParser();
    const decodedText = parser.parseFromString(`<!doctype html><body>${encodedText}`,'text/html').body.textContent;

  
    const Q_url="https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean";
 
    const handleRst=()=>{
        <audio autoPlay unmuted="true">
        <source src={opensound} type="audio/mp3"></source>
        Your browser does not support the audio element.
        </audio>
        setCount(1);
        setCountCrtAns(0);
        setQuestions('');
        setAnswer('');
        setCorrectAns('');
        setStartQuiz(false);
        window.location.reload(true);
    }


        const ques= async()=>{        
        const resp= await fetch(Q_url);
        const data= await resp.json();
        console.log(data.results[0].correct_answer);
        setQuestions(data.results[0].question); 
        setAnswer(data.results[0].correct_answer);
        setCount(count+1);
        console.log(count);   
        setStartQuiz(true);
        // AudioPlayer();
  }
  
    const btnSound=()=>{
        return(
            <audio autoPlay unmuted="true">
            <source src={beep} type="audio/mp3"></source>
            </audio>
        );
    }

      const handleAns=(ans)=>{
        btnSound();
        if(ans===answer){
            console.log("correct");
            setCorrectAns("Correct");
            setCountCrtAns(countCrtAns+1);
            ques();
        }
        else{
            console.log("wrong");
            setCorrectAns("Wrong");
            ques();
        }
      }

    //   function AudioPlayer() {
    //     console.log("audio");

    //     return (
    //       <div>
    //         <audio src={opensound} autoPlay>
    //           Your browser does not support the audio element.
    //         </audio>
    //       </div>
    //     );
    //   }
  return (
    <div className='quiz-container'>
    <div className={startQuiz?"quiz-started":"quiz"}> 
        <h1><span id='Q_effect'>Quiz</span> World</h1>
        {count===1 &&
            <>
            <button onClick={()=>{ques()}} id='startBtn'>Start Quiz</button>
            <audio autoPlay unmuted="true">
            <source src={opensound} type="audio/mp3"></source>
            </audio>
            </>
        }                
        {count===12 && 
        <>
        <h4 id='score'>Your total score is <h4 id='score_got'>{countCrtAns}/10</h4></h4>  
        <button onClick={()=>{handleRst()}} id='rstBtn'>Restart</button>
        </>              
        }
        {(count>=2 && count<=11) &&
            <div>
            <h2 id='q-no'>Question no: <span id='Q_no'>{count-1}</span></h2>
            <h3 id='question'>{decodedText}</h3>
              
            </div>
        }
        {(count>1 && count<=11) &&
          <>
          {/* <button onClick={()=>{ques()}}>Next</button> */}  
          
          <button onClick={() => {handleAns("True"); } } id='trueBtn'>True</button>
          <button onClick={() => {handleAns("False");} } id='falseBtn'>False</button>
          </>  
        }
        {(count > 2 && count<=11) &&
            <div>
                <h4 id='crtAnsCount'>Correct Answers: <h4 id='crt_ans'>{countCrtAns}</h4></h4>
            <h4 id='crtAns'>Last Answer: <h4 id='crt_ans'>{correctAns}</h4></h4>
            </div>     
        }

        {(count===12 && countCrtAns<4)&&
        <div>
            <h1>You Are Very <span id='poor'>Poor</span></h1>
            <audio autoPlay unmuted="true">
            <source src={poor} type="audio/mp3"></source>
            </audio>
        </div>
        }
        {(count===12 && (countCrtAns>=4 && countCrtAns<=6))&&
        <div>
            <h1>You Are <span id='average'>Average</span></h1>
            <audio autoPlay unmuted="true">
            <source src={average} type="audio/mp3"></source>
            </audio>
        </div>
        }
        {(count===12 && (countCrtAns>=7 && countCrtAns<=9))&&
        <div>
            <h1>You Are <span id='awesome'>Awesome</span></h1>
            <audio autoPlay unmuted="true">
            <source src={awesome} type="audio/mp3"></source>
            </audio>
        </div>
        }
        {(count===12 && countCrtAns===10)&&
        <div>
            <h1 id='fantastic'>Fantastic</h1>
            <audio autoPlay unmuted="true">
            <source src={wow} type="audio/mp3"></source>
            </audio>
        </div>
        }
    </div>
    </div>
  );
}
export default Quiz;