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
  // Hooks
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  
  // function
  const updateEmail = e => {
    const {target: {value}} = e;
    setEmail(value);
  }

  // return
  return (
    <>
    {count}
    <button onClick={()=> setCount(count + 1)}>Increment</button>
    <button onClick={()=> setCount(count - 1)}>Decrement</button>
    <input placeholder="Email" value={email} onChange={updateEmail} />
  
    </>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
