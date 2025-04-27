import { keyframes, Paper, Skeleton, styled } from "@mui/material";
import {Link as Linkcomponent} from 'react-router-dom'
export const VisullyHiddenInput=styled('input')({
    border:0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
})

export const Link=styled(Linkcomponent)({
    textDecoration:'none',
    color:'inherit',
    cursor:'pointer',
    padding:'1rem',
    '&:hover':{
        color:"primary.main"
    }
})

export const Paperr=styled(Paper)({
    boxShadow: "0 0 0.2rem  rgb(128, 203, 196)",
    borderBottom: "1px solid  rgb(128, 203, 196)"
})

const bounceAnimation=keyframes`
    0% {transform:scale(1);}
    50% {transform:scale(1.2);}
    100% {transform:scale(1);}
`
export const BouncingSkelton = styled(Skeleton)(()=>({
    animation:`${bounceAnimation} 1s infinite`
}))