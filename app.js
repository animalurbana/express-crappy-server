const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const he = require('he')
const raejs = require('@jodacame/raejs');


app.use(cors())

app.get('/rae-api/:palabra', (req, res) => {
  async function callrae(params) {
    
    const query = params;
    const response = await raejs.search(query);
    if(!response.error){
      results = response.results
      results.forEach(result => {
        result.source = he.decode(result.source)
        result.definition.forEach((def,ind) =>{
          result.definition[ind] = he.decode(def)
        })
      });
      res.send(results)
    }
    else{
      res.send({"code":"404"})
    }
  }

  callrae(req.params.palabra)
  


})

app.listen(process.env.PORT , () => {
  console.log(`Example app listening ${process.env.PORT}`)
  
})

