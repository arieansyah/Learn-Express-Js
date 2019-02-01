### Prerequisites
- NodeJS : minimal v.6.9.x LTS | we recomended to install by [nvm](https://github.com/creationix/nvm) ways
- npm : minimal v.3.1
- Cassandra : v.3.11.2

### Install Project

1. clone ```$ git clone ```
2. duplicate _.env.example_ to _.env_
3. setup environment variable on _.env_
4. install dependencies ```$ npm -i```
5. run project ```$ npm run dev```
6. create keyspace cassandra
7. migrate database

### Terserah Dia lah pokoknya
1. Simple CRUD with async await
2. Unit Testing chai and mocha js <br>
    => on folder > test
    => unComment > npm test
    - except seeder.js is for generate many data on one process
3. Pagination With Cassandra DB <br>
    => on URL = {{ url }}/siswa/data?npp=10&page=1
