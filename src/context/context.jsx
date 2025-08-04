// import React, { createContext, useContext } from "react";

// // Create context
// const AppContext = createContext();

// // Create provider
// export const AppProvider = ({ children }) => {
//   const formatResponse = (text) => {
//     if (!text) return "";

//     // Make **bold**
//     const boldFormatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

//     // Replace * with <br/> for line breaks
//     const lineBreaksFormatted = boldFormatted.replace(/\*/g, "<br/>");

//     return lineBreaksFormatted;
//   };

//   return (
//     <AppContext.Provider value={{ formatResponse }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// // Custom hook
// export const useAppContext = () => useContext(AppContext);
