const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgre://localhost:5432/tv';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
	'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });
