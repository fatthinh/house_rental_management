create table if not exists house
(
    house_id    integer not null primary key,
    house_name  varchar(255) unique,
    house_price numeric(12, 0),
    house_state varchar(64)
);

create table if not exists house_photo
(
    photo_id  integer not null primary key,
    photo_src varchar(255),
    house_id  integer
        constraint fk_house_photo references house
);

create table if not exists amenity
(
    amenity_id    integer not null primary key,
    amenity_name  varchar(255) unique,
    count_instock integer
);

create table if not exists house_amenity
(
    id         integer not null primary key,
    quantity   integer,
    setup_date timestamp,
    house_id   integer
        constraint fk_house references house,
    amenity_id integer
        constraint fk_amenity references amenity
);

create sequence if not exists house_seq increment by 50;
create sequence if not exists photo_seq increment by 50;
create sequence if not exists amenity_seq increment by 50;
create sequence if not exists house_amenity_seq increment by 50;
create sequence if not exists house_photo_seq increment by 50;