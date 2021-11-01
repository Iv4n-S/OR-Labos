--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pive; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pive (
    idpive integer NOT NULL,
    naziv character varying(50) NOT NULL,
    postalkohola character varying(50) NOT NULL,
    boja character varying(50) NOT NULL,
    vrsta character varying(50) NOT NULL,
    distributerzarh character varying(100),
    drzporjekla character varying(50) NOT NULL,
    envrijednost100ml character varying(50) NOT NULL,
    idpakiranja integer NOT NULL,
    pivovara character varying(100) NOT NULL
);


ALTER TABLE public.pive OWNER TO postgres;

--
-- Name: vrstapakiranja; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vrstapakiranja (
    idpakiranja integer NOT NULL,
    materijal character varying(50) NOT NULL,
    velicina character varying(50) NOT NULL
);


ALTER TABLE public.vrstapakiranja OWNER TO postgres;

--
-- Data for Name: pive; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pive (idpive, naziv, postalkohola, boja, vrsta, distributerzarh, drzporjekla, envrijednost100ml, idpakiranja, pivovara) FROM stdin;
4	Karlovačko	5%	svijetlo	lager	\N	Hrvatska	56 kcal	3	Heineken Hrvatska d.o.o.
6	Grička vještica	7,5%	tamno	doppelbock	\N	Hrvatska	45 kcal	1	Pivovara Medvedgrad d.o.o.
7	Beck's	5%	svijetlo	pilsner	Zagrebačka pivovara d.o.o.	Njemačka	40 kcal	2	Brauerei Beck & Co.
8	Laško	4,9%	svijetlo	lager	Heineken Hrvatska d.o.o.	Slovenija	40,6 kcal	1	Pivovarna Laško d.d.
9	Grimbergen	6%	svijetlo	Witbier	Carlsberg Croatia d.o.o.	Belgija	51 kcal	4	Carlsberg Supply Complany
10	Budweiser	5%	svijetlo	lager	Carlsberg Croatia d.o.o.	Češka	42 kcal	2	Budweiser Budwar
12	Ožujsko	5%	svijetlo	lager	\N	Hrvatska	52 kcal	3	Zagrebačka pivovara d.o.o.
13	Laško	4,9%	svijetlo	lager	Heineken Hrvatska d.o.o.	Slovenija	40,6 kcal	2	Pivovarna Laško d.d.
1	Heineken	5%	svijetlo	lager	Heineken Hrvatska d.o.o.	Nizozemska	42 kcal	4	Heineken International
2	Paulaner	5,5%	svijetlo	pšenično	Dolium d.o.o.	Njemačka	47 kcal	1	Paulaner Brewerei Gruppe GmbH & Co.
3	Ožujsko 	5%	svijetlo	lager	\N	Hrvatska	52 kcal	1	Zagrebačka pivovara d.o.o.
5	Pan	5%	svijetlo	pilsner	\N	Hrvatska 	40 kcal	2	Carlsberg Croatia d.o.o.
11	Heineken	5%	svijetlo	lager	Heineken Hrvatska d.o.o.	Nizozemska	42	5	Heineken International
\.


--
-- Data for Name: vrstapakiranja; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vrstapakiranja (idpakiranja, materijal, velicina) FROM stdin;
1	staklena boca	0,5L
2	limenka	0,5L
3	plastična boca	2L
4	staklena boca	0,33L
5	limenka	0,4L
\.


--
-- Name: pive pive_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pive
    ADD CONSTRAINT pive_pkey PRIMARY KEY (idpive);


--
-- Name: vrstapakiranja vrstapakiranja_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vrstapakiranja
    ADD CONSTRAINT vrstapakiranja_pkey PRIMARY KEY (idpakiranja);


--
-- Name: pive pive_idpakiranja_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pive
    ADD CONSTRAINT pive_idpakiranja_fkey FOREIGN KEY (idpakiranja) REFERENCES public.vrstapakiranja(idpakiranja);


--
-- PostgreSQL database dump complete
--

