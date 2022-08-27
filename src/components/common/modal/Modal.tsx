// Vendors
import React, { memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: (value?: boolean) => object;
  title: string;
}

const Modal: React.FC<Props> = ({ open, onClose, children, title }) => {
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default memo(Modal);
