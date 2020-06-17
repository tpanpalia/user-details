/*
    This component will be rendered for each user.
    This consists of TextFields for name, emailId, employeeId, role, domain
    USer can submit the editted data (shows alert on submitting the data)
*/
import React, { useState } from 'react';
import {
    TextField,
    PrimaryButton,
    SpinnerSize,
    Spinner
} from "office-ui-fabric-react";

const UserDetails = (props) => {
    const [userInfo, setUserInfo] = useState(props.userData);

    //Function to handle the onchange event for TextFields
    function handleTextFieldChange(item, newValue){
        let userData = { ...userInfo };
        userData[item] = newValue;
        setUserInfo(userData);
    }

    //Function to be called on Submit button click
    const onSubmitClick = () => {
        alert("Form Data Submitted")
    };

    //Function to disable the input fields for 'name' and 'emailId' (should not be editable) 
    const getDisabled = (item) => {
        if(item === "name" || item === "emailId") return true;
        else return false;
    };

    //Returning JSX element
    return (
        <form className="flex-container-item-2">
            {props.userData !== undefined &&
            Object.keys(props.userData).map((item) => {
                return (
                    <div key={item}>
                        <TextField
                            onChange={(e, newValue) => 
                                handleTextFieldChange(item, newValue)
                            }
                            placeholder={props.userData[item]}
                            required
                            disabled={getDisabled(item)}
                        />
                    </div>
                );
            })
            }
            <div>
                <PrimaryButton onClick={onSubmitClick} text="Submit" />
            </div>
        </form>
    )
}

export default UserDetails;