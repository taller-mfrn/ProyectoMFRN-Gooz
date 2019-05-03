module.exports =
{
  method: 'GET',
  url: '/contacto',
  schema: {
    querystring: {
      name: { type: 'string' },
      excitement: { type: 'integer' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          email: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ email: 'gdegooz@gmail.com' })
  }
}
