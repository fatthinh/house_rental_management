create table if not exists invoice
(
    invoice_id     varchar(255) not null primary key,
    invoice_amount numeric(12, 0),
    invoice_month  integer,
    invoice_state  varchar(64),
    created_at     timestamp,
    agreement_id   integer
);

create table if not exists transaction
(
    transaction_id     varchar(255) not null primary key,
    transaction_amount numeric(12, 0),
    created_at         timestamp,
    invoice_id         varchar(255)
        constraint fk_invoice_transction references invoice
);

create sequence if not exists invoice_seq increment by 50;
create sequence if not exists transaction_seq increment by 50;