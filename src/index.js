import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import useInput from "./useInput";
import useTabs  from "./useTabs";
import UseTitleApp from "./useTitle";
import useClick from "./useClick";

const Category = styled.h2`
  font-size: 32px;
  background-color: #1C0C5B;
  color: #FAEEE0;
  width: 200px;
  text-align: center;
`;

const Example = styled.h3`
  font-size: 18px;
  color: #1C0C5B;
  text-shadow: 1px 1px 2px blueviolet;
`;

// 
// class App extends React.Component {
//   // state
//   state={
//     count: 0
//   }

//   // function
//   modify = (n) => {
//     this.setState({
//       count: n
//     })
//   }

//   // render
//   render(){
//     const {count} = this.state;
//     return( 
//     <>
//     <div>{count}</div>
//     <button onClick={()=> this.modify(count + 1)}>Increment</button>
//     </>
//     )
//   }
// }

//++++++ use Hooks+++++++
  // ++++++++++++useConfirm++++++++++++++++++++
  // useEffect, useState를 사용하지 않는 함수형 function
  const useConfirm = (message = "", callback, rejection) => {
    if(typeof callback !== "function") {
      return;
    }
    const confirmAction = () => {
      if(window.confirm(message)){
        callback();
      }else{
        rejection();
      }
    };
    return confirmAction;
  };
  
const App = () => {
  // ++++++++++Hooks_useState++++++++++++++++
  const [count, setCount] = useState(0);
  // const [email, setEmail] = useState("");
  // function
  // arrow function
  const DecrementItem = () => setCount(count - 1); 

  // const updateEmail = e => {
  //   const {target: {value}} = e;
  //   setEmail(value);
  // }
  
  const maxL = value => value.length <= 10;
  // value값의 길이가 10보다 작은지 검증. (작다면 true)
  const notMail = value => !value.includes("@");
  // value값에 @가 포함되어있는지 검증. (포함되어있지 않다면 true)
  const isMail = value => value.includes("@");
  // @고 포함되어있다면 true -> 이대로 사용하면 @만 입력가능.
  const name = useInput("Ms.", maxL);
  const email = useInput("Email");

  const content = [
    {
      tab: "Section 1",
      content: "I'm the content of the Section 1",
    },
    {
      tab: "Section 2",
      content: "I'm the content of the Section 2",
    }
    ];
  const { currentTab, changeItem } = useTabs(0, content);
  

  // ++++++++++Hooks_useEffect++++++++++++++++
  const sayHello = () => console.log("hello");
  const [number, setNumber] = useState(0);
  const [aNumber, setANumber] = useState(0);
  useEffect(sayHello, [number]);


  // const titleUpdater = useTitle("Loading...");
  // setTimeout(() => titleUpdater("Home"), 5000);
  UseTitleApp();

  // ++++++++++Hooks_useRef+++++++++++++++
  const input = useRef();
  // component의 부분을 선택할 수 있는 방법 (document.getElementByID()와 같은 기능) _ hrml에 접근이 가능.
  setTimeout(()=> console.log(input), 5000)
  setTimeout(()=> console.log(input.current), 5000)
  setTimeout(()=> console.log(input.current.focus()), 5000)
  // input으로 focus된다.

  // +++++++++++useClick+++++++++++++++++++++
  const sayHi = () => console.log("Hi");
  const title = useClick(sayHi);

  // ++++++++++++useConfirm++++++++++++++++++++
    const deleteWorld = () => console.log("Deleting the world...");
    const abort = () => console.log("Aborted");
    const confirmDelete = useConfirm("Are you sure", deleteWorld, abort);

  // return
  return (
    <>
    <Category>useState</Category>
    {count}
    <button onClick={()=> setCount(count + 1)}>Increment</button>
    <button onClick={DecrementItem}>Decrement</button>

    <Example># useInput</Example>
    {/* <input placeholder="Name" value={name.value} onChange={name.onChange}/> */}
    <input placeholder="Name" {...name}/>
    {/* spread 연산자  */}
    {/* <input placeholder="Email" value={email} onChange={updateEmail} /> */}
    <input placeholder="Email" {...email} />

    <Example># useTabs</Example>
    {content.map((section, index) => <button onClick={()=>changeItem(index)}>{section.tab}</button>)}
    <div>{currentTab.content}</div>

    <Category>useEffect</Category>
    <button onClick={() => setNumber(number + 1)}>{number}</button>
    <button onClick={() => setANumber(aNumber + 1)}>{aNumber}</button>

    <Category>useRef</Category>
    <input ref={input} placeholder="la" />

    <Category>useClick</Category>
    <h3 ref={title}>Hi</h3>

    <Category>useConfirm</Category>
    <button onClick={confirmDelete}>Delete the world</button>
    </>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
