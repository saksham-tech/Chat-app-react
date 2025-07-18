import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass } from "phosphor-react";
import { CallElement } from "../../components/CallElement";
import { CallList } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import {faker} from "@faker-js/faker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  const {all_users} = useSelector((state) => state.app);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(FetchAllUsers());
//   }, []);

  console.log(CallList, all_users, "Call List Info");

  

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      
    >
      <DialogTitle>{"Start New Conversation"}</DialogTitle>
      <Stack p={4} sx={{ width: "100%" }}>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Stack>
      <CallElement/>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          
        </Stack>
        
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;