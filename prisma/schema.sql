CREATE TABLE "public"."User" (
    id SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    badges INT,
    FOREIGN KEY ("badges") REFERENCES "public"."Badge"(id)
);

CREATE TABLE "public"."Post" (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(2000) NOT NULL,
    "postedBy" INT,
    "date" TIMESTAMP NOT NULL DEFAULT now(),
    "categoryId" INT,
    FOREIGN KEY ("categoryId") REFERENCES "public"."Category"(id),
    FOREIGN KEY ("postedBy") REFERENCES "public"."User"(id)
);

CREATE TABLE "public"."Category" (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255)
);

CREATE TABLE "public"."Comment" (
    id SERIAL PRIMARY KEY NOT NULL,
    content VARCHAR(1000) NOT NULL,
    "date" TIMESTAMP NOT NULL DEFAULT now(),
    "commentBy" INT,
    "postId" INT,
    FOREIGN KEY ("commentBy") REFERENCES "public"."User"(id),
    FOREIGN KEY ("postId") REFERENCES "public"."Post"(id)
);

CREATE TABLE "public"."Vote"(
    id SERIAL PRIMARY KEY NOT NULL,
    "userId" INT,
    "postId" INT,
    "date" TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY ("postId") REFERENCES "public"."Post"(id),
    FOREIGN KEY ("userId") REFERENCES "public"."User"(id)
);

CREATE TABLE "public"."Badge"(
    id SERIAL PRIMARY KEY NOT NULL,
    title  VARCHAR(255) NOT NULL, 
    icon bytea NOT NULL
);

CREATE TABLE "public"."Implement" (
    id SERIAL PRIMARY KEY NOT NULL,
    "userId" Int,
    "postId" Int,
    "date" TIMESTAMP NOT NULL DEFAULT now(),
    "comment" VARCHAR(500),
    FOREIGN KEY ("userId") REFERENCES "public"."User"(id),
    FOREIGN KEY ("postId") REFERENCES "public"."Post"(id)
);


