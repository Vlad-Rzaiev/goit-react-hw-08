import { Box, Modal, Typography } from '@mui/material';
import css from './ConfirmDelete.module.css';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  padding: '24px 32px',
  maxWidth: '400px',
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  textAlign: 'center',
};

export default function ConfirmDelete({ isOpen, onConfirm, onClose, name }) {
  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
    >
      <Box sx={modalStyle}>
        <div className={css.modalWindow}>
          <Typography
            className={css.message}
            id="confirm-delete-title"
            variant="h6"
            component="h2"
          >
            Are you sure you want to delete your contact{' '}
            <span className={css.messageName}>{name}</span>?
          </Typography>
          <div>
            <button
              className={css.yesBtn}
              onClick={onConfirm}
              variant="contained"
              color="primary"
            >
              Yes
            </button>
            <button
              className={css.noBtn}
              onClick={onClose}
              variant="outlined"
              color="secondary"
            >
              No
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
