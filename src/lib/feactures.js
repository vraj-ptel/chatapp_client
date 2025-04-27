import moment from "moment";

export const transformImage = (url = "", width = 200) => {
  // const newUrl=url.replace('upload/',`upload/dpr_auto/w_${width}/`)
  //   return newUrl;
  return url;
};

export const fileFormat = (url) => {
  const fileExtention = url.split(".").pop();
  if (
    fileExtention  == "mp4" ||
     fileExtention === "webm" ||
     fileExtention === "ogg"
  ) {
    return "video";
  }
  if ( fileExtention === "mp3" ||  fileExtention === "wav") {
    return "audio";
  }
  if (
     fileExtention === "jpg" ||
     fileExtention === "jpeg" ||
     fileExtention === "png" ||
     fileExtention === "gif"
  ) {
    return "image";
  }
  return "file";
};

export const getLast7Days=()=>{ 
  const curDate=moment();
  const last7Days=[];
  for(let i=0;i<7;i++){
    last7Days.unshift(curDate.format(' ddd '));
    
    curDate.subtract(1,'days');
  }
  return last7Days
}


export const getOrSave=({key,value,get})=>{
  if(get){
    return localStorage.getItem(key)? JSON.parse(localStorage.getItem(key)):null
  }
  else{
    localStorage.setItem(key,JSON.stringify(value));
  
  }
}