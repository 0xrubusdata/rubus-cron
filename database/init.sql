-- Drop existing tables if they exist
DROP TABLE IF EXISTS content_metadata CASCADE;
DROP TABLE IF EXISTS europarl CASCADE;
DROP TABLE IF EXISTS eurostat CASCADE;
DROP TABLE IF EXISTS federal_reserve CASCADE;
DROP TABLE IF EXISTS us_bea CASCADE;
-- TEMPORARY TABLE FOR INTERMEDIATE LINKS
DROP TABLE IF EXISTS federal_reserve_links CASCADE;


CREATE TABLE content_metadata (
    id SERIAL PRIMARY KEY,              -- Unique identifier
    region VARCHAR(10) NOT NULL,        -- "USA" or "UE"
    source  VARCHAR(50) NOT NULL,       -- "europarl", "eurostat", etc.
    content_type VARCHAR(50) NOT NULL,  -- "NEWS", "Committees", etc.
    content_name TEXT NOT NULL,         -- Detailed name of the content
    url VARCHAR(510) NOT NULL           -- Content URL
);

-- EUROPARL NEWS
INSERT INTO content_metadata (id, region, source, content_type, content_name, url) VALUES
(1, 'UE', 'europarl', 'NEWS', 'news_economic_monetary_affairs', 'https://www.europarl.europa.eu/rss/topic/907/en.xml'),
(2, 'UE', 'europarl', 'NEWS', 'news_internal_market_industry', 'https://www.europarl.europa.eu/rss/topic/909/en.xml');

-- EUROPARL COMMITTEES
INSERT INTO content_metadata (id, region, source, content_type, content_name, url) VALUES
(3, 'UE', 'europarl', 'COMMITTEE', 'committee_foreign_affairs', 'https://www.europarl.europa.eu/rss/committee/afet/en.xml'),
(4, 'UE', 'europarl', 'COMMITTEE', 'committee_security_defence', 'https://www.europarl.europa.eu/rss/committee/sede/en.xml'),
(5, 'UE', 'europarl', 'COMMITTEE', 'committee_development', 'https://www.europarl.europa.eu/rss/committee/deve/en.xml'),
(6, 'UE', 'europarl', 'COMMITTEE', 'committee_international_trade', 'https://www.europarl.europa.eu/rss/committee/inta/en.xml'),
(7, 'UE', 'europarl', 'COMMITTEE', 'committee_economic_monetary_affairs', 'https://www.europarl.europa.eu/rss/committee/econ/en.xml'),
(8, 'UE', 'europarl', 'COMMITTEE', 'committee_industry_research_energy', 'https://www.europarl.europa.eu/rss/committee/itre/en.xml'),
(9, 'UE', 'europarl', 'COMMITTEE', 'committee_legal_affairs', 'https://www.europarl.europa.eu/rss/committee/juri/en.xml'),
(10, 'UE', 'europarl', 'COMMITTEE', 'committee_constitutional_affairs', 'https://www.europarl.europa.eu/rss/committee/afco/en.xml');

-- EUROPARL DELEGATIONS
INSERT INTO content_metadata (id, region, source, content_type, content_name, url) VALUES
(11, 'UE', 'europarl', 'DELEGATION', 'delegation_usa', 'https://www.europarl.europa.eu/rss/delegation/d-us/en.xml');

