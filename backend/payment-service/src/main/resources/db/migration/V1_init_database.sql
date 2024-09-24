create table if not exists invoice
(
    invoice_id     int not null primary key,
    invoice_amount bigint,
    invoice_month  smallint,
    invoice_state  varchar(64),
    created_at     timestamp,
    agreement_id   int not null
);

create table if not exists transaction
(
    transaction_id     varchar(255) not null primary key,
    transaction_amount bigint,
    created_at         timestamp,
    invoice_id         int          not null
        constraint fk_invoice_transction references invoice
);

create sequence if not exists invoice_seq;
create sequence if not exists transaction_seq;
