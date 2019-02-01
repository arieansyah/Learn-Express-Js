let Book = require('../controller/siswaController');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
var should = chai.should();
const client = require('../config/connection')

chai.use(chaiHttp);

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

describe('/STORE', () => {
    it('CREATE Siswa', (done) => {
        var batas = 50;
        for (let index = 1; index < batas; index++) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            let siswa = {
                nama: text,
                umur: index
            }
            chai.request(server)
                .post('/siswa/store')
                .send(siswa)
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    if(index == batas-1){
                        done();
                    }
            });
        }
    });        
});