let client = require('../config/connection');
module.exports={
    create: function(req,res){
      let result={
        success: false,
        msg:'',
        level: null
      }
      let query = 'CREATE TABLE siswa (id uuid,'+
                                       'nama varchar,'+
                                       'umur varchar,'+
                                       'lastlogin timestamp,'+
                                       'lastactivity timestamp,'+
                                       'createdAt timestamp,'+
                                       'updatedAt timestamp, PRIMARY KEY (id));'
      client.execute(query)
      .then(level=>{
        result.success= true
        result.msg='Create table Level success'
        result.level=level
        res.json(result)
      })
      .catch(err=>{
        console.log(err);
        result.msg= err.message
        res.json(result)
      })
    },
    indexColumn: function(req,res){
        let result={
          success: false,
          msg:''
        }
        let indexNama= 'CREATE INDEX ON siswa(nama)'
        let indexUmur= 'CREATE INDEX ON siswa(umur)'
  
        client.execute(indexNama)
        .then(nama=>{
          return client.execute(indexUmur)
        })
        .then(umur=>{
          result.success=true
          result.msg='indexing user table success :)'
          res.json(result)
        })
        .catch(err=>{
          console.log(err);
          result.msg=err.message
          res.status(500).json(result)
        })
      },
    lastLogin: function(req,res){
      let result={
        success: false,
        msg:''
      }
      client.execute('SELECT id FROM siswa', {prepare: true})
      .then(siswa=>{
        let listIds = ''
        for(let index in siswa.rows){
          let currentData = siswa.rows[index]
          if(listIds == '') {
            listIds = currentData.id
          } else {
            listIds += ','+currentData.id
          }
        }
        //return client.execute('UPDATE siswa SET lastactivity=totimestamp(now()) WHERE id IN ('+listIds+')',{prepare:true})
        client.execute('ALTER TABLE siswa ADD lastlogin timestamp', {prepare:true})
        .then(alter=>{
          result.msg = 'SUCCESS ADD FIELD'
          result.success = true
          res.json(result)
        })
        .catch(err => {
          console.log(err);
          result.msg=err.message
          res.json(result)  
        })
      })
      .catch(err=>{
        console.log(err);
        result.msg=err.message
        res.json(result)
      })
    },
    lastActivity: function(req,res){
    let result={
      success: false,
      msg:''
    }
    client.execute('SELECT id FROM siswa', {prepare: true})
    .then(siswa=>{
      let listIds = ''
      for(let index in siswa.rows){
        let currentData = siswa.rows[index]
        if(listIds == '') {
          listIds = currentData.id
        } else {
          listIds += ','+currentData.id
        }
      }
      //return client.execute('UPDATE siswa SET lastactivity=totimestamp(now()) WHERE id IN ('+listIds+')',{prepare:true})
      client.execute('ALTER TABLE siswa ADD lastactivity timestamp', {prepare:true})
      .then(update => {
        result.msg = 'SUCCESS ADD FIELD'
        result.success = true
        res.json(result)
      })
      .catch(err => {
        console.log(err);
        result.msg=err.message
        res.json(result)  
      })
    })
    .catch(err=>{
      console.log(err);
      result.msg=err.message
      res.json(result)
    })
  }
}
