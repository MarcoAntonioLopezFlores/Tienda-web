import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const DialogComponent = ({ load,toogleDialogo, open,title, contentForm:ContentForm, object, enableClick }) => {
  
  const handleDialogo = () => {
    toogleDialogo(false);
  };

  return (
    <Dialog
        fullWidth={true}
        maxWidth={"sm"} 
        open={open}
        disableBackdropClick={enableClick!==undefined?enableClick:true}
        onClose={handleDialogo} 
        aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <ContentForm load={load} object={object} toogleDialogo={toogleDialogo}/>
      </DialogContent>
    </Dialog>

  )
}

export default DialogComponent
