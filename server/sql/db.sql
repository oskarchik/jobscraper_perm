CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
);

CREATE TABLE IF NOT EXISTS jobs(
	id BIGSERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(50),
	company VARCHAR(50),
	technologies VARCHAR(50)[],
	job_link VARCHAR(150) NOT NULL UNIQUE,
	date VARCHAR(15)
);

-- INSERT INTO USERS

insert into Users(name, email, password)
    values('oscar', 'oscar@oscar.com', '1234')
insert into Users(name, email, password)
    values('pepe', 'pepe@pepe.com', '1234')
insert into Users(name, email, password)
    values('ana', 'ana@ana.com', '1234')

-- INSERT INTO JOBS
insert into Jobs(title, company, technologies, joblink, date)
    values('super fullstack dev', 'best in the world', array['react', 'node.js'], 'http://www.bestjobintheworld.com', '12/20/2021');
    
    