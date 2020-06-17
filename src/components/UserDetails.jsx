import React, { useState } from 'react';
import {
    TextField,
    PrimaryButton,
    SpinnerSize,
    Spinner
} from "office-ui-fabric-react";

const UserDetails = (props) => {
    const [userInfo, setUserInfo] = useState(props.userData);

    function handleTextFieldChange(item, newValue){
        let userData = { ...userInfo };
        userData[item] = newValue;
        setUserInfo(userData);
    }

    const onSubmitClick = () => {
        alert("Form Data Submitted")
    };

    const getDisabled = (item) => {
        if(item === "name" || item === "emailId") return true;
        else return false;
    };

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