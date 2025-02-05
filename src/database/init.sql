CREATE IF NOT EXISTS TABLE content_metadata (
    id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique identifier for each record
    region VARCHAR(10) NOT NULL,        -- "USA" or "UE"
    source  VARCHAR(50) NOT NULL,       -- "europarl", "eurostat", etc.
    content_type VARCHAR(50) NOT NULL,  -- "NEWS", "Committees", etc.
    content_name TEXT NOT NULL,         -- Detailed name of the content
    url VARCHAR(255) NOT NULL           -- Content URL
);

-- EUROPARL NEWS
INSERT INTO content_metadata (region, source, content_type, content_name, url) VALUES
('UE', 'europarl', 'NEWS', 'news_economic_monetary_affairs', 'https://www.europarl.europa.eu/rss/topic/907/en.xml'),
('UE', 'europarl', 'NEWS', 'news_internal_market_industry', 'https://www.europarl.europa.eu/rss/topic/909/en.xml');

-- EUROPARL COMMITTEES
INSERT INTO content_metadata (region, source, content_type, content_name, url) VALUES
('UE', 'europarl', 'COMMITTEE', 'committee_foreign_affairs', 'https://www.europarl.europa.eu/rss/committee/afet/en.xml'),
('UE', 'europarl', 'COMMITTEE', 'committee_security_defence', 'https://www.europarl.europa.eu/rss/committee/sede/en.xml'),
('UE', 'europarl', 'COMMITTEE', 'committee_development', 'https://www.europarl.europa.eu/rss/committee/deve/en.xml'),
('UE', 'europarl', 'COMMITTEE', 'committee_international_trade', 'https://www.europarl.europa.eu/rss/committee/inta/en.xml'),
('UE', 'europarl', 'COMMITTEE', 'committee_economic_monetary_affairs', 'https://www.europarl.europa.eu/rss/committee/econ/en.xml'),
('UE', 'europarl', 'COMMITTEE', 'committee_industry_research_energy', 'https://www.europarl.europa.eu/rss/committee/itre/en.xml'),
('UE', 'europarl', 'COMMITTEE', 'committee_legal_affairs', 'https://www.europarl.europa.eu/rss/committee/juri/en.xml'),
('UE', 'europarl', 'COMMITTEE', 'committee_constitutional_affairs', 'https://www.europarl.europa.eu/rss/committee/afco/en.xml');

-- EUROPARL DELEGATIONS
INSERT INTO content_metadata (region, source, content_type, content_name, url) VALUES
('UE', 'europarl', 'DELEGATION', 'delegation_usa', 'https://www.europarl.europa.eu/rss/delegation/d-us/en.xml');


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



