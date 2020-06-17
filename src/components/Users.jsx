/*
    Component fetches the user data from API.
    For Each user 'UserDetails' component is rendered to display user details.
    When the screen size reduces to 480, the list of users is populated in dropdown
*/

import React, { useState, useEffect } from 'react';
import '../assets/Users.css';
import UserDetails from './UserDetails';
import { Dropdown } from 'office-ui-fabric-react';

const Users = () => {
    const [usersList, setUsersList] = useState([]);
    const [userSelected, setUserSelected] = useState({});
    const [userName, setUserName] = useState([]);
    const [isSmalScreen, setIsSmallScreen] = useState(false);

    //hook to fetch the user data from API and also to populate the dropdown options (when screen size is less than 480)
    useEffect(() => {
        fetch("http://www.mocky.io/v2/5e55294d31000029b7eb36fb")
        .then((response) => response.json())
        .then((data) => {
            data.sort((a,b) => a.name > b.name ? 1 : -1);
            setUsersList(data);
            setUserSelected(data[0]);
            let users = [];
            data.map((x) => {
                users.push({
                    key: x.name,
                    text: x.name
                });
                return null;
            })
            setUserName(users);
        })
    }, []);

    //Function to chech the screen size and set the isSmallScreen flag
    const onWindowResize = () => {
        setIsSmallScreen(window.innerWidth < 480);
    }

    //Hook to capture the resize event
    useEffect(() => {
        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);

    //Function to handle the onClick event for div to display the selected user details
    function onUserClick(userDetails) {
        usersList.forEach((x) => {
            if(x.name === userDetails.name){
                setUserSelected(x);
            }
        });
    }

    //Function to change the background color for the selected user
    function getHighlightColor(userDetails){
        if(userSelected === userDetails){
            return "#c9daf8"
        }
    }

    //Function to handle dropdown onChange event (when screen size is less than 480)
    const handleUserChange = (evt, option) => {
        usersList.forEach((x) => {
            if(x.name === option.text){
                setUserSelected(x);
            }
        });
    }

    //returning JSX element
    return(
        <>
            {isSmalScreen ? (
                <div className="flex-container-small">
                    <Dropdown
                        placeholder={userSelected.name}
                        options={userName}
                        onChange={handleUserChange}
                    />
                    <div>
                        <UserDetails userData={userSelected} />
                    </div>
                </div>
            ) : (
                <div className="flex-container">
                    <div className="flex-container-item-1">
                        {usersList.map((x) => {
                            return(
                                <div 
                                    key={x.name} 
                                    style={{backgroundColor : getHighlightColor(x) }} 
                                    onClick={() => onUserClick(x)}
                                >
                                    {x.name}
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ width : '25%' }}>
                        <UserDetails userData={userSelected} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Users;
