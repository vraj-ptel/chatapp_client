import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Protectedroute } from "./components/auth/Protectedroute";
import Loader from "./components/layout/Loader";
import axios from "axios";
import { server } from "./components/constant/config";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reduser/auth"  ;
import { Toaster } from "react-hot-toast";

import { NEW_MESSAGE_ALERT } from "./components/constant/event";
import { useSocketEvents } from "./hook/hook";
import { SocketProvider } from "../socket";


const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const UpdateProfile=lazy(()=>import("./components/specific/UpdateProfile"));
const Notfound = lazy(() => import("./pages/Notfound"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));

const App = () => {
  // let user = true;
  const { user, loader } = useSelector((state) => state.auth);
  // const {chatId}=useSelector((state)=>state.misc);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then((res) => {
        dispatch(userExist(res.data.user));
        // console.log(res);
      })
      .catch((err) => dispatch(userNotExist()));
  }, []);

  // const newMsgAlertHandler = useCallback((data) => {
  //       console.log(data,"data");
  //       if(chatId === data.chatId){
          
  //         return ;
  //       } ;
  //       notify.play();
        
  //       dispatch(setNewMessageAlert(data));
  //     }, [chatId]);
  //     const eventArgs=
  //     {
  //       [NEW_MESSAGE_ALERT]:newMsgAlertHandler,
  //     }
  //     useSocketEvents(socket)
      
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              element={
                <SocketProvider>
                  <Protectedroute user={user}  />  
                </SocketProvider>
              }
            >
              <Route path="/" element={<Home />}></Route>
              <Route path="/chat/:chatId" element={<Chat />}></Route>
              <Route path="/group" element={<Groups />}></Route>
              <Route path="/update" element={<UpdateProfile />}></Route>
            </Route>
            
            <Route
              path="/login"
              element={
                <Protectedroute user={!user} redirect={"/"}>
                  <Login />
                </Protectedroute>
              }
            ></Route>
            {/* adminnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/chat" element={<ChatManagement />} />
            <Route path="/admin/user" element={<UserManagement />} />
            <Route path="/admin/message" element={<MessageManagement />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Suspense>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
