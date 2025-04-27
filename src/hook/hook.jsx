import { useEffect ,useState} from "react"
import toast from "react-hot-toast"

const useError=(error=[])=>{
    useEffect(()=>{
        error.forEach(({isError,error,fallback})=>{
            if(isError){
                if(fallback)fallback();
                toast.error(error?.data?.message ||"something went wrong");
            }
        })
    },[error])
}

const useAsyncMutation=(mutationHook)=>{
    const [isLoading,setIsLoading]=useState(false);
    const [data,setData]=useState(null);
    const [mutate]=mutationHook();

    const executeMutation=async(toastMessage,...args)=>{
        setIsLoading(true);
        const toastId=toast.loading(toastMessage || "updating data...");
        try{
            const res=await mutate(...args);
            if(res?.data){
                setData(res.data);
                console.log(res.data);
                toast.success(res.data.message || "updated data successfully",{id:toastId})
            }else{
                toast.error(res?.error?.data?.message || "something went wrong",{id:toastId})
            }
            setIsLoading(false);
        }
        catch(err){
            console.log(err);
            toast.error(err.data.message ||"something went wrong",{id:toastId})
        }finally{
            setIsLoading(false)
        }
    }
    return [executeMutation,isLoading,data]
}

const useSocketEvents=(socket,handlers)=>{
    useEffect(()=>{
        Object.entries(handlers).forEach(([event,handler])=>{
            socket.on(event,handler);
        })
        return ()=>{
            Object.entries(handlers).forEach(([event,handler])=>{
                socket.off(event,handler);
            })
        }
    },[socket,handlers])
}
export {useError,useAsyncMutation,useSocketEvents}