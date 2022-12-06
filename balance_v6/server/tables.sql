drop table if exists expense;
drop table if exists header;
drop table if exists account;
drop table if exists account_type;
drop table if exists subgroup;
drop table if exists maingroup;
drop table if exists maingroup_type;
drop table if exists user_v6;
drop table if exists master_type;
drop table if exists admin_type;

create table master_type (
    id tinyint unsigned primary key auto_increment,
    title varchar(30),
    max_no_of_groups tinyint unsigned,
    max_no_of_subgroups tinyint unsigned,
    max_no_of_users tinyint unsigned
);
insert into master_type (title, max_no_of_groups, max_no_of_subgroups, max_no_of_users) value ('Basic user', 15, 10, 1);
insert into master_type (title, max_no_of_groups, max_no_of_subgroups, max_no_of_users) value ('Standard user', 20, 20, 3);
insert into master_type (title, max_no_of_groups, max_no_of_subgroups, max_no_of_users) value ('Premium user', 30, 30, 10);
insert into master_type (title, max_no_of_groups, max_no_of_subgroups, max_no_of_users) value ('Large Premium user', 50, 100, 50);

create table admin_type (
    id tinyint unsigned primary key auto_increment,
    title varchar(30)
);
insert into admin_type (title) values ('Master user'), ('Support user'), ('Basic user'), ('No admin rights');

create table user_v6 (
    id mediumint unsigned primary key auto_increment,
    master_id mediumint unsigned not null,
    master_type_id tinyint unsigned,
    admin_type_id tinyint unsigned,
    email varchar(50),
    pass varchar(80),
    firstname varchar(50),
    familyname varchar(50),
    created datetime DEFAULT CURRENT_TIMESTAMP,
    last_access datetime,
    stay_loged smallint unsigned,
    foreign key (master_type_id) references master_type(id),
    foreign key (admin_type_id) references admin_type(id)
);

create table maingroup_type (
    id tinyint unsigned primary key auto_increment,
    title varchar(10)
);
insert into maingroup_type (title) values ('Income'), ('Expense'), ('Control'), ('Difference');

create table maingroup (
    id mediumint unsigned primary key auto_increment,
    master_id mediumint unsigned,
    title varchar(30),
    type tinyint unsigned,
    foreign key (type) references maingroup_type(id)
);

create table subgroup (
    id mediumint unsigned primary key auto_increment,
    maingroup_id mediumint unsigned,
    title varchar(30)
);

create table account_type (
    id tinyint unsigned primary key auto_increment,
    title varchar(30)
);
insert into account_type (title) value ('Cash'), ('Card'), ('Account'), ('Rest');

create table account (
    id mediumint unsigned primary key auto_increment,
    user_id mediumint unsigned,
    type_id tinyint unsigned,
    title varchar(30),
    no varchar(50),
    foreign key (user_id) references user_v6(id),
    foreign key (type_id) references account_type(id)
);

create table header (
    id int unsigned primary key auto_increment,
    user_id mediumint unsigned,
    master_id mediumint unsigned,
    datum date,
    place varchar(50),
    city varchar(50),
    amount decimal(19,4),
    account mediumint unsigned,
    foreign key (user_id) references user_v6(id),
    foreign key (master_id) references user_v6(id),
    foreign key (account) references account(id)
);

create table expense (
    id int unsigned primary key auto_increment,
    header_id int unsigned,
    maingroup_id mediumint unsigned,
    subgroup_id mediumint unsigned,
    amount decimal(19,4),
    note varchar(255),
    foreign key (header_id) references header(id),
    foreign key (maingroup_id) references maingroup(id),
    foreign key (subgroup_id) references subgroup(id)
);
