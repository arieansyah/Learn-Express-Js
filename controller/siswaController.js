const client = require('../config/connection');
const errors = require('../module/error');
require('dotenv').config();

async function createSiswa(req, res) {
  let result = {
      success : false
    }

  if (req.body.nama && req.body.umur) {
  var query = 'INSERT INTO siswa (id, nama, umur, createdat, updatedat) VALUES (uuid(),\''+req.body.nama+'\', \''+req.body.umur+'\', totimestamp(now()), totimestamp(now()))'
  client.execute(query, {prepare:true})
      .then(validate => {
          result.success = true
          result.msg = "berhasil"
          res.json(result)
      }).catch(err => {
        result.success = true
        errors.errorsHandling(400, '', err,result, res)
      })
  }else {
      errors.errorsHandling(400, "required param", '',result, res)
  }    
}

module.exports.createSiswa = createSiswa;

async function getData(limit){
  let globalData = {}
  let listData
  if (limit == '') {
    listData = 'SELECT * FROM siswa'
  }else{
    listData = 'SELECT * FROM siswa LIMIT '+limit
  }
  let siswaRequest = await client.execute(listData, {prepare:true})
  globalData = siswaRequest.rows
  return globalData
}

async function dataSiswa(req, res){
  let result = {
    success : false
  }
  
  let numRows;
  let numPerPage = parseInt(req.query.npp, 10) || 1;
  let page = parseInt(req.query.page, 10) || 0;

  let numPages;
  let limit = page * numPerPage;
  
  //query first for get count all data on db
  getData('')
  .then(function(results) {
    numRows = results.length;
    numPages = Math.ceil(numRows / numPerPage);
    //console.log('number of pages:', numPages);
  })
  //query second for get data with limit
  .then(() => getData(limit))
  .then(function(results) {
    result = {
      success: true,
      results: results
    };
    if (page <= numPages) {
      result.pagination = {
        current: page,
        perPage: numPerPage,
        previous: page > 0 ? page - 1 : undefined,
        next: page < numPages - 1 ? page + 1 : undefined
      }
    }
    else result.pagination = {
      err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
    }
    res.json(result);
  })
  .catch(function(err) {
    console.error(err);
    res.json(result);
  });
}

module.exports.dataSiswa = dataSiswa;

async function mantapSiswa(req, res){
  let result = {
    success : false
  }
  let numPerPage = parseInt(req.query.npp, 10) || 1;
  let page = parseInt(req.query.page, 10) || 0;

  let limit = page * numPerPage;

  getData('')
  .then(function (hasil) {
    // result = hasil.sort(function(a,b){
    //   return a.umur - b.umur
    // })
    result = hasil
    //result.extra = hasil
    res.json(result)
  })
  .catch(function (err) {
    console.log(err);
    
  })
}

module.exports.mantapSiswa = mantapSiswa;

function toJson(args) {
  return JSON.parse(args)
}

async function mainArray(req, res){
  let result = {
    success : false
  }

  listDataoke = 'SELECT * FROM siswa'
  dataoke = await client.execute(listDataoke, {prepare:true})
  let siap = []
  for (let index = 0; index < 5; index++) {
    siap.push(dataoke.rows[index])
  }

  listData = 'SELECT * FROM siswa'
  await client.execute(listData, {prepare:true})
  .then(function (hasil) {
    result.success = "true"
    result = hasil.rows[0]
    // let apasih = {}
    // let bangke = {}

    //apasih.push(hasil.rows[0])
    //bangke = apasih.push(hasil.rows[0,1,2])
    
    // for (let index = 0; index < 5; index++) {
    //   apasih.push(hasil.rows[index]) 
    // }
    // result.data = apasih
    //console.log(siap);
    
    result.data = siap

    //result.extra = hasil
    res.json(result)
  })
  .catch(function (err) {
    console.log(err);
    
  })
}

module.exports.mainArray = mainArray;

async function updateData(req, res) {
  let result = {
    success : false
  }

  if (req.body.id) {
    let query = 'UPDATE siswa SET '+
              (typeof req.body.nama !== 'undefined' ? 'nama = \''+req.body.nama+'\', ':'')+
              (typeof req.body.umur !== 'undefined' ? 'umur = \''+req.body.umur+'\', ':'')+
              'updatedat = totimestamp(now()) WHERE id = '+req.body.id
    //console.log(query);
    client.execute(query, {prepare:true})
    .then(validate => {
      result.success = true
      result.msg = "berhasil"
      res.json(result)
    }).catch(err => {
      console.log(err);
    })
  }else {
    result.msg = 'param must required'
    res.status(422).json(result)
  }
}

module.exports.updateData = updateData;
