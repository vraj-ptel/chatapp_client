import { FileOpen } from "@mui/icons-material";
import { transformImage } from "../../lib/feactures";

const RenderAttachment = ({ file, url }) => {
  switch (file) {
    case "video":
     return <video src={url} preload="none" width="200px" controls></video>;
      break;

    case "image":
     return <img
        src={transformImage(url,200)}
        width="200px"
        height={"200px"}
        style={{ objectFit: "cover" }}
        
      ></img>;
      break;

    case "audio":
        return <audio src={url} preload="none" controls></audio>
        break;

    default:
       return <FileOpen/>
        break;

  }
};

export default RenderAttachment;
