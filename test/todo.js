/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const Todo = require('../app/models/todo')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const createdID = []
const todo = faker.random.words()
const todoBaru = faker.random.words()

chai.use(chaiHttp)

describe('*********** TODOS ***********', () => {
  describe('/GET todos', () => {
    it('ini seharusnya GET semua item todo', (done) => {
      chai
        .request(server)
        .get('/todos')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('ini seharusnya GET semua todo dengan filter', (done) => {
      chai
        .request(server)
        .get('/todos?filter=true&fields=done')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have.property('done').eql('true')
          done()
        })
    })
  })

  describe('/POST todo', () => {
    it('ini seharusnya TIDAK POST todo tanpa isi todo', (done) => {
      const dataTodo = {}
      chai
        .request(server)
        .post('/todos')
        .send(dataTodo)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('ini seharusnya POST todo ', (done) => {
      const dataTodo = {
        todo
      }
      chai
        .request(server)
        .post('/todos')
        .send(dataTodo)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'todo', 'done')
          createdID.push(res.body._id)
          done()
        })
    })
  })

  describe('/GET/:id todos', () => {
    it('ini seharusnya GET todo berdasarkan id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/todos/${id}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('todo')
          res.body.should.include.keys('_id', 'todo', 'done')
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })

  describe('/PATCH/:id city', () => {
    it('ini seharusnya UPDATE todo berdasarkan id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .patch(`/todos/${id}`)
        .send({
          todo: todoBaru
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('todo').eql(todoBaru)
          done()
        })
    })
  })

  describe('/DELETE/:id todo', () => {
    it('ini seharusnya DELETE todo berdasarkan id', (done) => {
      const dataTodo = {
        todo
      }
      chai
        .request(server)
        .post('/todos')
        .send(dataTodo)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'todo', 'done')
          res.body.should.have.property('todo').eql(todo)
          chai
            .request(server)
            .delete(`/todos/${res.body._id}`)
            .end((error, result) => {
              result.should.have.status(200)
              result.body.should.be.a('object')
              result.body.should.have.property('msg').eql('DELETED')
              done()
            })
        })
    })
  })

  after(() => {
    createdID.forEach((id) => {
      Todo.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
