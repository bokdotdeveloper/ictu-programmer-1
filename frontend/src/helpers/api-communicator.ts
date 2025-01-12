import axios from "axios";

export const loginUser = async (email:string, password: string) => {
    const res = await axios.post("https://kasubay-ai-server2.vercel.app/user/login", {email,password}, {withCredentials: true});

    if (res.status !== 200){
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
}

export const checkAuthStatus = async () => {
    const res = await axios.get("https://kasubay-ai-server2.vercel.app/user/auth-status");

    if (res.status !== 200){
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
}


export const sendChatRequest = async (message: string) => {
    const res = await axios.post("https://kasubay-ai-server2.vercel.app/chat/new", { message },  {
      withCredentials: true});
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
  };

  export const getUserChats = async () => {
    const res = await axios.get("https://kasubay-ai-server2.vercel.app/chat/all-chats",  {
      withCredentials: true});
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
  };

  export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");
    if (res.status !== 200) {
      throw new Error("Unable to delete chat");
    }
    const data = await res.data;
    return data;
  };

  export const logoutUser = async () => {
    const res = await axios.get("/user/logout",  {
      withCredentials: true});
    if (res.status !== 200) {
      throw new Error("Unable to delete chat");
    }
    const data = await res.data;
    return data;
  };