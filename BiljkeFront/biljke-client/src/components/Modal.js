import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import { StylesProvider } from '@material-ui/core';
import styles from '../styles/Modals.module.css'

//import styles from '../styles/CreateBiljka.module.css'


export default function Modal({isOpen, handleOpen,title,icon,modalClass,children}) {
    return (
        <div>
            <div className={modalClass}>
                <Fab variant="round" size='small' onClick={handleOpen}>
                    {icon}
                </Fab>
            </div>
            <Dialog id="dialog" open={isOpen} onClose={handleOpen} >
                <DialogTitle className={styles.modalTitle} id="dialogTitle">{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    )
}

