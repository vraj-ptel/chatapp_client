import { Dialog, Stack, Button, Typography, DialogTitle, Box } from "@mui/material";
import { memo } from "react";

const ConfirmDeleteDialog = ({
  open,
  handleClose,
  deleteHandler,
}) => {
  
  return (
    <>
      <Dialog open={open} onClose={handleClose}  >
        <Stack
          bgcolor={"secondary.main"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          padding={'1rem'}
          width={'fit-content'}
          gap={'4vh'}
         
        >
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <DialogTitle color='error'>Confirm Delete</DialogTitle>
            <Typography>Are You Sure You Want To Delete This Group?</Typography>
            </Box>
            <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color='error' onClick={deleteHandler}>Delete</Button>
            </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default memo(ConfirmDeleteDialog);
