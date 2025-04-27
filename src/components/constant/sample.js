export const sampleChats = [
    {
      avatar: ["https://i.pravatar.cc/150?img=20"],
      name: "John Doe",
      _id: "1",
      groupChat: false,
      members: ["1", "2"],
    },
    {
      avatar: [
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3",
        "https://i.pravatar.cc/150?img=4",
        "https://i.pravatar.cc/150?img=5",
      ],
      name: "John ben",
      _id: "2",
      groupChat: false,
      members: ["3", "4"],
    },
  ];
export const sampleUser=[
  {
    _id:"1",
    name:"abc",
    avatar:"https://i.pravatar.cc/150?img=20"
  },
  {
    _id:"2",
    name:"abc",
    avatar:"https://i.pravatar.cc/150?img=22"
  },
  {
    _id:"3",
    name:"abc",
    avatar:"https://i.pravatar.cc/150?img=23"
  },

]

export const sampleNotifications = [
  {
    sender: {
      avatar:
        "https://i.pinimg.com/originals/ec/b3/32/ecb3320a4cb66ecdd9dd903f1fd6a5d8.png",
      name: "John Doeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    _id: "1",
  },
  {
    sender: {
      avatar:
        "https://i.pinimg.com/originals/ec/b3/32/ecb3320a4cb66ecdd9dd903f1fd6a5d8.png",
      name: "John Doe",
    },
    _id: "1",
  },
];


export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "adkksjf",
        url: "https://i.pinimg.com/originals/ec/b3/32/ecb3320a4cb66ecdd9dd903f1fd6a5d8.png",
      },
    ],
    content: "",
    _id: "dkfjkddjfjflsjf234234",
    sender: {
      _id: "1",
      name: "chaman",
    },
    chat: "chat._id",
    createdAt: new Date().toString(),
  },
  {
    attachments: [],
    content: "hii",
    _id: "dkfjkddjfjflsjf234234",
    sender: {
      _id: "user._id2",
      name: "chaman2",
    },
    chat: "chat._id",
    createdAt: new Date().toString(),
  },
  {
    attachments: [
      {
        public_id: "adkksjf2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "",
    _id: "dkfjkddjfjflsjf234234",
    sender: {
      _id: "user._id2",
      name: "chaman2",
    },
    chat: "chat._id",
    createdAt: new Date().toString(),
  },
  {
    attachments: [],
    content: "hii",
    _id: "dkfjkddjfjflsjf234234",
    sender: {
      _id: "user._id",
      name: "chaman",
    },
    chat: "chat._id",
    createdAt: new Date().toString(),
  },
];

export const sampleTableUser = {
  user:[
    {
      _id: "1",
      avatar: "https://i.pravatar.cc/150?img=1",
      userName: "buzz",
      friends: 2,
      groups: 1,
      name: "buzz",
    },
    {
      _id: "2",
      avatar: "https://i.pravatar.cc/150?img=40",
      userName: "buzz1",
      friends: 2,
      groups: 1,
      name: "buzz1",
    }
  ]
}
export const sampleTableChats = {
  chats: [
    {
      name: "John Doe GROUP",
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://i.pravatar.cc/150?img=15" },
       {_id:'2',avatar: "https://i.pravatar.cc/150?img=14"},
      ],
      totalMembers: "2",
      avatar: ["https://i.pravatar.cc/150?img=20"],
      totalMessages: "12",
      creator: {
        name: "buzz",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      name: "John ben GROUP",
      _id: "2",
      groupChat: false,
      members: [
        {_id:'2',avatar:"https://i.pravatar.cc/150?img=11",},
        {_id:'3',avatar:"https://i.pravatar.cc/150?img=12"},
      ],
      totalMembers: "2",
      avatar: ["https://i.pravatar.cc/150?img=2"],
      totalMessages: "12",
      creator: {
        name: "buz",
        avatar: "https://i.pravatar.cc/150?img=40",
      },
    },
  ],
};
export const sampleTableMessage={
  messages:[
    {
      attachments:[{public_id:'1',url:'https://www.w3schools.com/howto/img_avatar.png'}],
      content:'hii',
      _id:'1',
      sender:{
        _id:'1',
        name:'buzz',
        avatar:'https://i.pravatar.cc/150?img=19'
      },
      chat:'1',
      groupChat:false,
      createdAt:new Date().toString()
    },
    {
      attachments:[{public_id:'2',url:'https://www.w3schools.com/howto/img_avatar.png'}],
      content:'hii',
      _id:'2',
      sender:{
        _id:'2',
        name:'buzz1',
        avatar:'https://i.pravatar.cc/150?img=20'
      },
      chat:'2',
      groupChat:false,
      createdAt:new Date().toString()
    }
  ]
}