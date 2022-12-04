drop table if exists expense;
drop table if exists header;
drop table if exists subgroup;
drop table if exists maingroup;
drop table if exists user;
create table user (
    user_id int primary key auto_increment,
    master_id int,
    user_level char(1),
    admin_level char(1),
    email varchar(50),
    pass varchar(80),
    firstname varchar(50),
    familyname varchar(50),
    created datetime,
    lastAccess datetime
);
create table maingroup (
    group_id int primary key auto_increment,
    group_name varchar(30),
    group_user_id int,
    group_acc char(3)
);
create table subgroup (
    subgroup_id int primary key auto_increment,
    subgroup_name varchar(30),
    subgroup_group_id int,
    subgroup_user_id int
);
create table header (
    hd_id int primary key auto_increment,
    hd_user_id int,
    hd_master_id int,
    hd_place_1 varchar(100),
    hd_place_2 varchar(100),
    hd_amount decimal(19,4),
    hd_date date
);
create table expense (
    ex_id int primary key auto_increment,
    ex_user_id int,
    ex_hd_id int,
    ex_group_id int,
    ex_subgroup_id int,
    ex_amount decimal(19,4),
    ex_note varchar(255),
    foreign key (ex_hd_id) references header(hd_id)
);
ALTER TABLE header ADD FOREIGN KEY (hd_user_id) REFERENCES user(user_id);
ALTER TABLE expense ADD FOREIGN KEY (ex_group_id) REFERENCES maingroup(group_id);
ALTER TABLE expense ADD FOREIGN KEY (ex_subgroup_id) REFERENCES subgroup(subgroup_id);
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (1, "Einnahmen", 0, "inc");
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (2, "Haushaltskosten", 0, "exp");
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (3, "Immobilie", 0, "exp");
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (4, "Auto", 0, "exp");
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (5, "Lebensmittel", 0, "exp");
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (6, "Kleidung", 0, "exp");
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (7, "Hobby", 0, "exp");
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (8, "Hygiene", 0, "exp");
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (9, "Spaß", 0, "exp");
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (10, "Andere", 0, "exp");
insert into maingroup (group_id, group_name, group_user_id, group_acc) value (11, "TV, Handy", 0, "exp");
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(1, "Gehalt", 0, 1);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(2, "Andere", 0, 1);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(3, "Strom", 0, 2);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(4, "Gas", 0, 2);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(5, "Heizung", 0, 2);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(6, "Wasser", 0, 2);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(7, "Warmwasser", 0, 2);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(8, "Müll", 0, 2);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(9, "Nebenkosten", 0, 2);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(10, "Andere", 0, 2);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(11, "Kredit", 0, 3);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(12, "Miete", 0, 3);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(13, "Kredit", 0, 4);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(14, "Miete", 0, 4);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(15, "Service", 0, 4);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(16, "Teile", 0, 4);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(17, "Kraftstoff", 0, 4);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(18, "Andere", 0, 4);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(19, "Alles", 0, 5);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(20, "Kleidung", 0, 6);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(21, "Schuhe", 0, 6);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(22, "Alles", 0, 7);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(23, "Alles", 0, 8);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(24, "Alles", 0, 9);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(25, "Alles", 0, 10);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(26, "Möbel", 0, 3);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(27, "Wartung", 0, 3);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(28, "TV", 0, 11);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(29, "Internet", 0, 11);
insert into subgroup (subgroup_id, subgroup_name, subgroup_user_id, subgroup_group_id) values(30, "Handy", 0, 11);
