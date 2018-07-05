// @flow

// type Header =

type Payload = {
  method: string,
  url: string,
  headers: { [key: string]: string }[],
}

// type Protocol = 'http' | 'https'

type Transform = (payload: Payload) => string

const commonHeaders = {
  'Content-Type': [
    'application/x-www-form-urlencoded',
    'application/json',
    'multipart/form-data',
  ],
  Cookie: [],
  'User-Agent': [],
}

export const nodejs: Transform = ({ method, url, headers }) => {
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    url = 'http://' + url
  }

  const { protocol, hostname, port, pathname, search, hash } = new URL(url)
  const headerCode = Object.entries(headers)
    .map(([key, value]) => `'${key}': '${value}',`)
    .join('')

  return `const ${protocol} = require('${protocol}')

  const options = {
    method: '${method}',
    hostname: '${hostname}',
    port: '${port || 80}',
    path: '${pathname + search + hash}',
    headers: {
      ${headerCode}
    },
  }

  const req = ${protocol}.request(options, res => {
    const chunks = []

    res.on('data', chunk => {
      chunks.push(chunk)
    })

    res.on('end', () => {
      const response = Buffer.concat(chunks)
      // Do things here with response
    })
  })

  req.end()
`
}

export const curl: Transform = payload => {
  const headerCode = Object.entries(payload.headers)
    .map(([key, value]) => {
      return `  --header ${key}: ${value} \\\n`
    })
    .join('')

  return `curl --request ${payload.method} \
  --url ${payload.url} \
  ${headerCode}`
}

export const node: Transform = payload => {
  return `const request = require('request')

  var options = { method: 'GET',
    url: 'http://api.github.com/',
    headers:
     { 'cache-control': 'no-cache',
       'content-type': 'multipart/form-data' } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
`
}

export const go: Transform = payload => {
  return ``
}

export const python: Transform = payload => {
  return ``
}
