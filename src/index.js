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
  const [count, setCount] = useState(0);
  return (
    <>
    {count}
    <button onClick={()=> setCount(count +1)}>Increment</button>
    </>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
