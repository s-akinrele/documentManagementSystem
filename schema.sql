CREATE TABLE public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    firstname character varying(255) COLLATE pg_catalog."default",
    lastname character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default",
    "RoleId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "Users_email_key" UNIQUE (email),
    CONSTRAINT "Users_RoleId_fkey" FOREIGN KEY ("RoleId")
        REFERENCES public."Roles" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

CREATE TABLE public."Roles"
(
    id integer NOT NULL DEFAULT nextval('"Roles_id_seq"'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Roles_pkey" PRIMARY KEY (id),
    CONSTRAINT "Roles_title_key" UNIQUE (title)
)

CREATE TABLE public."Documents"
(
    id integer NOT NULL DEFAULT nextval('"Documents_id_seq"'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    "OwnerId" integer,
    access "enum_Documents_access" DEFAULT 'public'::"enum_Documents_access",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Documents_pkey" PRIMARY KEY (id),
    CONSTRAINT "Documents_title_key" UNIQUE (title),
    CONSTRAINT "Documents_OwnerId_fkey" FOREIGN KEY ("OwnerId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)