import React from 'react'
import {Error} from "@mui/icons-material"
import { Container, Typography,Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import Title from '../components/shared/title'
const Notfound = () => {
  return (<>
    <Title title='not found'/>
    <Container sx={{height:'100vh',width:'100vw',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <Stack alignItems={"center"}>
        <Error color="error" sx={{fontSize:'10rem'}} />
        <Typography variant="h1">
          404
        </Typography>
        <Typography variant='h2'>
          Page Not Found
        </Typography>
        <Link style={{textDecoration:'none',color:"lightgray"}} to={'/'}>Go Back To Home</Link>
      </Stack>
    </Container>
    </>
  )
}

export default Notfound