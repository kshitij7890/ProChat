/*import React , { useContext,useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

// create context
const AuthContext = React.createContext();

//export entire context
export const useAuth = () => useContext(AuthContext);

//managing users data 
//use react children whenever AuthProvider is used bcoz
//react children renders all jsx you provide to AuthProvider
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory(); //to renavigate somewhere

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if(user){
               history.push('/chats');
            }
        })
    },[user , history]);   // useEffect called whenever we use user object or we renavigate 
 
    const value = {user};

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} 
        </AuthContext.Provider>
    )//showing children components if not loading
};
*/

import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {auth} from '../firebase'

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if (user) history.push('/chats');
        })
    }, [user, history])
    
    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}