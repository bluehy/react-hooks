import React, { useState } from "react";
import ReactDOM from "react-dom";

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
const App = () => {
  // Hooks_useState
  const [count, setCount] = useState(0);
  // const [email, setEmail] = useState("");
  // function
  // arrow function
  const DecrementItem = () => setCount(count - 1); 

  // const updateEmail = e => {
  //   const {target: {value}} = e;
  //   setEmail(value);
  // }
  
  // useInput
  // value값을 검증하는 검증 단계 추가
  const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
      // console.log(event.target)
      const {
        target : {value}
      } = event;
      let willUpdate = true;
      if(typeof validator === "function"){
        willUpdate = validator(value);
      }
      if(willUpdate){
        setValue(value);
      }
    }
    return { value, onChange };
  }


  // return
  const maxL = value => value.length <= 10;
  // value값의 길이가 10보다 작은지 검증. (작다면 true)
  const notMail = value => !value.includes("@");
  // value값에 @가 포함되어있는지 검증. (포함되어있지 않다면 true)
  const isMail = value => value.includes("@");
  // @고 포함되어있다면 true -> 이대로 사용하면 @만 입력가능.
  const name = useInput("Ms.", maxL);
  const email = useInput("Email");
  return (
    <>
    <h2>useState</h2>
    {count}
    <button onClick={()=> setCount(count + 1)}>Increment</button>
    <button onClick={DecrementItem}>Decrement</button>

    <h3>-useInput</h3>
    {/* <input placeholder="Name" value={name.value} onChange={name.onChange}/> */}
    <input placeholder="Name" {...name}/>
    {/* spread 연산자  */}
    {/* <input placeholder="Email" value={email} onChange={updateEmail} /> */}
    <input placeholder="Email" {...email} />

    <h3>-useTabs</h3>

    </>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
