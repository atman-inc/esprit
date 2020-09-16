export default {
  mode: '<%= mode %>',
<% if (mode == 'REST') { %>
  openAPI: {
    jsonFilePath: `${__dirname}/lib/infrastructure/webserver/swagger.bundle.json`,
    service: `${__dirname}/lib/infrastructure/webserver/service`
  }
<% } %>
}