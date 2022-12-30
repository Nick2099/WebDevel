drop table if exists expense;
drop table if exists header;
drop table if exists account;
drop table if exists account_type;
drop table if exists subgroup;
drop table if exists maingroup;
drop table if exists maingroup_type;
drop table if exists users;
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

create table users (
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
    wrong_logins smallint unsigned,
    locked_until datetime,
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
    foreign key (user_id) references users(id),
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
    foreign key (user_id) references users(id),
    foreign key (master_id) references users(id),
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

# Adding some items to maingroups and subgroups
# default data for basic users - preddefined groups, subgroups and accounts
# ***** IMPORTANT! users have to be added through programm
insert into maingroup (master_id, title, type) values (1, "Income", 1), (1, "Food", 2), (1, "Clothes", 2);
insert into subgroup (maingroup_id, title) values
    (1, "Salary"), (1, "Side job"), (2, "Food"), (2, "Drinks"), (2, "Sweets"), (3, "Clothes"), (3, "Shoes");
insert into account (user_id, type_id, title) values
    (1, 1, "Cash"), (1, 2, "Card 1"), (1,2, "Card 2"), (1,3, "Bank account");
# some data for user 2-Standard and 3-Premium
insert into maingroup (master_id, title, type) values (2, "Income", 1), (2, "Food", 2), (2, "Clothes", 2), (2, "Home", 2);
insert into subgroup (maingroup_id, title) values
    (4, "Salary"), (4, "From rent"), (5, "Food"), (5, "Drinks"), (6, "Accessories"), (6, "Clothes"), (6, "Shoes"), (7, "Electricity"), (7, "Gas"), (7, "Heating");
insert into account (user_id, type_id, title) values
    (2, 1, "Cash"), (2, 2, "Card Debit"), (2,2, "Card Credit"), (2,3, "Bank account");

