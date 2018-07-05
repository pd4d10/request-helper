const http = require('http')

const options = {
  method: '{{method}}',
  hostname: 'api.github.com',
  port: null,
  path: '/',
  headers: {
    'cache-control': 'no-cache',
  },
}

const req = http.request(options, res => {
  const chunks = []

  res.on('data', chunk => {
    chunks.push(chunk)
  })

  res.on('end', () => {
    const body = Buffer.concat(chunks)
    console.log(body.toString())
  })
})

req.end()
