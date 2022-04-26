
const http = require('http')
const { parse } = require('querystring')
const port = 3000

let saveJson= []
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''
    req.on('data', chunk => {
      body += chunk
    });
    
    req.on('end', () => {
      let a = parse(body)
      saveJson.push(a)
      // synchronous and set timeout
      if(saveJson.length === 6) {
        res.end(JSON.stringify(saveJson))
        saveJson= [] 
      } else {
        setTimeout(() => {res.end(JSON.stringify(saveJson))}, 2000)
        setTimeout(() => {saveJson= []},5000)
      }
    })
  }
  else {
    res.end(`
    <!doctype html>
    <html>
    <body>
      <label><b>Only check receiving and synchronzing json files in server</b></label><br>
      <label><b>Choose MIDI files:</b></label><br><br>
        <form action="/user" method="post">
          <input type="text" name="input" /><br><br>
          <input type="number" name="number" /><br><br>
          <input type="file" name="file" /><br><br>
            <button>Send Json</button>
        </form>
    </body>
    </html>
    `)
  }
})
server.listen(port, () =>{
    console.log(`App listening at http://localhost:${port}`)
})