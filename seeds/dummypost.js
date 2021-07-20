
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return Promise.all([knex('friends').del(),knex('notification').del(),knex('post').del(),knex('user').del()])
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          "username" : "ray",
          "email" : "ray@ray.com",
          "hash" : "$2b$10$tDlSkKSR\/ukcZXd.cuC\/h.CmobpRFas2vnKrgeI8OmF1lCh5hWUOW",
          "phone" : "123",
          "city" : "Shanghai",
          "description" : "i am here to cat-chup",
          "imgPath" : "\/profilePic\/1626232088300.JPG",
          "bgImgPath" : "\/bgPic\/default_bgImage.jfif"
        },
        {
          "username" : "sim",
          "email" : "sim@sim.com",
          "hash" : "$2b$10$KrJde.Z4tgofueQJPVn1fOxLBmxy6zP\/JOZpq89\/Lqeev2JObVF7C",
          "phone" : "123",
          "city" : "Guangzhou",
          "description" : "i am here to make friends",
          "imgPath" : "\/profilePic\/1626232121561.jfif",
          "bgImgPath" : "\/bgPic\/default_bgImage.jfif"
        },
        {
          "username" : "cas",
          "email" : "c@google.com",
          "hash" : "$2b$10$7dPBzYrPeeAzK9pNoHC81O8QbA.NDJ2fri2MGHs2RWVp0NsrlEOCm",
          "phone" : "",
          "city" : "",
          "description" : "",
          "imgPath" : "\/profilePic\/1626252134927.jpg",
          "bgImgPath" : "\/bgPic\/default_bgImage.jfif"
        },
        {
          "username" : "olive",
          "email" : "o@o.com",
          "hash" : "$2b$10$uj72CdmkK1CGDbCgo0sHremYaBvoTo4IGEbMNkWZFqkApCqCv5cRG",
          "phone" : "123",
          "city" : "Bangkok",
          "description" : "how do you think of the three of us being a group? good!",
          "imgPath" : "\/profilePic\/1626268431273.png",
          "bgImgPath" : "\/bgPic\/1626422073906.jpg"
        },
        {
          "username" : "tifa",
          "email" : "tifa@t.com",
          "hash" : "$2b$10$RmD3PMyucyCXzPVJJZtukuTKIzDQmPPhbGmshzt41on8.C8IKjg4S",
          "phone" : "",
          "city" : "",
          "description" : "",
          "imgPath" : "\/profilePic\/1626669127746.png",
          "bgImgPath" : "\/bgPic\/default_bgImage.jfif"
        },
        {
          "username" : "silence",
          "email" : "sil@sil.com",
          "hash" : "$2b$10$tKk0xAad0n2tx49\/.D8TYumkF7wQkXZrj7iz\/rXGh7lanQKEGw1k.",
          "phone" : "",
          "city" : "",
          "description" : "",
          "imgPath" : "\/profilePic\/1626669239272.png",
          "bgImgPath" : "\/bgPic\/default_bgImage.jfif"
        },
        {
          "username" : "pony",
          "email" : "p@p.com",
          "hash" : "$2b$10$bEPfQdGldL\/bzbJY8W9aB.Ym\/k\/kpDy5eUpxWfivXRD3Ys9p7\/JAq",
          "phone" : "",
          "city" : "",
          "description" : "",
          "imgPath" : "\/profilePic\/1626669600126.jpg",
          "bgImgPath" : "\/bgPic\/default_bgImage.jfif"
        },
        {
          "username" : "titan",
          "email" : "ti@ti.com",
          "hash" : "$2b$10$1kXMX1PtT6.BS6mcWNWjkOfbiM73FkLIF6zz8LrDo6cTjKiykDm9G",
          "phone" : "",
          "city" : "",
          "description" : "",
          "imgPath" : "\/profilePic\/1626673261504.png",
          "bgImgPath" : "\/bgPic\/default_bgImage.jfif"
        },
        {
          "username" : "ion",
          "email" : "Ion@ion.com",
          "hash" : "$2b$10$6PiJqSgJj.v5vQeCwAbIG.jBgZNwn.N7Mkx1YmCe.mXVYBoVhN8.i",
          "phone" : "",
          "city" : "",
          "description" : "",
          "imgPath" : "\/profilePic\/1626673469212.png",
          "bgImgPath" : "\/bgPic\/default_bgImage.jfif"
        },
        {
          "username" : "esther",
          "email" : "es@es.com",
          "hash" : "$2b$10$Gph\/WUUbj59R6Lfgu7WwVOVtRbl8np22weE2jL5\/Jw5deVymT15ci",
          "phone" : "",
          "city" : "",
          "description" : "",
          "imgPath" : "\/profilePic\/1626673668552.jpg",
          "bgImgPath" : "\/bgPic\/default_bgImage.jfif"
        }
        
      ]);
    }).then(function(){
      return knex('friends').insert([
        {
          "username" : "sim",
          "friends_list" : "{\"All Friends\":[],\"Family\":[],\"Work\":[],\"School\":[],\"Close Friends\":[]}"
        },
        {
          "username" : "cas",
          "friends_list" : "{\"All Friends\":[],\"Family\":[],\"Work\":[],\"School\":[],\"Close Friends\":[]}"
        },
        {
          "username" : "ray",
          "friends_list" : "{\"All Friends\":[\"olive\"],\"Family\":[],\"Work\":[],\"School\":[],\"Close Friends\":[]}"
        },
        {
          "username" : "tifa",
          "friends_list" : "{\"All Friends\":[\"olive\"],\"Family\":[\"olive\"],\"Work\":[],\"School\":[],\"Close Friends\":[\"olive\"]}"
        },
        {
          "username" : "silence",
          "friends_list" : "{\"All Friends\":[\"olive\"],\"Family\":[],\"Work\":[],\"School\":[\"olive\"],\"Close Friends\":[]}"
        },
        {
          "username" : "pony",
          "friends_list" : "{\"All Friends\":[\"olive\"],\"Family\":[],\"Work\":[\"olive\"],\"School\":[\"olive\"],\"Close Friends\":[]}"
        },
        {
          "username" : "titan",
          "friends_list" : "{\"All Friends\":[\"olive\"],\"Family\":[],\"Work\":[\"olive\"],\"School\":[],\"Close Friends\":[\"olive\"]}"
        },
        {
          "username" : "esther",
          "friends_list" : "{\"All Friends\":[\"olive\"],\"Family\":[],\"Work\":[\"olive\"],\"School\":[],\"Close Friends\":[\"olive\"]}"
        },
        {
          "username" : "ion",
          "friends_list" : "{\"All Friends\":[\"olive\"],\"Family\":[],\"Work\":[],\"School\":[\"olive\"],\"Close Friends\":[\"olive\"]}"
        },
        {
          "username" : "olive",
          "friends_list" : "{\"All Friends\":[\"ray\",\"tifa\",\"silence\",\"pony\",\"titan\",\"esther\",\"ion\"],\"Family\":[\"ray\"],\"Work\":[],\"School\":[],\"Close Friends\":[]}"
        }
      ])
    }).then(function(){
      return knex('notification').insert([
        {
          "recipient" : "ray",
          "donor" : "sim",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am sim\",\"checked\":[\"Family\",\"Close Friends\"]}",
          "created_at" : "2021-07-14T03:08:58.360Z",
          "solved" : true
        },
        {
          "recipient" : "ray",
          "donor" : "sim",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am sim\",\"checked\":[\"Family\"]}",
          "created_at" : "2021-07-14T07:12:02.465Z",
          "solved" : true
        },
        {
          "recipient" : "ray",
          "donor" : "sim",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am sim\",\"checked\":[\"Family\"]}",
          "created_at" : "2021-07-14T07:13:27.958Z",
          "solved" : true
        },
        {
          "recipient" : "ray",
          "donor" : "sim",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am sim\",\"checked\":[\"Family\",\"Work\"]}",
          "created_at" : "2021-07-14T07:21:03.517Z",
          "solved" : true
        },
        {
          "recipient" : "ray",
          "donor" : "sim",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am sim\",\"checked\":[\"Family\"]}",
          "created_at" : "2021-07-14T07:30:16.180Z",
          "solved" : true
        },
        {
          "recipient" : "sim",
          "donor" : "ray",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am ray\",\"checked\":[\"Family\"]}",
          "created_at" : "2021-07-14T07:39:26.426Z",
          "solved" : true
        },
        {
          "recipient" : "ray",
          "donor" : "olive",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am olive\",\"checked\":[\"Family\"]}",
          "created_at" : "2021-07-15T14:53:56.319Z",
          "solved" : true
        },
        {
          "recipient" : "olive",
          "donor" : "tifa",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am tifa\",\"checked\":[\"Family\",\"Close Friends\"]}",
          "created_at" : "2021-07-19T04:32:29.517Z",
          "solved" : true
        },
        {
          "recipient" : "olive",
          "donor" : "silence",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am silence\",\"checked\":[\"School\"]}",
          "created_at" : "2021-07-19T04:34:11.441Z",
          "solved" : true
        },
        {
          "recipient" : "olive",
          "donor" : "pony",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am pony\",\"checked\":[\"Work\",\"School\"]}",
          "created_at" : "2021-07-19T04:40:18.636Z",
          "solved" : true
        },
        {
          "recipient" : "olive",
          "donor" : "titan",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am titan\",\"checked\":[\"Work\",\"Close Friends\"]}",
          "created_at" : "2021-07-19T05:41:23.721Z",
          "solved" : true
        },
        {
          "recipient" : "olive",
          "donor" : "esther",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am esther\",\"checked\":[\"Work\",\"Close Friends\"]}",
          "created_at" : "2021-07-19T05:48:05.146Z",
          "solved" : true
        },
        {
          "recipient" : "olive",
          "donor" : "ion",
          "type" : "friend_request",
          "content" : "{\"intro\":\"Hey, I am ion\",\"checked\":[\"School\",\"Close Friends\"]}",
          "created_at" : "2021-07-19T05:44:47.580Z",
          "solved" : true
        }
      ])
    }).then(function(){
      return knex('post').insert([
        {
          "owner_name" : "olive",
          "content" : "{\"caption\":\"i am here to say hi~😍\",\"attachPic\":[\"\/postPic\/1626662860314.jpg\",\"\/postPic\/1626662860322.jpg\"]}",
          "created_at" : "2021-07-19T02:47:40.443Z",
          "visible_group" : "All Friends"
        },
        {
          "owner_name" : "silence",
          "content" : "{\"caption\":\"here to shout out i am free!\",\"attachPic\":[]}",
          "created_at" : "2021-07-19T04:38:55.739Z",
          "visible_group" : "All Friends"
        },
        {
          "owner_name" : "pony",
          "content" : "{\"caption\":\"This is only visble to work\",\"attachPic\":[]}",
          "created_at" : "2021-07-19T04:43:51.030Z",
          "visible_group" : "Work"
        },
        {
          "owner_name" : "pony",
          "content" : "{\"caption\":\"i hv a iubuyuyuyb😀\",\"attachPic\":[]}",
          "created_at" : "2021-07-19T04:44:27.165Z",
          "visible_group" : "Family"
        },
        {
          "owner_name" : "pony",
          "content" : "{\"caption\":\"mindset is dying😅\",\"attachPic\":[\"\/postPic\/1626673188337.jpg\"]}",
          "created_at" : "2021-07-19T05:39:48.363Z",
          "visible_group" : "All Friends"
        },
        {
          "owner_name" : "titan",
          "content" : "{\"caption\":\"Got to learn from u is a pleasure🤣\",\"attachPic\":[\"\/postPic\/1626673339181.png\"]}",
          "created_at" : "2021-07-19T05:42:19.196Z",
          "visible_group" : "Close Friends"
        },
        {
          "owner_name" : "titan",
          "content" : "{\"caption\":\"all friends should able to see it😱\",\"attachPic\":[]}",
          "created_at" : "2021-07-19T05:42:42.110Z",
          "visible_group" : "All Friends"
        },
        {
          "owner_name" : "ion",
          "content" : "{\"caption\":\"A reunion on cat-chup cheers🍻\",\"attachPic\":[\"\/postPic\/1626673581766.JPG\"]}",
          "created_at" : "2021-07-19T05:46:21.781Z",
          "visible_group" : "School"
        },
        {
          "owner_name" : "esther",
          "content" : "{\"caption\":\"A big reunion😂 on cat-chup!\",\"attachPic\":[\"\/postPic\/1626673732267.JPG\"]}",
          "created_at" : "2021-07-19T05:48:52.285Z",
          "visible_group" : "All Friends"
        },
        {
          "owner_name" : "esther",
          "content" : "{\"caption\":\"how to make a my post visible to everyone?😃\",\"attachPic\":[]}",
          "created_at" : "2021-07-19T05:49:37.857Z",
          "visible_group" : "Close Friends"
        },
        {
          "owner_name" : "olive",
          "content" : "{\"caption\":\"this should shown immediately!🙄\",\"attachPic\":[\"\/postPic\/1626683691745.jpg\",\"\/postPic\/1626683691753.JPG\",\"\/postPic\/1626683691757.jfif\",\"\/postPic\/1626683691762.jpg\"]}",
          "created_at" : "2021-07-19T08:34:51.808Z",
          "visible_group" : "All Friends"
        },
        {
          "owner_name" : "olive",
          "content" : "{\"caption\":\"again, this should shown immediately😍\",\"attachPic\":[]}",
          "created_at" : "2021-07-19T08:38:23.805Z",
          "visible_group" : "All Friends"
        },
        {
          "owner_name" : "olive",
          "content" : "{\"caption\":\"i want to see new post\",\"attachPic\":[]}",
          "created_at" : "2021-07-19T08:45:07.296Z",
          "visible_group" : "All Friends"
        },
        {
          "owner_name" : "olive",
          "content" : "{\"caption\":\"one more to see\",\"attachPic\":[]}",
          "created_at" : "2021-07-19T08:50:20.625Z",
          "visible_group" : "All Friends"
        },
        {
          "owner_name" : "olive",
          "content" : "{\"caption\":\"one more to see\",\"attachPic\":[]}",
          "created_at" : "2021-07-19T08:51:49.294Z",
          "visible_group" : "All Friends"
        },
        {
          "owner_name" : "olive",
          "content" : "{\"caption\":\"would it appear?\",\"attachPic\":[]}",
          "created_at" : "2021-07-19T08:53:51.208Z",
          "visible_group" : "All Friends"
        }
      ])
    })
};
