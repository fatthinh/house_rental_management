create table if not exists agreement
(
    agreeement_id     varchar(255) not null primary key,
    agreement_deposit numeric(12, 0),
    agreement_state   varchar(64),
    start_date        date,
    created_date      timestamp,
    house_id          integer
);

create table if not exists tenant
(
    tenant_id       varchar(255) not null primary key,
    tenant_name     varchar(255),
    tenant_state    varchar(64),
    tenant_dob      date,
    tenant_gender   varchar(8),
    tenant_hometown varchar(255),
    citizen_id      varchar(32) unique,
    agreement_id    varchar(255)
        constraint fk_agreement_tenant references agreement
);