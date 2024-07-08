CREATE DATABASE labecommerce;

CREATE TABLE
  public.clients (
    id serial NOT NULL,
    name character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    cpf character varying(50) NOT NULL,
    contact character varying(20) NOT NULL
  );

ALTER TABLE
  public.clients
ADD
  CONSTRAINT clients_pkey PRIMARY KEY (id)

CREATE TABLE
  public.categories (
    id serial NOT NULL,
    name character varying(150) NOT NULL
  );

ALTER TABLE
  public.categories
ADD
  CONSTRAINT categories_pkey PRIMARY KEY (id)

CREATE TABLE
  public.products (
    id serial NOT NULL,
    name character varying(150) NOT NULL,
    amount character varying(150) NULL DEFAULT 0,
    color character varying(50) NULL,
    voltage voltage_type NULL,
    description text NULL,
    category_id integer NOT NULL,
    price numeric(10, 2) NULL
  );

ALTER TABLE
  public.products
ADD
  CONSTRAINT products_pkey PRIMARY KEY (id)

CREATE TABLE
  public.orders (
    id serial NOT NULL,
    client_id integer NOT NULL,
    total numeric(10, 2) NULL,
    adress text NULL,
    observations text NULL,
    status order_status NULL
  );

ALTER TABLE
  public.orders
ADD
  CONSTRAINT orders_pkey PRIMARY KEY (id)

CREATE TABLE
  public.orders_itens (
    id serial NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    amount text NULL,
    price character varying(50) NULL
  );

ALTER TABLE
  public.orders_itens
ADD
  CONSTRAINT orders_itens_pkey PRIMARY KEY (id)