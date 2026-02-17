// import React, { useState } from "react";
// import "./Sidebar.css";
// import { assets } from "../../assets/assets";

// const Sidebar = () => {
//   const [extend, setExtend] = useState(false);

//   return (
//     <div className="sidebar">
//       <div className="top">
//         <img
//           onClick={() => setExtend((prev) => !prev)}
//           src={assets.menu_icon}
//           alt=""
//           className="menu"
//         />
//         <div className="new-chat">
//           <img src={assets.plus_icon} alt="" />
//           {extend ? <p>New Chat</p> : null}
//         </div>
//         {extend ? (
//           <div className="recent">
//             <p className="recent-title">Recent</p>
//             <div className="recent-entry">
//               <img src={assets.message_icon} alt="" />
//               <p>what is react ...</p>
//             </div>
//           </div>
//         ) : null}
//       </div>

//       <div className="bottom">
//         <div className="bottom-item recent-entry">
//           <img src={assets.question_icon} alt="" />
//           {extend ? <p>Help</p> : null}
//         </div>
//         <div className="bottom-item recent-entry">
//           <img src={assets.history_icon} alt="" />
//           {extend ? <p>Activities</p> : null}
//         </div>
//         <div className="bottom-item recent-entry">
//           <img src={assets.setting_icon} alt="" />
//           {extend ? <p>Setting</p> : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// src/components/Sidebar/Sidebar.jsx
import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { ChatContext } from "../../context/context";

const Sidebar = () => {
  const [extend, setExtend] = useState(false);
  const { chats, selectChat, startNewChat } = useContext(ChatContext);

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtend((prev) => !prev)}
          src={assets.menu_icon}
          alt=""
          className="menu"
        />
        <div className="new-chat" onClick={startNewChat}>
          <img src={assets.plus_icon} alt="" />
          {extend && <p>New Chat</p>}
        </div>

        {extend && (
          <div className="recent">
            <p className="recent-title">History</p>
            {chats.length === 0 ? (
              <p>No chats yet</p>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className="recent-entry"
                  onClick={() => selectChat(chat)}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{chat.title}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extend ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extend ? <p>Activities</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extend ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
