let http = require('http')
let https = require('https')
let unzipper = require('unzipper')
let querystring = require('querystring')

// 2. auth 路由：接受 Code, 用 code_cient_id+client_secret 换token
function auth(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])

  getToken(query.code, function(info) {
    response.write(`<a href='http://localhost:8083/?token=${info.access_token}'>publish</a>`)
    response.end()
  })
}
function getToken(code, callback) {
  let path = `/login/oauth/access_token?code=${code}&client_id=Iv1.4a2f0a8eeb0c944f&client_secret=650619687718d944529d80f2fad790f2a28bf328`
  let request = https.request({
    hostname: 'github.com',
    path,
    port: 443,
    method: 'POST'
  }, function(response) {
    let body = ''
    response.on('data', chunk => {
      body += (chunk.toString())
    })
    response.on('end', chunk => {
      callback(querystring.parse(body))
    })
  })

  request.end()
}
// 4. publish 路由：用 token 获取用户信息，检查权限，接受发布
function publish(request, response) {
  let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1])
  if (query.token) {
    getUser(query.token, info => {
      if (info.login === 'kenblikylee') {
        request.pipe(unzipper.Extract({ path: '../server/public/' }))
        request.on('end', function() {
          response.end('success!')
        })
      }
    })
  }
}

function getUser(token, callback) {
  let request = https.request({
    hostname: 'api.github.com',
    path: `/user`,
    port: 443,
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": 'toy-publish'
    }
  }, function(response) {
    let body = ''
    response.on('data', chunk => {
      body += (chunk.toString())
    })
    response.on('end', () => {
      callback(JSON.parse(body))
    })
  })

  request.end()
}

http.createServer(function(request, response) {
  if (request.url.match(/^\/auth\?/))
    return auth(request, response)
  if (request.url.match(/^\/publish\?/))
    return publish(request, response)
}).listen(8082)
