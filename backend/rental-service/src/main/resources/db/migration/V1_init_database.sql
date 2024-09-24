create table if not exists agreement
(
    agreement_id      int          not null primary key,
    agreement_deposit bigint,
    agreement_state   varchar(64),
    start_date        date,
    created_date      timestamp,
    house_id          integer      not null,
    representer       varchar(255) not null
);

create table if not exists tenant
(
    tenant_id       varchar(255) not null primary key,
    tenant_name     varchar(255),
    tenant_phone    varchar(16),
    tenant_state    varchar(64),
    tenant_dob      date,
    tenant_gender   varchar(8),
    tenant_hometown varchar(255),
    citizen_id      varchar(32) unique,
    agreement_id    int          not null
        constraint fk_agreement_tenant references agreement
);

create sequence if not exists agreement_seq;
