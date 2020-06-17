import React, { useState, useEffect } from 'react';
import '../assets/Users.css';
import UserDetails from './UserDetails';
import { Dropdown } from 'office-ui-fabric-react';

const Users = () => {
    const [usersList, setUsersList] = useState([]);
    const [userSelected, setUserSelected] = useState({});
    const [userName, setUserName] = useState([]);
    const [isSmalScreen, setIsSmallScreen] = useState(false);

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

    const onWindowResize = () => {
        setIsSmallScreen(window.innerWidth < 480);
    }

    useEffect(() => {
        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);

    function onUserClick(userDetails) {
        usersList.forEach((x) => {
            if(x.name === userDetails.name){
                setUserSelected(x);
            }
        });
    }

    function getHighlightColor(userDetails){
        if(userSelected === userDetails){
            return "#c9daf8"
        }
    }

    const handleUserChange = (evt, option) => {
        usersList.forEach((x) => {
            if(x.name === option.text){
                setUserSelected(x);
            }
        });
    }

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
