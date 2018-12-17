const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../bin/www')
var assert = require('assert');
let should = chai.should()
chai.use(chaiHttp)
chai.use(require('chai-string'));

describe('Routes/admin checks', () => {
  it('admin_login', () => {
    // Notice we are sending the request to the `server` export instead
    // of a URL
    logindata = {email:'parag@gmail.com',password:'1234'};
    chai.request(app)
      .post('/api/admin/login')
      .send(logindata)
      .then(res => {
      	console.log(res.text);
        res.should.have.status(200);
        // res.text.should.have('"status":true');
        containIgnoreCase(res.text, '"status":true'); 
        // done();
        // add more tests here as you see fit
      })
      .catch(err => {
         throw err
      })
  })

  it('add admin', () => {
    // Notice we are sending the request to the `server` export instead
    // of a URL
    adddata = {adminname:'pratik@gmail.com',password:'1234',name:'pratik',email:'pratik@gmail.com',mobile1:'8149114200',mobile2:'8149114201'};
    chai.request(app)
      .post('/api/admin/add')
      .send(adddata)
      .then(res => {
      	console.log(res.text);
        res.should.have.status(200);
        // res.text.should.have('"status":true');
        // assert.containIgnoreCase(res.text, '"status":true'); 
        // done();
        // add more tests here as you see fit
      })
      .catch(err => {
         throw err
      })
  })


  it('delete admin', () => {
    // Notice we are sending the request to the `server` export instead
    // of a URL
    adddata = {admin_id:'2'};
    chai.request(app)
      .get('/api/admin/delete')
      .send(adddata)
      .then(res => {
      	console.log(res.text);
        res.should.have.status(200);
        // res.text.should.have('"status":true');
        // assert.containIgnoreCase(res.text, '"status":true'); 
        // done();
        // add more tests here as you see fit
      })
      .catch(err => {
         throw err
      })
  })


   it('view admin', () => {
    // Notice we are sending the request to the `server` export instead
    // of a URL
    chai.request(app)
      .get('/api/admin/view')
      .then(res => {
      	console.log(res.text);
        res.should.have.status(200);
        // res.text.should.have('"status":true');
        // assert.containIgnoreCase(res.text, '"status":true'); 
        // done();
        // add more tests here as you see fit
      })
      .catch(err => {
         throw err
      })
  })

   it('admin logout', () => {
    // Notice we are sending the request to the `server` export instead
    // of a URL
    logindata = {email:'parag@gmail.com',password:'1234'};
    chai.request(app)
      .get('/api/admin/logout')
      .then(res => {
      	console.log(res.text);
        res.should.have.status(200);
        // res.text.should.have('"status":true');
        // assert.containIgnoreCase(res.text, '"status":true'); 
        // done();
        // add more tests here as you see fit
      })
      .catch(err => {
         throw err
      })
  })


})