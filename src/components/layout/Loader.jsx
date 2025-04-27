import { Grid, Skeleton, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";

const Loader = () => {
  const location=useLocation();
  const loading=location.pathname==="/groups";

  if(location.pathname==='/admin/dashboard'){
    return (
      <>
        <Grid container minHeight={'100vh'}>
            <Grid item md={4} lg={3} sx={{display:{xs:'none',md:'block'}}}>
            <Skeleton   variant="rectangular"  height={'100vh'}/>
            </Grid>
            <Grid item md={8} lg={9} sx={{backgroundColor:'secondary.main'}}>
            <Skeleton variant="rectangular"  height={'100vh'} width={'100%'}><img
              src={
                loading
                  ? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
                  : 'https://images.unsplash.com/photo-1686548812883-9d3777f4c137?h=400&fit=crop&auto=format&dpr=2'
              }
              alt=""
            /></Skeleton>
            </Grid>
        </Grid>
      </>
    )
  }


  if(location.pathname==="/groups"){
    return(
      <>
        <Grid container height={"100vh"}>
        <Grid
          item
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            borderRight:`1px solid primary`
          }}
          sm={4}
        >
          <Skeleton variant="rectangular"  height={'100vh'}><img
              src={
                loading
                  ? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
                  : 'https://images.unsplash.com/photo-1686548812883-9d3777f4c137?h=400&fit=crop&auto=format&dpr=2'
              }
              alt=""
            /></Skeleton>
        </Grid>

        <Grid
          item
          sm={8}
          xs={12}
         
        >
          <Skeleton   variant="rectangular"  height={'100vh'}/>
         
        </Grid>

      </Grid>
      </>
    )
  }
  return (
    <>
      <Grid container height={"calc(100vh - 4rem)"} spacing={'1rem'}>
        <Grid
          item
          sm={4}
          md={3}
          sx={{ display: { xs: "none", sm: "block" } }}
          height={"100%"}
        >
          <Skeleton variant="rectangular"  height={'100vh'}/>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={6}
          height={"100%"}
          
        >
            <Stack spacing={'1rem'}>
            {
            Array.from({length:8}).map((skel,index)=><Skeleton variant="rectangular" key={index} height={'10vh'}/>)
          }  
            </Stack>
         
        </Grid>
        <Grid
          item
          md={4}
          lg={3}
          sx={{
            display: { xs: "none", md: "block" },
           
           
          }}
          height={"100%"}
        >
        <Skeleton variant="rectangular" height={'100vh'}/>
        </Grid>
      </Grid>
    </>
  );
};

export default Loader;
