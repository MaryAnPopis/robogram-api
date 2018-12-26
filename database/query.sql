create table user
(
  id       int auto_increment
    primary key,
  fullname varchar(75)  null,
  username varchar(26)  null,
  password varchar(25)  null,
  email    varchar(100) null,
  avatar   varchar(200) null
);

create table post
(
  id          int auto_increment
    primary key,
  description varchar(500) null,
  img         varchar(300) null,
  userId      int          null,
  constraint post_ibfk_1
    foreign key (userId) references user (id)
);

create index userId
  on post (userId);


