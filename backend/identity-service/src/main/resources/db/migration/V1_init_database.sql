create table IF NOT EXISTS "user"
(
    user_user_id       varchar(255) primary key,
    user_email    varchar(255) not null unique,
    user_password varchar(255) not null,
    user_avatar   varchar(255),
    user_state    smallint
);

create table IF NOT EXISTS permission
(
    name        varchar(255) primary key,
    description text
);

create table IF NOT EXISTS role
(
    name        varchar(255) primary key,
    description text
);

create table IF NOT EXISTS invalidated_token
(
    id          varchar(255) primary key,
    expiry_time timestamp
);


create table IF NOT EXISTS role_permissions
(
    role_name       varchar(255),
    permissions_name varchar(255),
    PRIMARY KEY (role_name, permissions_name),
    FOREIGN KEY (role_name) REFERENCES role (name) ON DELETE CASCADE,
    FOREIGN KEY (permissions_name) REFERENCES permission (name) ON DELETE CASCADE
);

create table IF NOT EXISTS user_role
(
    user_id   varchar(255),
    role_name varchar(255),
    PRIMARY KEY (role_name, user_id),
    FOREIGN KEY (role_name) REFERENCES role (name) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "user" (user_id) ON DELETE CASCADE
);

