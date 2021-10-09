import { useState, useEffect } from "react";

// useEffect _ useTitle
const useTitle = (initialTitle) => {
   const [title, setTitle] = useState(initialTitle);
   const updateTitle = () => {
     const htmlTitle = document.querySelector("title")
     htmlTitle.innerText = title;
   }
   useEffect(updateTitle, [title]);
   return setTitle;
 }

 const UseTitleApp = () => {
   const titleUpdater = useTitle("Loading...");
   setTimeout(() => titleUpdater("Home"), 5000);
   return;
 };

 export default UseTitleApp;