-- EUROSTAT NEWS RELEASES
INSERT INTO content_metadata (id, region, source, content_type, content_name, url) VALUES
(12, 'UE', 'eurostat', 'NEWS_RELEASES', 'news_releases_economy_finance', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_ECOFIN&_estatsearchportlet_WAR_estatsearchportlet_collection=CAT_PREREL'),
(13, 'UE', 'eurostat', 'NEWS_RELEASES', 'news_releases_industry_trade_services', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_INDCOM&_estatsearchportlet_WAR_estatsearchportlet_collection=CAT_PREREL'),
(14, 'UE', 'eurostat', 'NEWS_RELEASES', 'news_releases_international_trade', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_EXTTRA&_estatsearchportlet_WAR_estatsearchportlet_collection=CAT_PREREL'),
(15, 'UE', 'eurostat', 'NEWS_RELEASES', 'news_releases_science_technology', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_RESDEV&_estatsearchportlet_WAR_estatsearchportlet_collection=CAT_PREREL');

-- EUROSTAT NEWS
INSERT INTO content_metadata (id, region, source, content_type, content_name, url) VALUES
(16, 'UE', 'eurostat', 'NEWS', 'eurostat_news_economy_finance', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_ECOFIN&_estatsearchportlet_WAR_estatsearchportlet_collection=CAT_EURNEW'),
(17, 'UE', 'eurostat', 'NEWS', 'eurostat_news_industry_trade_services', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_INDCOM&_estatsearchportlet_WAR_estatsearchportlet_collection=CAT_EURNEW'),
(18, 'UE', 'eurostat', 'NEWS', 'eurostat_news_international_trade', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_EXTTRA&_estatsearchportlet_WAR_estatsearchportlet_collection=CAT_EURNEW'),
(19, 'UE', 'eurostat', 'NEWS', 'eurostat_news_science_technology', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_RESDEV&_estatsearchportlet_WAR_estatsearchportlet_collection=CAT_EURNEW');

-- EUROSTAT DATASETS
INSERT INTO content_metadata (id, region, source, content_type, content_name, url) VALUES
(20, 'UE', 'eurostat', 'DATASETS', 'datasets_economy_finance', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_ECOFIN&_estatsearchportlet_WAR_estatsearchportlet_collection=dataset'),
(21, 'UE', 'eurostat', 'DATASETS', 'datasets_industry_trade_services', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_INDCOM&_estatsearchportlet_WAR_estatsearchportlet_collection=dataset'),
(22, 'UE', 'eurostat', 'DATASETS', 'datasets_international_trade', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_EXTTRA&_estatsearchportlet_WAR_estatsearchportlet_collection=dataset'),
(23, 'UE', 'eurostat', 'DATASETS', 'datasets_science_technology', 'https://ec.europa.eu/eurostat/en/search?p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=2&p_p_state=maximized&p_p_mode=view&p_p_resource_id=atom&_estatsearchportlet_WAR_estatsearchportlet_theme=PER_RESDEV&_estatsearchportlet_WAR_estatsearchportlet_collection=dataset');

-- FEDERAL RESERVE NEWS
INSERT INTO content_metadata (id, region, source, content_type, content_name, url) VALUES
(24, 'USA', 'federalreserve', 'NEWS', 'news_press_all', 'https://www.federalreserve.gov/feeds/press_all.xml'),
(25, 'USA', 'federalreserve', 'NEWS', 'news_press_monetary', 'https://www.federalreserve.gov/feeds/press_monetary.xml');

-- FEDERAL RESERVE SPEECHES & TESTIMONY
INSERT INTO content_metadata (id, region, source, content_type, content_name, url) VALUES
(26, 'USA', 'federalreserve', 'SPEECHES_TESTIMONY', 'speeches_and_testimony', 'https://www.federalreserve.gov/feeds/speeches_and_testimony.xml'),
(27, 'USA', 'federalreserve', 'SPEECHES_TESTIMONY', 'speeches_testimony_feds', 'https://www.federalreserve.gov/feeds/feds.xml');


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

CREATE TABLE federal_reserve (
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

CREATE TABLE federal_reserve_links (
    id SERIAL PRIMARY KEY,
    federal_reserve_id INT NOT NULL REFERENCES federal_reserve(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    processed BOOLEAN DEFAULT FALSE
);

CREATE TABLE federal_reserve_documents (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    federal_reserve_link_id INT NOT NULL REFERENCES federal_reserve_links(id) ON DELETE CASCADE
);




