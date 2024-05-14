import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function BasicDialog({ open, onClose, userData, onSave }) {
    const [updatedUser, setUpdatedUser] = useState(userData); // State to track changes

    const handleInputChange = (event, key) => {
        const { value } = event.target;
        setUpdatedUser(prevUser => ({
            ...prevUser,
            [key]: value
        }));
    };

    const handleSave = () => {
        onSave(updatedUser); // Save changes and pass back to parent
        onClose(); // Close the modal
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Basic Modal
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: '8px', right: '8px' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <label htmlFor='name'>Name:</label>
                <TextField fullWidth id="name" name='name' value={updatedUser.name} onChange={(event) => handleInputChange(event, 'name')} />
                <label htmlFor='email'>Email:</label>
                <TextField fullWidth id="email" name='email' value={updatedUser.email} onChange={(event) => handleInputChange(event, 'email')} />
                <label htmlFor='phone'>Phone:</label>
                <TextField fullWidth id="phone" name='phone' value={updatedUser.phone} onChange={(event) => handleInputChange(event, 'phone')} />
                <label htmlFor='website'>Website:</label>
                <TextField fullWidth id="website" name='website' value={updatedUser.website} onChange={(event) => handleInputChange(event, 'website')} />
                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSave}>
                        Ok
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
