# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
type_id         | integer   | not null, indexed
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## user_types
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
type        | string    | not null

## posts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
author_id   | integer   | not null, foreign key (references users), indexed
target_id   | integer   | not null, foreign key (references users), indexed
image_path  | integer   |
link        | string    |

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
post_id     | integer   | not null, foreign key (references users), indexed

## comments
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
body              | text      | not null
author_id         | integer   | not null, foreign key (references users), indexed
post_id           | integer   | not null, foreign key (references users), indexed
parent_comment_id | integer   |


## follows
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
author_id        | integer   | not null, foreign key (references users), indexed
followed_user_id | integer   | not null, foreign key (references users), indexed

## images
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
image_path   | text      | not null
