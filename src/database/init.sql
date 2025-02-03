CREATE TABLE europarl (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE eurostat (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE federalreserve (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE us_bea (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);
