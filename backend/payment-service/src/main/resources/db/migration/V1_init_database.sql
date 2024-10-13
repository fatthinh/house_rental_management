create table if not exists invoice
(
    invoice_id     int    not null primary key,
    invoice_amount bigint,
    invoice_state  varchar(64),
    created_at     timestamp,
    service_id     bigint not null
);

create table if not exists payment
(
    payment_id     int not null primary key,
    payment_amount bigint,
    payment_method varchar(32),
    payment_state  smallint,
    payment_actor  varchar(255),
    created_at     timestamp,
    transaction_id varchar(255),
    invoice_id     int not null
        constraint fk_invoice_payment references invoice
);

create sequence if not exists invoice_seq;
create sequence if not exists payment_seq;
