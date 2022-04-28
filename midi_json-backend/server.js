
// server
const http = require('http')
const { parse } = require('querystring')
const port = 3000

let saveJson= []
const server = http.createServer((req, res) => {
    let body = ''
    req.on('data', chunk => {
        body += chunk
    });
    req.on('end', () => {
        saveJson.push(body)
       // synchronous and set timeout
        if(saveJson.length === 6) {
            res.end(JSON.stringify(saveJson))
            console.log(saveJson)
            saveJson= [] 
      } else {
            setTimeout(() => {res.end(JSON.stringify(saveJson))}, 10000)
            console.log(saveJson)
            setTimeout(() => {saveJson= []},20000)
      }
    })  
})
server.listen(port, () =>{
    console.log(`App listening at http://localhost:${port}`)
})
