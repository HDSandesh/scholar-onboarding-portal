import { ActionSheet, Button } from '@ui5/webcomponents-react';
import React, { useRef, useState } from 'react'

const ActionSheetComponent = ({user,isActive, editUser, deleteUser, sendResetPasswordMail, handleLockUnlockUser, viewProfile}) => {
    const buttonRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleOpenerClick = (e) => {
      setOpen((prev) => !prev);
    };
    return (
      <>
        <Button ref={buttonRef} onClick={handleOpenerClick}>
          Actions
        </Button>
        <ActionSheet opener={buttonRef.current} open={open} onClose={handleOpenerClick}>
        <Button icon="show" onClick={()=> viewProfile(user)}>View Profile</Button>
        <Button icon="edit" onClick={()=>editUser(user)}>Edit</Button>
        <Button icon="reset" onClick={()=> sendResetPasswordMail(user.id)}>Reset Password</Button>
        {isActive?<Button icon="decline" onClick={()=> handleLockUnlockUser(user.id, 'lock')}>Lock User</Button>:<Button icon="accept" onClick={()=> handleLockUnlockUser(user.id, 'unlock')}>Unlock User</Button>}
        <Button icon="delete" onClick={()=> deleteUser(user.id)}>Delete</Button>
        </ActionSheet>
      </>
    );
  }

export default ActionSheetComponent
