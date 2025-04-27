import { Typography ,Stack} from '@mui/material'
import React from 'react'
import { BouncingSkelton } from '../styles/StyledComponent'
const Typing = () => {
  return (
    <Stack
    spacing={'0.5rem'}
    direction={"row"}
    padding={"0.5rem"}
    justifyContent={"center"}
    >
        <BouncingSkelton variant='circular' width={15} height={15} style={{animationDelay:"0.1s"}}></BouncingSkelton>
        <BouncingSkelton variant='circular' width={15} height={15} style={{animationDelay:"0.2s"}}></BouncingSkelton>
        <BouncingSkelton variant='circular' width={15} height={15} style={{animationDelay:"0.4s"}}></BouncingSkelton>
        <BouncingSkelton variant='circular' width={15} height={15} style={{animationDelay:"0.6s"}}></BouncingSkelton>
    </Stack>
  )
}

export default Typing
