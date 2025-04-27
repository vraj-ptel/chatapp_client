import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../components/constant/config";
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chat", "User", "Message","Dashbord"],
  endpoints: (builder) => ({
    myChat: builder.query({
      query: () => ({
        url: "chat/mychat",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/sendrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: "user/notification",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/acceptrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    getChatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) url = `${url}?populate=true`;
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/messages/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "chat/message",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    myGroup: builder.query({
      query: () => ({
        url: "chat/mygroup",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    availableFriends: builder.query({
      query: (chatId) => {
        console.log("chatIdddd", chatId);
        let url=`user/friends`
        // let url = chatId ? `user/friends` : `user/friends?chatId=${chatId}`;
        if(chatId){
          url+=`?chatId=${chatId}`
        }
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    createGroup: builder.mutation({
      query: ({ name, members }) => {
        return {
          url: "chat/new",
          method: "POST",
          credentials: "include",
          body: { name, members },
        };
      },
      invalidatesTags: ["Chat"],
    }),
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => {
        return {
          url: `chat/${chatId}`,
          method: "PUT",
          credentials: "include",
          body: { name },
        };
      },
      invalidatesTags: ["Chat"],
    }),
    removeMember: builder.mutation({
      query: ({ chatId, userId }) => {
        return {
          url: `chat/removemember`,
          method: "DELETE",
          credentials: "include",
          body: { chatId, userId },
        };
      },
      invalidatesTags: ["Chat"],
    }),
    addMembers: builder.mutation({
      query: ({ chatId, members }) => {
        return {
          url: `chat/addmember`,
          method: "PUT",
          credentials: "include",
          body: { chatId, members },
        };
      },
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => {
        return {
          url: `chat/${chatId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Chat"],
    }),
    leaveGroup: builder.mutation({
      query: (chatId) => {
        return {
          url: `chat/leave/${chatId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Chat"],
    }),
    updateProfile: builder.mutation({
      query: ({name,bio,avatar}) => {
        return {
          url: `user/update`,
          method: "POST",
          credentials: "include",
        };
      },
      invalidatesTags: ["User"],
    }),
    getAdminStats:builder.query({
      query:()=>({
        url:"admin/stats",
        credentials:"include"
      }),
      providesTags:["Dashbord"]
    }),
    getAdminUserData:builder.query({
      query:()=>({
        url:"admin/users",
        credentials:"include"
      }),
      providesTags:["Dashbord"]
    }),
    getAdminChatData:builder.query({
      query:()=>({
        url:"admin/chats",
        credentials:"include"
      }),
      providesTags:["Dashbord"]
    }),
    getAdminMessageData:builder.query({
      query:()=>({
        url:"admin/message",
        credentials:"include"
      }),
      providesTags:["Dashbord"]
    })
  }),
});

export default api;
export const {
  useMyChatQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useGetChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupQuery,
  useAvailableFriendsQuery,
  useCreateGroupMutation,
  useRenameGroupMutation,
  useRemoveMemberMutation,
  useAddMembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useUpdateProfileMutation,
  useGetAdminStatsQuery,
  useGetAdminUserDataQuery,
  useGetAdminChatDataQuery,
  useGetAdminMessageDataQuery
} = api;
