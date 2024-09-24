create table IF NOT EXISTS account
(
    account_id       varchar(255) primary key,
    account_email    varchar(255) not null unique,
    account_password varchar(255) not null,
    account_avatar   varchar(255),
    account_state    varchar(16),
    account_role     varchar(16)
)