import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
    
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    
    const handleLogOut = async () => {
        await auth.signOut();
        history.push("/");
      };

    const getFile = async (url) => {
       const response = await fetch(url);
       const data = await response.blob(); //blob contains img
    
       return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
    };  

      useEffect(() => {
        if (!user) {
          history.push("/");
          return;
        }
    
        axios
          .get("https://api.chatengine.io/users/me", {
            headers: {
              "project-id": "3ff2d8fb-cf81-4199-82a0-e2ba95d9a1b8",
              "user-name": user.email,
              "user-secret": user.uid,
            },
          })
          .then(() => {
            setLoading(false);
          })
          .catch(() => {//when we dont already have a chatengine profile
            let formdata = new FormData();
            formdata.append("email", user.email);
            formdata.append("username", user.email);
            formdata.append("secret", user.uid);
    
            getFile(user.photoURL).then((avatar) => {
              formdata.append("avatar", avatar, avatar.name);
    
              axios
                .post("https://api.chatengine.io/users/", formdata, {
                  headers: {
                    "private-key": "d139d50c-4ecf-42e5-8b9a-8380215ae927",
                  },
                })
                .then(() => setLoading(false))
                .catch((error)=> console.log(error))
            });
          });
      }, [user, history]);  


    //if(!user || loading) return 'Loading...';
    if(!user) history.push("/");
    console.log("user")
    console.log(user);
    console.log("loading")
    console.log(loading)

    return (
        <div className="chats-page">
          <div className="nav-bar">
            <div className="logo-tab">ProChat</div>
            <div className="logout-tab" onClick={handleLogOut}>
              Log Out
            </div>
          </div>
          <ChatEngine
            height="calc(100vh - 66px)"
            projectID="3ff2d8fb-cf81-4199-82a0-e2ba95d9a1b8"
            userName={user == null ? "" : user.email}
            userSecret={user == null ? "" : user.uid}
          />
        </div>
      );
  };
  
  export default Chats;

