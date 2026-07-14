--
-- PostgreSQL database dump
--



-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.user_accounts DROP CONSTRAINT IF EXISTS user_accounts_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.user_accounts DROP CONSTRAINT IF EXISTS user_accounts_bank_id_foreign;
ALTER TABLE IF EXISTS ONLY public.user_accounts DROP CONSTRAINT IF EXISTS user_accounts_account_type_id_foreign;
ALTER TABLE IF EXISTS ONLY public.transactions DROP CONSTRAINT IF EXISTS transactions_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.transactions DROP CONSTRAINT IF EXISTS transactions_user_account_id_foreign;
ALTER TABLE IF EXISTS ONLY public.transactions DROP CONSTRAINT IF EXISTS transactions_target_account_id_fkey;
ALTER TABLE IF EXISTS ONLY public.transactions DROP CONSTRAINT IF EXISTS transactions_category_id_foreign;
ALTER TABLE IF EXISTS ONLY public.transaction_logs DROP CONSTRAINT IF EXISTS transaction_logs_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.transaction_logs DROP CONSTRAINT IF EXISTS transaction_logs_transaction_id_foreign;
ALTER TABLE IF EXISTS ONLY public.shared_debts DROP CONSTRAINT IF EXISTS shared_debts_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY public.shared_debts DROP CONSTRAINT IF EXISTS shared_debts_group_id_foreign;
ALTER TABLE IF EXISTS ONLY public.shared_debts DROP CONSTRAINT IF EXISTS shared_debts_created_by_foreign;
ALTER TABLE IF EXISTS ONLY public.shared_debt_splits DROP CONSTRAINT IF EXISTS shared_debt_splits_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.shared_debt_splits DROP CONSTRAINT IF EXISTS shared_debt_splits_shared_debt_id_foreign;
ALTER TABLE IF EXISTS ONLY public.savings_goals DROP CONSTRAINT IF EXISTS savings_goals_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.groups DROP CONSTRAINT IF EXISTS groups_created_by_foreign;
ALTER TABLE IF EXISTS ONLY public.group_user DROP CONSTRAINT IF EXISTS group_user_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.group_user DROP CONSTRAINT IF EXISTS group_user_group_id_foreign;
ALTER TABLE IF EXISTS ONLY public.budgets DROP CONSTRAINT IF EXISTS budgets_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.budgets DROP CONSTRAINT IF EXISTS budgets_category_id_foreign;
DROP INDEX IF EXISTS public.sessions_user_id_index;
DROP INDEX IF EXISTS public.sessions_last_activity_index;
DROP INDEX IF EXISTS public.push_subscriptions_subscribable_morph_idx;
DROP INDEX IF EXISTS public.personal_access_tokens_tokenable_type_tokenable_id_index;
DROP INDEX IF EXISTS public.personal_access_tokens_expires_at_index;
DROP INDEX IF EXISTS public.jobs_queue_index;
DROP INDEX IF EXISTS public.cache_locks_expiration_index;
DROP INDEX IF EXISTS public.cache_expiration_index;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_unique;
ALTER TABLE IF EXISTS ONLY public.user_accounts DROP CONSTRAINT IF EXISTS user_accounts_pkey;
ALTER TABLE IF EXISTS ONLY public.transactions DROP CONSTRAINT IF EXISTS transactions_pkey;
ALTER TABLE IF EXISTS ONLY public.transaction_logs DROP CONSTRAINT IF EXISTS transaction_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.shared_debts DROP CONSTRAINT IF EXISTS shared_debts_pkey;
ALTER TABLE IF EXISTS ONLY public.shared_debt_splits DROP CONSTRAINT IF EXISTS shared_debt_splits_pkey;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.savings_goals DROP CONSTRAINT IF EXISTS savings_goals_pkey;
ALTER TABLE IF EXISTS ONLY public.push_subscriptions DROP CONSTRAINT IF EXISTS push_subscriptions_pkey;
ALTER TABLE IF EXISTS ONLY public.push_subscriptions DROP CONSTRAINT IF EXISTS push_subscriptions_endpoint_unique;
ALTER TABLE IF EXISTS ONLY public.personal_access_tokens DROP CONSTRAINT IF EXISTS personal_access_tokens_token_unique;
ALTER TABLE IF EXISTS ONLY public.personal_access_tokens DROP CONSTRAINT IF EXISTS personal_access_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.password_reset_tokens DROP CONSTRAINT IF EXISTS password_reset_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.migrations DROP CONSTRAINT IF EXISTS migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.jobs DROP CONSTRAINT IF EXISTS jobs_pkey;
ALTER TABLE IF EXISTS ONLY public.job_batches DROP CONSTRAINT IF EXISTS job_batches_pkey;
ALTER TABLE IF EXISTS ONLY public.groups DROP CONSTRAINT IF EXISTS groups_pkey;
ALTER TABLE IF EXISTS ONLY public.group_user DROP CONSTRAINT IF EXISTS group_user_pkey;
ALTER TABLE IF EXISTS ONLY public.failed_jobs DROP CONSTRAINT IF EXISTS failed_jobs_uuid_unique;
ALTER TABLE IF EXISTS ONLY public.failed_jobs DROP CONSTRAINT IF EXISTS failed_jobs_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.cache DROP CONSTRAINT IF EXISTS cache_pkey;
ALTER TABLE IF EXISTS ONLY public.cache_locks DROP CONSTRAINT IF EXISTS cache_locks_pkey;
ALTER TABLE IF EXISTS ONLY public.budgets DROP CONSTRAINT IF EXISTS budgets_user_id_category_id_period_unique;
ALTER TABLE IF EXISTS ONLY public.budgets DROP CONSTRAINT IF EXISTS budgets_pkey;
ALTER TABLE IF EXISTS ONLY public.banks DROP CONSTRAINT IF EXISTS banks_pkey;
ALTER TABLE IF EXISTS ONLY public.banks DROP CONSTRAINT IF EXISTS banks_name_unique;
ALTER TABLE IF EXISTS ONLY public.account_types DROP CONSTRAINT IF EXISTS account_types_pkey;
ALTER TABLE IF EXISTS ONLY public.account_types DROP CONSTRAINT IF EXISTS account_types_name_unique;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.shared_debts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.shared_debt_splits ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.push_subscriptions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.jobs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.groups ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.group_user ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.failed_jobs ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.user_accounts;
DROP TABLE IF EXISTS public.transactions;
DROP TABLE IF EXISTS public.transaction_logs;
DROP SEQUENCE IF EXISTS public.shared_debts_id_seq;
DROP TABLE IF EXISTS public.shared_debts;
DROP SEQUENCE IF EXISTS public.shared_debt_splits_id_seq;
DROP TABLE IF EXISTS public.shared_debt_splits;
DROP TABLE IF EXISTS public.sessions;
DROP TABLE IF EXISTS public.savings_goals;
DROP SEQUENCE IF EXISTS public.push_subscriptions_id_seq;
DROP TABLE IF EXISTS public.push_subscriptions;
DROP SEQUENCE IF EXISTS public.personal_access_tokens_id_seq;
DROP TABLE IF EXISTS public.personal_access_tokens;
DROP TABLE IF EXISTS public.password_reset_tokens;
DROP SEQUENCE IF EXISTS public.migrations_id_seq;
DROP TABLE IF EXISTS public.migrations;
DROP SEQUENCE IF EXISTS public.jobs_id_seq;
DROP TABLE IF EXISTS public.jobs;
DROP TABLE IF EXISTS public.job_batches;
DROP SEQUENCE IF EXISTS public.groups_id_seq;
DROP TABLE IF EXISTS public.groups;
DROP SEQUENCE IF EXISTS public.group_user_id_seq;
DROP TABLE IF EXISTS public.group_user;
DROP SEQUENCE IF EXISTS public.failed_jobs_id_seq;
DROP TABLE IF EXISTS public.failed_jobs;
DROP TABLE IF EXISTS public.categories;
DROP TABLE IF EXISTS public.cache_locks;
DROP TABLE IF EXISTS public.cache;
DROP TABLE IF EXISTS public.budgets;
DROP TABLE IF EXISTS public.banks;
DROP TABLE IF EXISTS public.account_types;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account_types (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: banks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.banks (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    logo character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: budgets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.budgets (
    id uuid NOT NULL,
    user_id bigint NOT NULL,
    category_id uuid NOT NULL,
    amount numeric(15,2) NOT NULL,
    period character varying(255) DEFAULT 'monthly'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT budgets_period_check CHECK (((period)::text = ANY ((ARRAY['monthly'::character varying, 'weekly'::character varying, 'yearly'::character varying])::text[])))
);


--
-- Name: cache; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(255),
    color character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: group_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.group_user (
    id bigint NOT NULL,
    group_id bigint NOT NULL,
    user_id bigint NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    role character varying(255) DEFAULT 'member'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT group_user_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'member'::character varying])::text[]))),
    CONSTRAINT group_user_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'accepted'::character varying])::text[])))
);


