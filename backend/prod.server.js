const express = require("express")
const app = express()

const cookieParser = require("cookie-parser") // cookie解析
const compression = require("compression") // gzip压缩
const registerRouter = require("./router")

const port = process.env.PORT || 4031

app.use(cookieParser())
app.use(compression())

// 代理接口
registerRouter(app)

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log("Listening at http://localhost:" + port + "\n")
})
