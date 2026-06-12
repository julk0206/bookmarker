CREATE SEQUENCE IF NOT EXISTS bm_id_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS bookmarks (
    id bigint DEFAULT nextval('bm_id_seq') NOT NULL,
    title varchar(255) NOT NULL,
    url varchar(255) NOT NULL,
    created_at timestamp(6) WITH TIME ZONE,
    PRIMARY KEY (id)
);

ALTER TABLE bookmarks ALTER COLUMN id SET DEFAULT nextval('bm_id_seq');
ALTER TABLE bookmarks ADD COLUMN IF NOT EXISTS delflag CHAR(1) DEFAULT 'N';
