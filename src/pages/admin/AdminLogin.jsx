import { useStrongPassword } from "6pp";
import { Container, Paper, TextField,Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {

  const navigate=useNavigate()
  const {isAdmin}=useSelector(state=>state.auth)
  const dispatch=useDispatch()

  // console.log("is Admin",isAdmin);
  const password = useStrongPassword();

  // !TEMPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
  // const isAdmin=false;

  // SUBMIT HANDLERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(password.value))
    
  };

  if(isAdmin){
     navigate("/admin/dashboard");
     return ;
  }

  useEffect(()=>{
    // console.log("lk");
    dispatch(getAdmin())
  },[dispatch])


  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color='primary'>Login as Admin To Access Dashboard</Typography>
          <form onSubmit={submitHandler}>
          <TextField
                required
                fullWidth
                label="Secrat Key"
               
                type={ "password"}
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
               
              ></TextField>
               <Button
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
                type="submit"
                variant="outlined"
                color="primary"
              >
                Login
              </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AdminLogin;
