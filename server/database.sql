create database perntodo;

create table todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

docker run -p 5432:5432 -e POSTGRES_PASSWORD=admin123 --name postgres --restart always -d postgres:latest