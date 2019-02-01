// let Book = require('../controller/siswaController');

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../app');
// var should = chai.should();
// const client = require('../config/connection')



// chai.use(chaiHttp);

//   describe('/DROP SISWA', () => {
//     it('Migrate Table and index table userAccount', (done) => {
//       client.execute('DROP TABLE siswa')
//       .then(success => {
//           chai.request(server)
//               .post('/migration/siswa')
//               .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('success');
//                   res.body.should.have.property('success').eql(true);
//                   res.body.should.have.property('msg');
//                   chai.request(server)
//                   .post('/migration/siswa-index')
//                   .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('success');
//                     res.body.should.have.property('success').eql(true);
//                     res.body.should.have.property('msg');
//                     done()
//                   });
//           });
//       })
//       .catch(err => {
//           should.throw()
//           done()
//       });
//     });
//   });

//   describe('/GET', () => {
//       it('GET Siswa', (done) => {
//         chai.request(server)
//             .get('/siswa/data')
//             .end((err, res) => {
//                 should.exist(res.body);
//                 res.should.have.status(200);
//               done();
//             });
//       });
//   });


//   describe('/STORE', () => {
//         it('CREATE Siswa', (done) => {
//             let siswa = {
//                 nama: "ujang",
//                 umur: "oke"
//             }
//         chai.request(server)
//             .post('/siswa/store')
//             .send(siswa)
//             .end((err, res) => {
//               should.exist(res.body);                    
//               res.should.have.status(200);
//               done();
//             });
//         });
//     });

//   describe('/UPDATE', () => {
//     it('/Update Siswa', function(done) {
//       chai.request(server)
//         .get('/siswa/data')
//         .end(function(err, res){
//           let siswa = {
//             id: res.body.siswaRequest[0].id,
//             nama: "asjdasjd",
//             umur: "aksdkasdaskjdkas"
//         }
//           chai.request(server)
//             .post('/siswa/update')
//             .send(siswa)
//             .end(function(error, res){
//               should.exist(res.body);                    
//               res.should.have.status(200);
//               done();
//           });
//         });
//     });
// });