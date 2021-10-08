import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import useInput from "./useInput";
import useTabs  from "./useTabs";
import UseTitleApp from "./useTitle";
import useClick from "./useClick";
import useConfirm from "./useConfirm";
import usePreventLeave from "./usePreventLeave";
import useBeforeLeave from "./useBeforeLeave";
import useFadeIn from "./useFadeIn";
import useNetwork from "./useNetwork";
import { isElementOfType } from "react-dom/test-utils";

const Category = styled.h2`
  font-size: 32px;
  background-color: #1C0C5B;
  color: #FAEEE0;
  width: 300px;
  text-align: center;
`;

const Example = styled.h3`
  font-size: 24px;
  background-color: #FAEEE0;
  color: #1C0C5B;
  width: 300px;
  text-align: center;
`;


//++++++ use Hooks++++++
// +++++useScroll+++++
const useScroll = () => {
  const [state, setState ] = useState({
    x: 0,
    y: 0
  });

  const onScroll = () => {
    console.log("y" , window.scrollY, "x" , window.scrollX);
    setState({
      x: window.scrollX,
      y: window.scrollY
    })
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // event를 추가했으면, 같은 이름과 같은 handler로 지워주는 과정을 잊지 말것.
  });

  return state;
};

// +++++++++++++++++++++++useFullscreen++++++++++++++++++
const useFullscreen = (callback) => {
  const element = useRef();
  const runCb = isFull => {
    if(callback && typeof callback === "function"){
      callback(isFull);
    }
  }
  const triggerFull = () => {
    if(element.current) {
      if(element.current.requestFullscreen){
        element.current.requestFullscreen();
      }else if (element.current.mozRequestFullscreen){
        element.current.mozRequestFullscreen();
      }else if (element.current.webkitRequestFullscreen){
        element.current.webkitRequestFullscreen();
      }else if (element.current.msRequestFullscreen){
        element.current.msRequestFullscreen();
      }
      runCb(true);
    }
  };
  const exitF = () => {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    }else if (document.mozCancelFullscreen){
      document.mozCancelFullscreen();
    }else if (document.webkitExitFullscreen){
      document.webkitExitFullscreen();
    }else if (document.msExitFullscreen){
      document.msExitFullscreen();
    }
    runCb(false);
  };
  return {element, triggerFull, exitF};
};

// +++++++++++++++++++++++useNotification++++++++++++++++++
// Notification API : https://developer.mozilla.org/ko/docs/Web/API/notification
const useNotification = (title, options) => {
  if(!("Notification" in window)){
    return;
  }
  const fireNotif = () => {
    if(Notification.permission !== "granted"){
      Notification.requestPermission().then(permission => {
        if(permission === "granted"){
          new Notification(title, options);
        }else{
          return;
        }
      });
    }else{
      new Notification(title, options);
    }
  };
  return fireNotif;
};


// const App = () => {};
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
  // setTimeout(()=> console.log(input), 5000)
  // setTimeout(()=> console.log(input.current), 5000)
  // setTimeout(()=> console.log(input.current.focus()), 5000)
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

  // +++++++++++++useNetwork+++++++++++++++
    const handleNetworkChange = (online) => {
      console.log(online ? "We just went online" : "We are offline");
    }
    const onLine = useNetwork(handleNetworkChange);


  // +++++++++++++++useScroll+++++++++++++++++++
    const { y } = useScroll();


  // +++++++++++++++++++++++useFullscreen++++++++++++++++++
  const onFulls = (isFull) => {
    console.log(isFull ? "We are FUll" : "We are smol");
  }
  const {element, triggerFull, exitF} = useFullscreen(onFulls);

  // +++++++++++++++++++++++useNotification++++++++++++++++++
  const triggerNotif = useNotification("Can I steal your card?",{
    body: "I love card game."
  });

  // return ()
  return (
    <>
    <Category>useState</Category>
    {count}
    <button onClick={()=> setCount(count + 1)}>Increment</button>
    <button onClick={DecrementItem}>Decrement</button>

    <Example>useInput</Example>
    {/* <input placeholder="Name" value={name.value} onChange={name.onChange}/> */}
    <input placeholder="Name" {...name}/>
    {/* spread 연산자  */}
    {/* <input placeholder="Email" value={email} onChange={updateEmail} /> */}
    <input placeholder="Email" {...email} />

    <Example>useTabs</Example>
    {content.map((section, index) => <button onClick={()=>changeItem(index)}>{section.tab}</button>)}
    <div>{currentTab.content}</div>

    <Category>useEffect</Category>
    <button onClick={() => setNumber(number + 1)}>{number}</button>
    <button onClick={() => setANumber(aNumber + 1)}>{aNumber}</button>

    <Category>useRef</Category>
    <input ref={input} placeholder="la" />

    <Example>useClick</Example>
    <h3 ref={title}>Hi</h3>

    <Example>useConfirm</Example>
    <button onClick={confirmDelete}>Delete the world</button>

    <Example>usePreventLeave</Example>
    <button onClick={enablePrevent}>Protect</button>
    {/* ↑ 버튼을 클릭시 이벤트리스너가 추가되어 이후 페이지를 닫을 때, 확인하는 문구가 출력된다. */}
    <button onClick={disablePrevent}>Unprotect</button>

    <Example>useBeforeLeave</Example>
    <h3>Hello</h3>

    <Example>useFadeIn</Example>
    <h3 {...fadeInH3}>Hello</h3>
    <p {...fadeInP}>lorem ipsum...</p>

    <Example>useNetwork</Example>
    <h3>{onLine ? "Online": "Offline"}</h3>

    <Example>useScroll</Example>
    <h3 style={{color: y > 450 ? "red" : "blue"}}>useScroll</h3>

    <Example>useFullscreen</Example>
    <div ref={element} >
    <img style={{width: "200px"}} src="https://images.unsplash.com/photo-1537420327992-d6e192287183?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=988&q=80"/>
    <button onClick={exitF}>Exit</button>
    </div>
    <button onClick={triggerFull}>Make fullscreen</button>

    <Example>useNotification</Example>
    <button onClick={triggerNotif}>Notification</button>
    
    <Example>useAxios</Example>
    </>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
