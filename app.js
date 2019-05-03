// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
const fs = require('fs')
const routes = fs.readdirSync("./routes/")
routes.forEach((ruta)=>{fastify.route(require('./routes/'+ruta))})

fastify.register(require('fastify-postgres'), {
  connectionString: 'postgres://postgres@localhost/fungi'
})

//permite hacer get de una especie por nombre
fastify.get('/especies/:nombre', async (req, reply) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    'SELECT nombre, descripcion FROM especies WHERE nombre=$1', [req.params.nombre],
  )
  client.release()
  return rows
})

//permite hacer get de una especie por nombre
fastify.get('/especies/', async (req, reply) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    'SELECT nombre, descripcion FROM especies',
  )
  client.release()
  return rows
})

// permite hacer post de una especie con nombre
fastify.post('/especies/:nombre', (req, reply) => {
  return fastify.pg.transact(async client => {
    const nombre = await client.query('INSERT INTO especies(nombre) VALUES($1) RETURNING nombre', [req.params.nombre])
    return nombre
  })
})


fastify.ready().then(() => console.log(fastify.printRoutes()))

fastify.listen(3000)
