class Service {
  async welcom(request, reply) {
    reply.send({
      message: "welcom <%= name %>"
    })
  }
}

module.exports = () => new Service();
