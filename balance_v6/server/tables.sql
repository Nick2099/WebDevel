drop table if exists expense;
drop table if exists header;
drop table if exists subgroup;
drop table if exists maingroup;
drop table if exists user;

create table user (
    id mediumint unsigned primary key auto_increment,
    master_id mediumint unsigned not null,
    master_type char(1),
    admin_level char(1),
    email varchar(50),
    pass varchar(80),
    firstname varchar(50),
    familyname varchar(50),
    created datetime DEFAULT CURRENT_TIMESTAMP,
    last_access datetime,
    stay_loged smallint unsigned
);

create table maingroup (
    id mediumint unsigned primary key auto_increment,
    master_id mediumint unsigned,
    title varchar(30),
    kind char(1)
);

create table subgroup (
    id mediumint unsigned primary key auto_increment,
    maingroup_id mediumint unsigned,
    title varchar(30)
);

create table header (
    id int unsigned primary key auto_increment,
    user_id mediumint unsigned,
    master_id mediumint unsigned,
    datum date,
    place varchar(50),
    city varchar(50),
    amount decimal(19,4),
    account mediumint unsigned
);

create table expense (
    id int unsigned primary key auto_increment,
    header_id int unsigned,
    maingroup_id mediumint unsigned,
    subgroup_id mediumint unsigned,
    amount decimal(19,4),
    note varchar(255),
    foreign key (header_id) references header(id)
);
