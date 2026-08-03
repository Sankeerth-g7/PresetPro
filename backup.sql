--
-- PostgreSQL database dump
--

\restrict IA4rO9e9m55TYDeVMjcovyiq32KZNN3WXgGU9A1vvE6rd6ZExw6C8Ddou7Mqw0o

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: photo_edits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photo_edits (
    id integer NOT NULL,
    original_file_path character varying(500) NOT NULL,
    edited_file_path character varying(500),
    preset_id integer,
    file_name character varying(255),
    processing_status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.photo_edits OWNER TO postgres;

--
-- Name: photo_edits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.photo_edits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.photo_edits_id_seq OWNER TO postgres;

--
-- Name: photo_edits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.photo_edits_id_seq OWNED BY public.photo_edits.id;


--
-- Name: presets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.presets (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    category character varying(100),
    original_format character varying(50),
    lut_path character varying(500) NOT NULL,
    lut_data bytea,
    thumbnail_url character varying(500),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.presets OWNER TO postgres;

--
-- Name: presets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.presets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.presets_id_seq OWNER TO postgres;

--
-- Name: presets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.presets_id_seq OWNED BY public.presets.id;


--
-- Name: photo_edits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo_edits ALTER COLUMN id SET DEFAULT nextval('public.photo_edits_id_seq'::regclass);


--
-- Name: presets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presets ALTER COLUMN id SET DEFAULT nextval('public.presets_id_seq'::regclass);


--
-- Data for Name: photo_edits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photo_edits (id, original_file_path, edited_file_path, preset_id, file_name, processing_status, created_at) FROM stdin;
1	uploads\\1785594163490.jpg	edited_1785594163497.jpg	1	edited_1785594163497.jpg	completed	2026-08-01 19:52:43.576241
2	uploads\\1785594324104.jpeg	edited_1785594324106.jpg	1	edited_1785594324106.jpg	completed	2026-08-01 19:55:24.14679
3	uploads\\1785665106523.jpg	edited_1785665106541.jpg	2	edited_1785665106541.jpg	completed	2026-08-02 15:35:06.642256
4	uploads\\1785665144608.jpg	edited_1785665144615.jpg	3	edited_1785665144615.jpg	completed	2026-08-02 15:35:44.702527
5	uploads\\1785665149781.jpg	edited_1785665149798.jpg	3	edited_1785665149798.jpg	completed	2026-08-02 15:35:49.800796
6	uploads\\1785665170503.jpg	edited_1785665170507.jpg	4	edited_1785665170507.jpg	completed	2026-08-02 15:36:10.599293
7	uploads\\1785665178822.jpg	edited_1785665178827.jpg	5	edited_1785665178827.jpg	completed	2026-08-02 15:36:18.829277
8	uploads\\1785665190886.jpg	edited_1785665190892.jpg	39	edited_1785665190892.jpg	completed	2026-08-02 15:36:30.970501
9	uploads\\1785665244810.jpg	edited_1785665244812.jpg	39	edited_1785665244812.jpg	completed	2026-08-02 15:37:24.937869
10	uploads\\1785665868779.jpg	edited_1785665868793.jpg	2	edited_1785665868793.jpg	completed	2026-08-02 15:47:49.06245
11	uploads\\1785665872422.jpg	edited_1785665872426.jpg	2	edited_1785665872426.jpg	completed	2026-08-02 15:47:52.428004
12	uploads\\1785665994077.jpg	edited_1785665994081.jpg	2	edited_1785665994081.jpg	completed	2026-08-02 15:49:54.170279
13	uploads\\1785666057822.jpg	edited_1785666057828.jpg	3	edited_1785666057828.jpg	completed	2026-08-02 15:50:57.904877
14	uploads\\1785666233300.jpg	edited_1785666233308.jpg	3	edited_1785666233308.jpg	completed	2026-08-02 15:53:53.377072
15	uploads\\1785666411948.jpg	edited_1785666411951.jpg	2	edited_1785666411951.jpg	completed	2026-08-02 15:56:52.033451
16	uploads\\1785666452733.jpg	edited_1785666452736.jpg	2	edited_1785666452736.jpg	completed	2026-08-02 15:57:32.814358
17	uploads\\1785666738170.jpg	\N	2	edited_1785666738182.jpg	pending	2026-08-02 16:02:18.276314
18	uploads\\1785666759979.jpg	\N	3	edited_1785666759981.jpg	pending	2026-08-02 16:02:40.046087
19	uploads\\1785666787929.jpg	\N	11	edited_1785666787931.jpg	pending	2026-08-02 16:03:07.996007
20	uploads\\1785666813812.jpg	\N	2	edited_1785666813814.jpg	pending	2026-08-02 16:03:33.8155
21	uploads\\1785666814026.jpg	\N	2	edited_1785666814029.jpg	pending	2026-08-02 16:03:34.030602
22	uploads\\1785666872666.jpg	\N	2	edited_1785666872677.jpg	pending	2026-08-02 16:04:32.68206
23	uploads\\1785666945062.jpg	\N	1	edited_1785666945081.jpg	pending	2026-08-02 16:05:45.089511
24	uploads\\1785667015564.jpg	edited_1785667015581.jpg	2	edited_1785667015581.jpg	completed	2026-08-02 16:06:55.672369
25	uploads\\1785667049344.jpg	edited_1785667049352.jpg	2	edited_1785667049352.jpg	completed	2026-08-02 16:07:29.434986
26	uploads\\1785667480180.jpg	edited_1785667480219.jpg	3	edited_1785667480219.jpg	completed	2026-08-02 16:14:40.228777
27	uploads\\1785667492534.jpg	edited_1785667492539.jpg	13	edited_1785667492539.jpg	completed	2026-08-02 16:14:52.619799
28	uploads\\1785667691360.jpg	edited_1785667691366.jpg	7	edited_1785667691366.jpg	completed	2026-08-02 16:18:11.539918
29	uploads\\1785667701390.jpg	edited_1785667701395.jpg	39	edited_1785667701395.jpg	completed	2026-08-02 16:18:21.398093
30	uploads\\1785667703857.jpg	edited_1785667703859.jpg	38	edited_1785667703859.jpg	completed	2026-08-02 16:18:23.861777
31	uploads\\1785667709470.jpg	edited_1785667709476.jpg	21	edited_1785667709476.jpg	completed	2026-08-02 16:18:29.480161
32	uploads\\1785668213440.jpg	edited_1785668213444.jpg	41	edited_1785668213444.jpg	completed	2026-08-02 16:26:53.458693
33	uploads\\1785668221403.jpg	edited_1785668221407.jpg	41	edited_1785668221407.jpg	completed	2026-08-02 16:27:01.421537
34	uploads\\1785668622694.jpg	edited_1785668622711.jpg	3	edited_1785668622711.jpg	completed	2026-08-02 16:33:42.718399
35	uploads\\1785668630497.jpg	edited_1785668630501.jpg	41	edited_1785668630501.jpg	completed	2026-08-02 16:33:50.50475
36	uploads\\1785668672404.jpg	edited_1785668672416.jpg	41	edited_1785668672416.jpg	completed	2026-08-02 16:34:32.427691
37	uploads\\1785668676649.jpg	edited_1785668676654.jpg	3	edited_1785668676654.jpg	completed	2026-08-02 16:34:36.663213
38	uploads\\1785668680690.jpg	edited_1785668680694.jpg	4	edited_1785668680694.jpg	completed	2026-08-02 16:34:40.703758
39	uploads\\1785668682697.jpg	edited_1785668682701.jpg	4	edited_1785668682701.jpg	completed	2026-08-02 16:34:42.711353
40	uploads\\1785668684336.jpg	edited_1785668684341.jpg	4	edited_1785668684341.jpg	completed	2026-08-02 16:34:44.351196
41	uploads\\1785668685210.jpg	edited_1785668685218.jpg	4	edited_1785668685218.jpg	completed	2026-08-02 16:34:45.228329
42	uploads\\1785668686899.jpg	edited_1785668686908.jpg	3	edited_1785668686908.jpg	completed	2026-08-02 16:34:46.917534
43	uploads\\1785668689450.jpg	edited_1785668689454.jpg	41	edited_1785668689454.jpg	completed	2026-08-02 16:34:49.4635
44	uploads\\1785668713173.jpg	edited_1785668713189.jpg	41	edited_1785668713189.jpg	completed	2026-08-02 16:35:13.195552
45	uploads\\1785668720996.jpg	edited_1785668721003.jpg	3	edited_1785668721003.jpg	completed	2026-08-02 16:35:21.005912
46	uploads\\1785668724013.jpg	edited_1785668724020.jpg	41	edited_1785668724020.jpg	completed	2026-08-02 16:35:24.023987
47	uploads\\1785668726524.jpg	edited_1785668726528.jpg	4	edited_1785668726528.jpg	completed	2026-08-02 16:35:26.531563
48	uploads\\1785668729867.jpg	edited_1785668729871.jpg	41	edited_1785668729871.jpg	completed	2026-08-02 16:35:29.87384
49	uploads\\1785669008240.jpg	edited_1785669008259.jpg	3	edited_1785669008259.jpg	completed	2026-08-02 16:40:08.269782
50	uploads\\1785669014795.jpg	edited_1785669014800.jpg	41	edited_1785669014800.jpg	completed	2026-08-02 16:40:14.805466
51	uploads\\1785669021465.jpg	edited_1785669021470.jpg	4	edited_1785669021470.jpg	completed	2026-08-02 16:40:21.47651
52	uploads\\1785669026325.jpg	edited_1785669026331.jpg	5	edited_1785669026331.jpg	completed	2026-08-02 16:40:26.337043
\.


--
-- Data for Name: presets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.presets (id, name, category, original_format, lut_path, lut_data, thumbnail_url, created_at, updated_at) FROM stdin;
2	32_02_ IPC LOG Indian skin tone V4	Portrait - Indian Skin Tone	cube	uploads\\1785593940681.CUBE	\N	/uploads/thumbnails/preset_2.jpg	2026-08-01 19:49:00.723273	2026-08-01 19:49:00.723273
3	32_03_ IPC LOG Indian skin tone V4	Portrait - Indian Skin Tone	cube	uploads\\1785593940722.CUBE	\N	/uploads/thumbnails/preset_3.jpg	2026-08-01 19:49:00.797578	2026-08-01 19:49:00.797578
4	32_04_ IPC LOG Indian skin tone V4	Portrait - Indian Skin Tone	cube	uploads\\1785593940797.CUBE	\N	/uploads/thumbnails/preset_4.jpg	2026-08-01 19:49:00.881074	2026-08-01 19:49:00.881074
5	32_05_ IPC LOG Indian skin tone V4	Portrait - Indian Skin Tone	cube	uploads\\1785593940887.CUBE	\N	/uploads/thumbnails/preset_5.jpg	2026-08-01 19:49:00.934751	2026-08-01 19:49:00.934751
6	32_06_ IPC LOG Indian skin tone V4	Portrait - Indian Skin Tone	cube	uploads\\1785593940934.CUBE	\N	/uploads/thumbnails/preset_6.jpg	2026-08-01 19:49:00.980593	2026-08-01 19:49:00.980593
7	32_07_ IPC LOG Indian skin tone V4	Portrait - Indian Skin Tone	cube	uploads\\1785593940979.CUBE	\N	/uploads/thumbnails/preset_7.jpg	2026-08-01 19:49:01.021574	2026-08-01 19:49:01.021574
8	32_08_ IPC LOG Indian skin tone V4	Portrait - Indian Skin Tone	cube	uploads\\1785593941020.CUBE	\N	/uploads/thumbnails/preset_8.jpg	2026-08-01 19:49:01.06686	2026-08-01 19:49:01.06686
9	33_01_ IPC LOG Indian skin tone V5	Portrait - Indian Skin Tone	cube	uploads\\1785593941065.CUBE	\N	/uploads/thumbnails/preset_9.jpg	2026-08-01 19:49:01.117657	2026-08-01 19:49:01.117657
10	33_02_ IPC LOG Indian skin tone V5	Portrait - Indian Skin Tone	cube	uploads\\1785593941116.CUBE	\N	/uploads/thumbnails/preset_10.jpg	2026-08-01 19:49:01.157072	2026-08-01 19:49:01.157072
11	33_03_ IPC LOG Indian skin tone V5	Portrait - Indian Skin Tone	cube	uploads\\1785593941159.CUBE	\N	/uploads/thumbnails/preset_11.jpg	2026-08-01 19:49:01.201984	2026-08-01 19:49:01.201984
12	33_04_ IPC LOG Indian skin tone V5	Portrait - Indian Skin Tone	cube	uploads\\1785593941247.CUBE	\N	/uploads/thumbnails/preset_12.jpg	2026-08-01 19:49:01.305139	2026-08-01 19:49:01.305139
13	33_05_ IPC LOG Indian skin tone V5	Portrait - Indian Skin Tone	cube	uploads\\1785593941309.CUBE	\N	/uploads/thumbnails/preset_13.jpg	2026-08-01 19:49:01.370055	2026-08-01 19:49:01.370055
14	33_06_ IPC LOG Indian skin tone V5	Portrait - Indian Skin Tone	cube	uploads\\1785593941370.CUBE	\N	/uploads/thumbnails/preset_14.jpg	2026-08-01 19:49:01.418484	2026-08-01 19:49:01.418484
15	33_07_ IPC LOG Indian skin tone V5	Portrait - Indian Skin Tone	cube	uploads\\1785593941418.CUBE	\N	/uploads/thumbnails/preset_15.jpg	2026-08-01 19:49:01.455303	2026-08-01 19:49:01.455303
16	33_08_ IPC LOG Indian skin tone V5	Portrait - Indian Skin Tone	cube	uploads\\1785593941462.CUBE	\N	/uploads/thumbnails/preset_16.jpg	2026-08-01 19:49:01.504481	2026-08-01 19:49:01.504481
17	34_01_ IPC LOG Indian skin tone V6	Portrait - Indian Skin Tone	cube	uploads\\1785593941503.CUBE	\N	/uploads/thumbnails/preset_17.jpg	2026-08-01 19:49:01.564955	2026-08-01 19:49:01.564955
18	34_02_ IPC LOG Indian skin tone V6	Portrait - Indian Skin Tone	cube	uploads\\1785593941562.CUBE	\N	/uploads/thumbnails/preset_18.jpg	2026-08-01 19:49:01.600905	2026-08-01 19:49:01.600905
19	34_03_ IPC LOG Indian skin tone V6	Portrait - Indian Skin Tone	cube	uploads\\1785593941597.CUBE	\N	/uploads/thumbnails/preset_19.jpg	2026-08-01 19:49:01.725503	2026-08-01 19:49:01.725503
20	34_04_ IPC LOG Indian skin tone V6	Portrait - Indian Skin Tone	cube	uploads\\1785593941747.CUBE	\N	/uploads/thumbnails/preset_20.jpg	2026-08-01 19:49:01.840998	2026-08-01 19:49:01.840998
21	34_05_ IPC LOG Indian skin tone V6	Portrait - Indian Skin Tone	cube	uploads\\1785593941839.CUBE	\N	/uploads/thumbnails/preset_21.jpg	2026-08-01 19:49:02.004673	2026-08-01 19:49:02.004673
22	34_06_ IPC LOG Indian skin tone V6	Portrait - Indian Skin Tone	cube	uploads\\1785593942022.CUBE	\N	/uploads/thumbnails/preset_22.jpg	2026-08-01 19:49:02.08375	2026-08-01 19:49:02.08375
23	34_07_ IPC LOG Indian skin tone V6	Portrait - Indian Skin Tone	cube	uploads\\1785593942083.CUBE	\N	/uploads/thumbnails/preset_23.jpg	2026-08-01 19:49:02.162645	2026-08-01 19:49:02.162645
24	34_08_ IPC LOG Indian skin tone V6	Portrait - Indian Skin Tone	cube	uploads\\1785593942168.CUBE	\N	/uploads/thumbnails/preset_24.jpg	2026-08-01 19:49:02.234481	2026-08-01 19:49:02.234481
25	35_01_ IPC LOG Indian skin tone V7	Portrait - Indian Skin Tone	cube	uploads\\1785593942231.CUBE	\N	/uploads/thumbnails/preset_25.jpg	2026-08-01 19:49:02.340709	2026-08-01 19:49:02.340709
26	35_02_ IPC LOG Indian skin tone V7	Portrait - Indian Skin Tone	cube	uploads\\1785593942355.CUBE	\N	/uploads/thumbnails/preset_26.jpg	2026-08-01 19:49:02.487483	2026-08-01 19:49:02.487483
27	35_03_ IPC LOG Indian skin tone V7	Portrait - Indian Skin Tone	cube	uploads\\1785593942496.CUBE	\N	/uploads/thumbnails/preset_27.jpg	2026-08-01 19:49:02.562436	2026-08-01 19:49:02.562436
28	35_04_ IPC LOG Indian skin tone V7	Portrait - Indian Skin Tone	cube	uploads\\1785593942564.CUBE	\N	/uploads/thumbnails/preset_28.jpg	2026-08-01 19:49:02.662891	2026-08-01 19:49:02.662891
29	35_05_ IPC LOG Indian skin tone V7	Portrait - Indian Skin Tone	cube	uploads\\1785593942661.CUBE	\N	/uploads/thumbnails/preset_29.jpg	2026-08-01 19:49:02.702487	2026-08-01 19:49:02.702487
30	35_06_ IPC LOG Indian skin tone V7	Portrait - Indian Skin Tone	cube	uploads\\1785593942705.CUBE	\N	/uploads/thumbnails/preset_30.jpg	2026-08-01 19:49:02.756618	2026-08-01 19:49:02.756618
31	35_07_ IPC LOG Indian skin tone V7	Portrait - Indian Skin Tone	cube	uploads\\1785593942755.CUBE	\N	/uploads/thumbnails/preset_31.jpg	2026-08-01 19:49:02.80263	2026-08-01 19:49:02.80263
32	35_08_ IPC LOG Indian skin tone V7	Portrait - Indian Skin Tone	cube	uploads\\1785593942805.CUBE	\N	/uploads/thumbnails/preset_32.jpg	2026-08-01 19:49:02.834523	2026-08-01 19:49:02.834523
33	36_01_ IPC LOG Indian skin tone V8	Portrait - Indian Skin Tone	cube	uploads\\1785593942832.CUBE	\N	/uploads/thumbnails/preset_33.jpg	2026-08-01 19:49:02.864844	2026-08-01 19:49:02.864844
34	36_02_ IPC LOG Indian skin tone V8	Portrait - Indian Skin Tone	cube	uploads\\1785593942868.CUBE	\N	/uploads/thumbnails/preset_34.jpg	2026-08-01 19:49:02.898492	2026-08-01 19:49:02.898492
1	32_01_ IPC LOG Indian skin tone V4	Portrait - Indian Skin Tone	cube	uploads\\1785593940604.CUBE	\N	/uploads/thumbnails/preset_1.jpg	2026-08-01 19:49:00.65831	2026-08-01 19:49:00.65831
35	36_03_ IPC LOG Indian skin tone V8	Portrait - Indian Skin Tone	cube	uploads\\1785593942895.CUBE	\N	/uploads/thumbnails/preset_35.jpg	2026-08-01 19:49:02.923222	2026-08-01 19:49:02.923222
36	36_04_ IPC LOG Indian skin tone V8	Portrait - Indian Skin Tone	cube	uploads\\1785593942922.CUBE	\N	/uploads/thumbnails/preset_36.jpg	2026-08-01 19:49:02.955769	2026-08-01 19:49:02.955769
37	36_05_ IPC LOG Indian skin tone V8	Portrait - Indian Skin Tone	cube	uploads\\1785593942951.CUBE	\N	/uploads/thumbnails/preset_37.jpg	2026-08-01 19:49:02.981182	2026-08-01 19:49:02.981182
38	36_06_ IPC LOG Indian skin tone V8	Portrait - Indian Skin Tone	cube	uploads\\1785593942977.CUBE	\N	/uploads/thumbnails/preset_38.jpg	2026-08-01 19:49:03.017459	2026-08-01 19:49:03.017459
39	36_07_ IPC LOG Indian skin tone V8	Portrait - Indian Skin Tone	cube	uploads\\1785593943014.CUBE	\N	/uploads/thumbnails/preset_39.jpg	2026-08-01 19:49:03.053151	2026-08-01 19:49:03.053151
40	36_08_ IPC LOG Indian skin tone V8	Portrait - Indian Skin Tone	cube	uploads\\1785593943049.CUBE	\N	/uploads/thumbnails/preset_40.jpg	2026-08-01 19:49:03.081583	2026-08-01 19:49:03.081583
41	Presetpro - Movie Film	Other	cube	uploads\\1785668194124.CUBE	\N	https://via.placeholder.com/200?text=Presetpro%20-%20Movie%20Film	2026-08-02 16:26:34.208838	2026-08-02 16:26:34.208838
\.


--
-- Name: photo_edits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.photo_edits_id_seq', 52, true);


--
-- Name: presets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.presets_id_seq', 41, true);


--
-- Name: photo_edits photo_edits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo_edits
    ADD CONSTRAINT photo_edits_pkey PRIMARY KEY (id);


--
-- Name: presets presets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presets
    ADD CONSTRAINT presets_pkey PRIMARY KEY (id);


--
-- Name: photo_edits photo_edits_preset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo_edits
    ADD CONSTRAINT photo_edits_preset_id_fkey FOREIGN KEY (preset_id) REFERENCES public.presets(id);


--
-- PostgreSQL database dump complete
--

\unrestrict IA4rO9e9m55TYDeVMjcovyiq32KZNN3WXgGU9A1vvE6rd6ZExw6C8Ddou7Mqw0o

