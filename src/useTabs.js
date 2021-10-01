import React, { useState } from "react";

// useTabs

 const useTabs = (initialTab, allTabs) => {
   const [currentIndex, setCurrentIndex] = useState(initialTab);
   // allTabs가 배열인지 확인하는 과정
   if (!allTabs || !Array.isArray(allTabs)) {
     return;
   };
   return (
     {
       currentTab: allTabs[currentIndex],
       changeItem: setCurrentIndex
     }
   );
 };

 export default useTabs;