--
-- Name: group_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.group_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: group_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.group_user_id_seq OWNED BY public.group_user.id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.groups (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    created_by bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;


--
-- Name: job_batches; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name text NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- Name: push_subscriptions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.push_subscriptions (
    id bigint NOT NULL,
    subscribable_type character varying(255) NOT NULL,
    subscribable_id bigint NOT NULL,
    endpoint character varying(500) NOT NULL,
    public_key character varying(255),
    auth_token character varying(255),
    content_encoding character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: push_subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.push_subscriptions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: push_subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.push_subscriptions_id_seq OWNED BY public.push_subscriptions.id;


--
-- Name: savings_goals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.savings_goals (
    id uuid NOT NULL,
    user_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    target_amount numeric(15,2) NOT NULL,
    current_amount numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    deadline date,
    icon character varying(255),
    color character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


--
-- Name: shared_debt_splits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shared_debt_splits (
    id bigint NOT NULL,
    shared_debt_id bigint NOT NULL,
    user_id bigint NOT NULL,
    percentage numeric(5,2) NOT NULL,
    amount_owed numeric(15,2) NOT NULL,
    is_paid boolean DEFAULT false NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: shared_debt_splits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shared_debt_splits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shared_debt_splits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shared_debt_splits_id_seq OWNED BY public.shared_debt_splits.id;


--
-- Name: shared_debts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shared_debts (
    id bigint NOT NULL,
    group_id bigint NOT NULL,
    created_by bigint NOT NULL,
    title character varying(255) NOT NULL,
    amount numeric(15,2) NOT NULL,
    date date NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    transaction_id uuid
);


--
-- Name: shared_debts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shared_debts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shared_debts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shared_debts_id_seq OWNED BY public.shared_debts.id;


--
-- Name: transaction_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transaction_logs (
    id uuid NOT NULL,
    transaction_id uuid NOT NULL,
    user_id bigint NOT NULL,
    action character varying(255) NOT NULL,
    payload_before jsonb,
    payload_after jsonb,
    ip_address character varying(45),
    user_agent text,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT transaction_logs_action_check CHECK (((action)::text = ANY ((ARRAY['CREATE'::character varying, 'UPDATE'::character varying, 'DELETE'::character varying])::text[])))
);


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transactions (
    id uuid NOT NULL,
    user_id bigint NOT NULL,
    user_account_id uuid NOT NULL,
    category_id uuid,
    amount numeric(15,2) NOT NULL,
    description text,
    date date NOT NULL,
    type character varying(255) NOT NULL,
    is_shared boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    target_account_id uuid,
    CONSTRAINT transactions_type_check CHECK (((type)::text = ANY ((ARRAY['income'::character varying, 'expense'::character varying])::text[])))
);


--
-- Name: user_accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_accounts (
    id uuid NOT NULL,
    user_id bigint NOT NULL,
    bank_id uuid NOT NULL,
    account_type_id uuid NOT NULL,
    identifier character varying(255),
    balance numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: group_user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_user ALTER COLUMN id SET DEFAULT nextval('public.group_user_id_seq'::regclass);


--
-- Name: groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- Name: push_subscriptions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.push_subscriptions ALTER COLUMN id SET DEFAULT nextval('public.push_subscriptions_id_seq'::regclass);


--
-- Name: shared_debt_splits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shared_debt_splits ALTER COLUMN id SET DEFAULT nextval('public.shared_debt_splits_id_seq'::regclass);


--
-- Name: shared_debts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shared_debts ALTER COLUMN id SET DEFAULT nextval('public.shared_debts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: account_types; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.account_types VALUES ('019cbe61-701b-718e-8a44-6616700142cc', 'Cuenta Corriente', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.account_types VALUES ('019cbe61-701e-7083-b994-69e544e85b25', 'Cuenta Vista / RUT', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.account_types VALUES ('019cbe61-701f-7120-9d53-cea6daf21e09', 'Cuenta de Ahorro', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.account_types VALUES ('019cbe61-7021-7011-ab5e-f4c1a7c2a50d', 'Tarjeta de Crédito', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.account_types VALUES ('019cbe61-7023-73ec-9f22-7fe131e24317', 'Línea de Crédito', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.account_types VALUES ('019cbe61-7024-721c-9c7c-c5f9464b19db', 'Cuenta Prepago', '2026-03-05 14:23:02', '2026-03-05 14:23:02');


--
-- Data for Name: banks; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.banks VALUES ('019cbe61-6edd-71b6-92c0-881c39fd24cc', 'Banco de Chile', 'https://www.google.com/s2/favicons?domain=bancochile.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6fe1-71c1-898c-fb1f05988d86', 'Banco de Crédito e Inversiones (BCI)', 'https://www.google.com/s2/favicons?domain=bci.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6fe3-71a7-a22e-a9b853a703b7', 'BancoEstado', 'https://www.google.com/s2/favicons?domain=bancoestado.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6fe7-7070-955f-453104c1f602', 'Scotiabank Chile', 'https://www.google.com/s2/favicons?domain=scotiabankchile.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6fe9-7131-a73b-b1cefbf78a8a', 'Itaú Chile', 'https://www.google.com/s2/favicons?domain=itau.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6fea-71f2-a713-a37c2dc00fbf', 'Banco BICE', 'https://www.google.com/s2/favicons?domain=bice.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6ff2-70d5-9292-0c76cba42e8b', 'Banco Security', 'https://www.google.com/s2/favicons?domain=bancosecurity.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6ff3-721f-9f63-5f6eb0600352', 'Banco Falabella', 'https://www.google.com/s2/favicons?domain=bancofalabella.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6ff5-7197-bfeb-6488128df2f1', 'Banco Ripley', 'https://www.google.com/s2/favicons?domain=bancoripley.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6ff6-7213-82d6-77d1243a223d', 'Banco Consorcio', 'https://www.google.com/s2/favicons?domain=consorcio.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6ff8-72ca-840f-ff4d241acc28', 'Tenpo (Prepago/Digital)', 'https://www.google.com/s2/favicons?domain=tenpo.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6ff9-73fa-a593-e2f8f380501b', 'Mercado Pago (Prepago/Digital)', 'https://www.google.com/s2/favicons?domain=mercadopago.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6ffb-71fc-af0c-6a99b2767fd8', 'Tanner Banco Digital', 'https://www.google.com/s2/favicons?domain=tanner.cl&sz=128', '2026-03-05 14:23:02', '2026-03-05 14:23:02');
INSERT INTO public.banks VALUES ('019cbe61-6fe5-708c-b30d-26af2470396f', 'Banco Santander', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/512px-Banco_Santander_Logotipo.svg.png', '2026-03-05 14:23:02', '2026-03-05 14:23:02');


--
-- Data for Name: budgets; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES ('019cd382-3852-7394-ad5c-bc77bbcb1bf8', 'Alimentación', '🛒', '#FF6B6B', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3879-70cd-b39e-d7ef6b5707d6', 'Transporte', '🚗', '#4ECDC4', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-387b-7204-92f6-27deb168d9e1', 'Vivienda', '🏠', '#45B7D1', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-387d-73c5-b354-72a7c3ac3efb', 'Servicios básicos', '💡', '#F9CA24', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-387e-7378-8f7d-091aaea38a14', 'Salud', '🏥', '#FF4757', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3880-7143-9bad-3a8013fdbafd', 'Educación', '📚', '#7C4DFF', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3882-7332-bcfd-ec801d4fa0af', 'Entretenimiento', '🎮', '#FF9FF3', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3884-7117-9817-c1f4ee9d0917', 'Restaurantes', '🍽️', '#F39C12', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3885-73e0-b63a-51e6d83606e4', 'Ropa y calzado', '👕', '#E056A0', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3887-71b9-be71-344d5027efa6', 'Tecnología', '💻', '#00D2D3', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3888-73fc-873d-7a520f13335f', 'Mascotas', '🐾', '#A29BFE', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-388a-71a3-a56e-4a6ea63ed24e', 'Suscripciones', '📱', '#6C5CE7', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-388c-71a4-8c64-e546bab5e9c2', 'Seguros', '🛡️', '#636E72', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-388e-72a9-82b7-da42dd01336c', 'Deudas y préstamos', '💳', '#D63031', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3890-724f-a5d0-85263864740a', 'Regalos', '🎁', '#E17055', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3892-7262-8d66-ee42ecf7354d', 'Ahorros', '🏦', '#2ED573', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3893-726c-ab0c-5d487fb178a8', 'Sueldo', '💼', '#00B894', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3895-7196-874b-c1a2c16a5596', 'Freelance', '🧑‍💻', '#00CEC9', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3896-72ec-8f18-5dd63c904a7e', 'Inversiones', '📈', '#0984E3', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-3898-7247-83ef-044ae26b873f', 'Ventas', '🏷️', '#FDCB6E', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-389a-7152-87e6-57e071adf30f', 'Otros ingresos', '💵', '#55EFC4', '2026-03-09 16:50:52', '2026-03-09 16:50:52');
INSERT INTO public.categories VALUES ('019cd382-389c-7183-8efe-9bdbfb384ac6', 'Otros', '📦', '#B2BEC3', '2026-03-09 16:50:52', '2026-03-09 16:50:52');


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: group_user; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.migrations VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO public.migrations VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO public.migrations VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO public.migrations VALUES (4, '2026_03_05_140541_create_banks_table', 1);
INSERT INTO public.migrations VALUES (5, '2026_03_05_140615_create_account_types_table', 1);
INSERT INTO public.migrations VALUES (6, '2026_03_05_140658_create_categories_table', 1);
INSERT INTO public.migrations VALUES (7, '2026_03_05_140713_create_user_accounts_table', 1);
INSERT INTO public.migrations VALUES (8, '2026_03_05_140725_create_transactions_table', 1);
INSERT INTO public.migrations VALUES (9, '2026_03_05_140731_create_transactions_logs_table', 1);
INSERT INTO public.migrations VALUES (10, '2026_03_05_181540_create_personal_access_tokens_table', 2);
INSERT INTO public.migrations VALUES (11, '2026_06_30_200000_create_budgets_table', 3);
INSERT INTO public.migrations VALUES (12, '2026_06_30_210000_create_savings_goals_table', 4);
INSERT INTO public.migrations VALUES (13, '2026_07_02_133544_create_push_subscriptions_table', 5);
INSERT INTO public.migrations VALUES (14, '2026_07_02_142956_create_groups_table', 6);
INSERT INTO public.migrations VALUES (15, '2026_07_02_143026_create_group_user_table', 6);
INSERT INTO public.migrations VALUES (16, '2026_07_02_143104_create_shared_debts_table', 6);
INSERT INTO public.migrations VALUES (17, '2026_07_02_143139_create_shared_debt_splits_table', 6);


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: push_subscriptions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: savings_goals; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: shared_debt_splits; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: shared_debts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: transaction_logs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.transaction_logs VALUES ('e57bfde2-7292-4aa5-987a-823616551fa9', '7e7ce7b2-0131-4d3b-a94b-481bd912910e', 2, 'CREATE', 'null', '{"id": "7e7ce7b2-0131-4d3b-a94b-481bd912910e", "date": "2026-07-13T00:00:00.000Z", "type": "expense", "amount": 1820.0, "user_id": "2", "is_shared": false, "categories": {"id": "019cd382-3852-7394-ad5c-bc77bbcb1bf8", "icon": "🛒", "name": "Alimentación", "color": "#FF6B6B", "created_at": "2026-03-09T16:50:52.000Z", "updated_at": "2026-03-09T16:50:52.000Z"}, "created_at": "2026-07-13T19:01:51.000Z", "updated_at": "2026-07-13T19:01:51.000Z", "category_id": "019cd382-3852-7394-ad5c-bc77bbcb1bf8", "description": "Mandarinas para el bajativo", "user_accounts": {"id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24", "banks": {"id": "019cbe61-6fe5-708c-b30d-26af2470396f", "logo": null, "name": "Banco Santander", "created_at": "2026-03-05T14:23:02.000Z", "updated_at": "2026-03-05T14:23:02.000Z"}, "balance": 196600.0, "bank_id": "019cbe61-6fe5-708c-b30d-26af2470396f", "user_id": "2", "created_at": "2026-07-13T15:58:44.000Z", "identifier": "8891", "updated_at": "2026-07-13T15:58:44.000Z", "account_type_id": "019cbe61-701b-718e-8a44-6616700142cc"}, "user_account_id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24"}', '::ffff:172.19.0.3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '2026-07-13 19:01:51');
INSERT INTO public.transaction_logs VALUES ('94029411-3929-4f1e-8e47-6b47cd15da18', '5b9dbb4b-0615-4230-99d9-45fc150fb0b9', 2, 'CREATE', 'null', '{"id": "5b9dbb4b-0615-4230-99d9-45fc150fb0b9", "date": "2026-07-13T00:00:00.000Z", "type": "expense", "amount": 6500.0, "user_id": "2", "is_shared": false, "categories": {"id": "019cd382-3879-70cd-b39e-d7ef6b5707d6", "icon": "🚗", "name": "Transporte", "color": "#4ECDC4", "created_at": "2026-03-09T16:50:52.000Z", "updated_at": "2026-03-09T16:50:52.000Z"}, "created_at": "2026-07-13T19:05:35.000Z", "updated_at": "2026-07-13T19:05:35.000Z", "category_id": "019cd382-3879-70cd-b39e-d7ef6b5707d6", "description": "", "user_accounts": {"id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24", "banks": {"id": "019cbe61-6fe5-708c-b30d-26af2470396f", "logo": null, "name": "Banco Santander", "created_at": "2026-03-05T14:23:02.000Z", "updated_at": "2026-03-05T14:23:02.000Z"}, "balance": 194780.0, "bank_id": "019cbe61-6fe5-708c-b30d-26af2470396f", "user_id": "2", "created_at": "2026-07-13T15:58:44.000Z", "identifier": "8891", "updated_at": "2026-07-13T15:58:44.000Z", "account_type_id": "019cbe61-701b-718e-8a44-6616700142cc"}, "user_account_id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24"}', '::ffff:172.19.0.3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '2026-07-13 19:05:35');
INSERT INTO public.transaction_logs VALUES ('8644cd47-c20d-452c-9128-9f1b0fdc34a2', '5b9dbb4b-0615-4230-99d9-45fc150fb0b9', 2, 'UPDATE', '{"id": "5b9dbb4b-0615-4230-99d9-45fc150fb0b9", "date": "2026-07-13T00:00:00.000Z", "type": "expense", "amount": 6500.0, "user_id": "2", "is_shared": false, "created_at": "2026-07-13T19:05:35.000Z", "updated_at": "2026-07-13T19:05:35.000Z", "category_id": "019cd382-3879-70cd-b39e-d7ef6b5707d6", "description": "", "user_account_id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24"}', '{"id": "5b9dbb4b-0615-4230-99d9-45fc150fb0b9", "date": "2026-07-06T00:00:00.000Z", "type": "expense", "amount": 6500.0, "user_id": "2", "is_shared": false, "categories": {"id": "019cd382-3879-70cd-b39e-d7ef6b5707d6", "icon": "🚗", "name": "Transporte", "color": "#4ECDC4", "created_at": "2026-03-09T16:50:52.000Z", "updated_at": "2026-03-09T16:50:52.000Z"}, "created_at": "2026-07-13T19:05:35.000Z", "updated_at": "2026-07-13T19:08:28.000Z", "category_id": "019cd382-3879-70cd-b39e-d7ef6b5707d6", "description": "", "user_accounts": {"id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24", "banks": {"id": "019cbe61-6fe5-708c-b30d-26af2470396f", "logo": null, "name": "Banco Santander", "created_at": "2026-03-05T14:23:02.000Z", "updated_at": "2026-03-05T14:23:02.000Z"}, "balance": 194780.0, "bank_id": "019cbe61-6fe5-708c-b30d-26af2470396f", "user_id": "2", "created_at": "2026-07-13T15:58:44.000Z", "identifier": "8891", "updated_at": "2026-07-13T15:58:44.000Z", "account_type_id": "019cbe61-701b-718e-8a44-6616700142cc"}, "user_account_id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24"}', '::ffff:172.19.0.3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '2026-07-13 19:08:28');
INSERT INTO public.transaction_logs VALUES ('80d3e561-15d5-4864-9701-b5c5c271a9b7', '7116f93a-2bd2-4f1a-8f8e-15efb65e0e91', 2, 'CREATE', 'null', '{"id": "7116f93a-2bd2-4f1a-8f8e-15efb65e0e91", "date": "2026-07-14T00:00:00.000Z", "type": "expense", "amount": 1938.0, "user_id": "2", "is_shared": false, "categories": {"id": "019cd382-3852-7394-ad5c-bc77bbcb1bf8", "icon": "🛒", "name": "Alimentación", "color": "#FF6B6B", "created_at": "2026-03-09T16:50:52.000Z", "updated_at": "2026-03-09T16:50:52.000Z"}, "created_at": "2026-07-14T13:43:51.000Z", "updated_at": "2026-07-14T13:43:51.000Z", "category_id": "019cd382-3852-7394-ad5c-bc77bbcb1bf8", "description": "", "user_accounts": {"id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24", "banks": {"id": "019cbe61-6fe5-708c-b30d-26af2470396f", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/512px-Banco_Santander_Logotipo.svg.png", "name": "Banco Santander", "created_at": "2026-03-05T14:23:02.000Z", "updated_at": "2026-03-05T14:23:02.000Z"}, "balance": 188280.0, "bank_id": "019cbe61-6fe5-708c-b30d-26af2470396f", "user_id": "2", "created_at": "2026-07-13T15:58:44.000Z", "identifier": "8891", "updated_at": "2026-07-13T15:58:44.000Z", "account_type_id": "019cbe61-701b-718e-8a44-6616700142cc"}, "target_accounts": null, "user_account_id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24", "target_account_id": null}', '::ffff:172.19.0.3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '2026-07-14 13:43:51');
INSERT INTO public.transaction_logs VALUES ('33d59b4b-807a-4b33-91ba-91fd919838d7', '61146926-95a3-48dd-b64f-a58770f91f03', 2, 'CREATE', 'null', '{"id": "61146926-95a3-48dd-b64f-a58770f91f03", "date": "2026-07-14T00:00:00.000Z", "type": "expense", "amount": 2500.0, "user_id": "2", "is_shared": false, "categories": {"id": "019cd382-3852-7394-ad5c-bc77bbcb1bf8", "icon": "🛒", "name": "Alimentación", "color": "#FF6B6B", "created_at": "2026-03-09T16:50:52.000Z", "updated_at": "2026-03-09T16:50:52.000Z"}, "created_at": "2026-07-14T13:44:29.000Z", "updated_at": "2026-07-14T13:44:29.000Z", "category_id": "019cd382-3852-7394-ad5c-bc77bbcb1bf8", "description": "", "user_accounts": {"id": "6b20158f-4ce6-417d-86fd-9785e2c8369d", "banks": {"id": "019cbe61-6fe5-708c-b30d-26af2470396f", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/512px-Banco_Santander_Logotipo.svg.png", "name": "Banco Santander", "created_at": "2026-03-05T14:23:02.000Z", "updated_at": "2026-03-05T14:23:02.000Z"}, "balance": 4121010.0, "bank_id": "019cbe61-6fe5-708c-b30d-26af2470396f", "user_id": "2", "created_at": "2026-07-13T15:47:25.000Z", "identifier": "0768", "updated_at": "2026-07-13T15:47:25.000Z", "account_type_id": "019cbe61-7021-7011-ab5e-f4c1a7c2a50d"}, "target_accounts": null, "user_account_id": "6b20158f-4ce6-417d-86fd-9785e2c8369d", "target_account_id": null}', '::ffff:172.19.0.3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '2026-07-14 13:44:29');
INSERT INTO public.transaction_logs VALUES ('f8673501-30a5-4548-b77d-d933ebcb7a8e', '7116f93a-2bd2-4f1a-8f8e-15efb65e0e91', 2, 'UPDATE', '{"id": "7116f93a-2bd2-4f1a-8f8e-15efb65e0e91", "date": "2026-07-14T00:00:00.000Z", "type": "expense", "amount": 1938.0, "user_id": "2", "is_shared": false, "created_at": "2026-07-14T13:43:51.000Z", "updated_at": "2026-07-14T13:43:51.000Z", "category_id": "019cd382-3852-7394-ad5c-bc77bbcb1bf8", "description": "", "user_account_id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24", "target_account_id": null}', '{"id": "7116f93a-2bd2-4f1a-8f8e-15efb65e0e91", "date": "2026-07-14T00:00:00.000Z", "type": "expense", "amount": 1938.0, "user_id": "2", "is_shared": false, "categories": {"id": "019cd382-3852-7394-ad5c-bc77bbcb1bf8", "icon": "🛒", "name": "Alimentación", "color": "#FF6B6B", "created_at": "2026-03-09T16:50:52.000Z", "updated_at": "2026-03-09T16:50:52.000Z"}, "created_at": "2026-07-14T13:43:51.000Z", "updated_at": "2026-07-14T13:45:07.000Z", "category_id": "019cd382-3852-7394-ad5c-bc77bbcb1bf8", "description": "", "user_accounts": {"id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24", "banks": {"id": "019cbe61-6fe5-708c-b30d-26af2470396f", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/512px-Banco_Santander_Logotipo.svg.png", "name": "Banco Santander", "created_at": "2026-03-05T14:23:02.000Z", "updated_at": "2026-03-05T14:23:02.000Z"}, "balance": 188280.0, "bank_id": "019cbe61-6fe5-708c-b30d-26af2470396f", "user_id": "2", "created_at": "2026-07-13T15:58:44.000Z", "identifier": "8891", "updated_at": "2026-07-13T15:58:44.000Z", "account_type_id": "019cbe61-701b-718e-8a44-6616700142cc"}, "target_accounts": null, "user_account_id": "23a63fb4-7b96-4814-bf4e-1c87f4739e24", "target_account_id": null}', '::ffff:172.19.0.3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '2026-07-14 13:45:07');


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.transactions VALUES ('7e7ce7b2-0131-4d3b-a94b-481bd912910e', 2, '23a63fb4-7b96-4814-bf4e-1c87f4739e24', '019cd382-3852-7394-ad5c-bc77bbcb1bf8', 1820.00, 'Mandarinas para el bajativo', '2026-07-13', 'expense', false, '2026-07-13 19:01:51', '2026-07-13 19:01:51', NULL);
INSERT INTO public.transactions VALUES ('5b9dbb4b-0615-4230-99d9-45fc150fb0b9', 2, '23a63fb4-7b96-4814-bf4e-1c87f4739e24', '019cd382-3879-70cd-b39e-d7ef6b5707d6', 6500.00, '', '2026-07-06', 'expense', false, '2026-07-13 19:05:35', '2026-07-13 19:08:28', NULL);
INSERT INTO public.transactions VALUES ('61146926-95a3-48dd-b64f-a58770f91f03', 2, '6b20158f-4ce6-417d-86fd-9785e2c8369d', '019cd382-3852-7394-ad5c-bc77bbcb1bf8', 2500.00, '', '2026-07-14', 'expense', false, '2026-07-14 13:44:29', '2026-07-14 13:44:29', NULL);
INSERT INTO public.transactions VALUES ('7116f93a-2bd2-4f1a-8f8e-15efb65e0e91', 2, '23a63fb4-7b96-4814-bf4e-1c87f4739e24', '019cd382-3852-7394-ad5c-bc77bbcb1bf8', 1938.00, '', '2026-07-14', 'expense', false, '2026-07-14 13:43:51', '2026-07-14 13:45:07', NULL);


--
-- Data for Name: user_accounts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_accounts VALUES ('b0097cd0-bd84-4a28-a0a2-8ea1184227a4', 2, '019cbe61-6ff9-73fa-a593-e2f8f380501b', '019cbe61-7024-721c-9c7c-c5f9464b19db', '8512', 172361.00, '2026-07-13 16:14:37', '2026-07-13 16:14:37');
INSERT INTO public.user_accounts VALUES ('c7e41098-4b28-444b-85f5-c293194896c3', 2, '019cbe61-6ff8-72ca-840f-ff4d241acc28', '019cbe61-7021-7011-ab5e-f4c1a7c2a50d', '6966', 557841.00, '2026-07-13 16:15:15', '2026-07-13 16:15:15');
INSERT INTO public.user_accounts VALUES ('6b20158f-4ce6-417d-86fd-9785e2c8369d', 2, '019cbe61-6fe5-708c-b30d-26af2470396f', '019cbe61-7021-7011-ab5e-f4c1a7c2a50d', '0768', 4118510.00, '2026-07-13 15:47:25', '2026-07-13 15:47:25');
INSERT INTO public.user_accounts VALUES ('23a63fb4-7b96-4814-bf4e-1c87f4739e24', 2, '019cbe61-6fe5-708c-b30d-26af2470396f', '019cbe61-701b-718e-8a44-6616700142cc', '8891', 186342.00, '2026-07-13 15:58:44', '2026-07-13 15:58:44');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Test User', 'test2@test.com', NULL, '$2b$10$jE1nZz4TSzyg0zpxEV8cIue3yKyPyQW0.Jp830bt7NNYS5o898Qfm', NULL, '2026-07-13 15:01:07', '2026-07-13 15:01:07');
INSERT INTO public.users VALUES (2, 'Eliacer Fuentealba', 'efuentealba038@gmail.com', NULL, '$2b$10$k.OfAlEnUBcu56IAIvwAA.06Os88MHqgbDWz7XJ9NVw2Olu2ROrjG', NULL, '2026-07-13 15:15:22', '2026-07-13 15:41:20');
INSERT INTO public.users VALUES (3, 'Catalina Matamala', 'catalina.matamala@uct.cl', NULL, '$2b$10$3obLHnrL.DJPthGTRaKG8.knCGucNtDkN23kUyit9ZKmQ13LC3Bhy', NULL, '2026-07-14 13:49:49', '2026-07-14 13:49:49');


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: group_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.group_user_id_seq', 1, false);


--
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.groups_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 17, true);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);


--
-- Name: push_subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.push_subscriptions_id_seq', 1, false);


--
-- Name: shared_debt_splits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shared_debt_splits_id_seq', 1, false);


--
-- Name: shared_debts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shared_debts_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: account_types account_types_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_types
    ADD CONSTRAINT account_types_name_unique UNIQUE (name);


--
-- Name: account_types account_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_types
    ADD CONSTRAINT account_types_pkey PRIMARY KEY (id);


--
-- Name: banks banks_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.banks
    ADD CONSTRAINT banks_name_unique UNIQUE (name);


--
-- Name: banks banks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.banks
    ADD CONSTRAINT banks_pkey PRIMARY KEY (id);


--
-- Name: budgets budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (id);


--
-- Name: budgets budgets_user_id_category_id_period_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_user_id_category_id_period_unique UNIQUE (user_id, category_id, period);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: group_user group_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_user
    ADD CONSTRAINT group_user_pkey PRIMARY KEY (id);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: push_subscriptions push_subscriptions_endpoint_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.push_subscriptions
    ADD CONSTRAINT push_subscriptions_endpoint_unique UNIQUE (endpoint);


--
-- Name: push_subscriptions push_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.push_subscriptions
    ADD CONSTRAINT push_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: savings_goals savings_goals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.savings_goals
    ADD CONSTRAINT savings_goals_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shared_debt_splits shared_debt_splits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shared_debt_splits
    ADD CONSTRAINT shared_debt_splits_pkey PRIMARY KEY (id);


--
-- Name: shared_debts shared_debts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shared_debts
    ADD CONSTRAINT shared_debts_pkey PRIMARY KEY (id);


--
-- Name: transaction_logs transaction_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_logs
    ADD CONSTRAINT transaction_logs_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: user_accounts user_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT user_accounts_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cache_expiration_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cache_expiration_index ON public.cache USING btree (expiration);


--
-- Name: cache_locks_expiration_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cache_locks_expiration_index ON public.cache_locks USING btree (expiration);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: personal_access_tokens_expires_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX personal_access_tokens_expires_at_index ON public.personal_access_tokens USING btree (expires_at);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- Name: push_subscriptions_subscribable_morph_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX push_subscriptions_subscribable_morph_idx ON public.push_subscriptions USING btree (subscribable_type, subscribable_id);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- Name: budgets budgets_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: budgets budgets_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: group_user group_user_group_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_user
    ADD CONSTRAINT group_user_group_id_foreign FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;


--
-- Name: group_user group_user_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_user
    ADD CONSTRAINT group_user_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: groups groups_created_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_created_by_foreign FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: savings_goals savings_goals_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.savings_goals
    ADD CONSTRAINT savings_goals_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: shared_debt_splits shared_debt_splits_shared_debt_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shared_debt_splits
    ADD CONSTRAINT shared_debt_splits_shared_debt_id_foreign FOREIGN KEY (shared_debt_id) REFERENCES public.shared_debts(id) ON DELETE CASCADE;


--
-- Name: shared_debt_splits shared_debt_splits_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shared_debt_splits
    ADD CONSTRAINT shared_debt_splits_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: shared_debts shared_debts_created_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shared_debts
    ADD CONSTRAINT shared_debts_created_by_foreign FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: shared_debts shared_debts_group_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shared_debts
    ADD CONSTRAINT shared_debts_group_id_foreign FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;


--
-- Name: shared_debts shared_debts_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shared_debts
    ADD CONSTRAINT shared_debts_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE;


--
-- Name: transaction_logs transaction_logs_transaction_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_logs
    ADD CONSTRAINT transaction_logs_transaction_id_foreign FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE;


--
-- Name: transaction_logs transaction_logs_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_logs
    ADD CONSTRAINT transaction_logs_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: transactions transactions_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: transactions transactions_target_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_target_account_id_fkey FOREIGN KEY (target_account_id) REFERENCES public.user_accounts(id);


--
-- Name: transactions transactions_user_account_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_account_id_foreign FOREIGN KEY (user_account_id) REFERENCES public.user_accounts(id);


--
-- Name: transactions transactions_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_accounts user_accounts_account_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT user_accounts_account_type_id_foreign FOREIGN KEY (account_type_id) REFERENCES public.account_types(id);


--
-- Name: user_accounts user_accounts_bank_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT user_accounts_bank_id_foreign FOREIGN KEY (bank_id) REFERENCES public.banks(id);


--
-- Name: user_accounts user_accounts_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT user_accounts_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--



