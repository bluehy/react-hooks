import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import useInput from "./useInput";
import useTabs  from "./useTabs";
import UseTitleApp from "./useTitle";
import useClick from "./useClick";
import useConfirm from "./useConfirm";

const Category = styled.h2`
  font-size: 32px;
  background-color: #1C0C5B;
  color: #FAEEE0;
  width: 300px;
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

// +++++++++++++usePreventLeave++++++++++
const usePreventLeave = () => {
  const listener = (e) => {
    e.preventDefault();
    // 페이지를 나가기 전에 작동될 수 있게끔 해주고,
    e.returnValue = "";
    // 이 코드가 없는 경우, reload한 후에 해당 이벤트가 더 추가가 되지 않는다.
  }
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () => window.removeEventListener("beforeunload", listener);
  return {enablePrevent, disablePrevent};
};
  

// ++++++++++++useBeforeLeave+++++++++++++
const useBeforeLeave = (onBefore) => {
  const handle = (event) => {
    // console.log("leaving");
    // console.log(event);
    const { clientY } = event;
    if(clientY <= 0 ) {
      // 위로 벗어났을 때(clientY<=0)에만 function이 작동하게 된다.
      onBefore();
    }
  }
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave",handle);
  },[]);

  if(typeof onBefore !== "function") {
    return;
  }
};

// +++++++++useFadeIn+++++++++++++++++++++++
const useFadeIn = (duration = 1, delay = 0) => {
  const element = useRef();
  useEffect(()=>{
    if(typeof duration !== "number" || typeof delay !== "number"){
      return;
    }
    if(element.current){
      const {current} = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  },[]);
  return {ref : element, style: {opacity:0}};
}


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

  // +++++++++++++usePreventLeave++++++++++
    const {enablePrevent, disablePrevent} = usePreventLeave();
    // 이벤트가 발생하면 브라우져가 이벤트 정보를 담은 객체를 생성해서 핸들러의 인수 형태로 전달해 주기 때문에 자동으로 들어가지는 겁니다.
    // 저거 json으로 리턴한 거에요. 실제로 따지고보면
    // {
    //   enablePrevent : enablePrevent,
    //   disablePrevent: disablePrevent,
    // }
    // 를 축약해서 작성한 것이고 값을 받아 오려면 해당 함수명을 가지고 와야겠죠.

  // ++++++++++useBeforeLeave +++++++++++++++++
    const begForLife = () => console.log("Pls don't leave.");
    useBeforeLeave(begForLife);

    
  // +++++++++useFadeIn++++++++++++++++++++++++
    const fadeInH3 = useFadeIn(2);
    const fadeInP = useFadeIn(2,2);

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

    <Category>usePreventLeave</Category>
    <button onClick={enablePrevent}>Protect</button>
    {/* ↑ 버튼을 클릭시 이벤트리스너가 추가되어 이후 페이지를 닫을 때, 확인하는 문구가 출력된다. */}
    <button onClick={disablePrevent}>Unprotect</button>

    <Category>useBeforeLeave</Category>
    <h3>Hello</h3>

    <Category>useFadeIn</Category>
    <h3 {...fadeInH3}>Hello</h3>
    <p {...fadeInP}>lorem ipsum...</p>

    </>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
