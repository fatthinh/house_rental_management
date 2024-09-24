create table if not exists category
(
    category_id       integer not null primary key,
    category_name     varchar(255),
    category_price    decimal(12, 0),
    category_unit     varchar(64),
    quantity_per_unit integer
);

create table if not exists service
(
    service_id       bigint not null primary key,
    service_state    varchar(64),
    service_quantity integer,
    category_id      integer
        constraint fk_service_category references category,
    invoice_id       bigint,
    created_at       timestamp
);

create sequence if not exists category_seq;
create sequence if not exists service_seq start with 1000;