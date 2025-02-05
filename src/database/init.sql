CREATE IF NOT EXISTS TABLE content_metadata (
    id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique identifier for each record
    region VARCHAR(10) NOT NULL,        -- "USA" or "UE"
    content_type VARCHAR(50) NOT NULL,  -- "NEWS", "Committees", etc.
    content_name TEXT NOT NULL,         -- Detailed name of the content
    url VARCHAR(255) NOT NULL           -- Content URL
);

-- Drop existing tables if they exist
DROP TABLE IF EXISTS europarl CASCADE;
DROP TABLE IF EXISTS eurostat CASCADE;
DROP TABLE IF EXISTS federalreserve CASCADE;
DROP TABLE IF EXISTS us_bea CASCADE;

-- Create tables for each data source
CREATE TABLE europarl (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    link TEXT,
    published_at TIMESTAMP DEFAULT NOW(),
    content TEXT
);

CREATE TABLE eurostat (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    link TEXT,
    published_at TIMESTAMP DEFAULT NOW(),
    content TEXT
);

CREATE TABLE federalreserve (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    link TEXT,
    published_at TIMESTAMP DEFAULT NOW(),
    content TEXT
);

CREATE TABLE us_bea (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    link TEXT,
    published_at TIMESTAMP DEFAULT NOW(),
    content TEXT
);



