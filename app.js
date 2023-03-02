const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
  res.sendFile(__dirname +"/signup.html");
});
app.post("/", (req, res) => {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  }
  const api_key = process.env.API_KEY;
  const list_id = process.env.LIST_ID;
  const any_string = process.env.ANY_STRING;
const jsonData = JSON.stringify(data);
const url = `https://us13.api.mailchimp.com/3.0/lists/${list_id}`;
const options = {
  method:"POST",
  auth: `${any_string}:${api_key}`
  //Replace <any_string> with any string of your choice (your name/username example: auth: "mandalorian:us1-XXXXXXXXXXXXX"
}

const request = https.request(url, options, function(response){
  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }
  else{
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
});
request.write(jsonData);
request.end();
});
app.post("/failure", (req,res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running at port 3000");
})





//API Keys:

//ListID:

//Data Center: usX


//To Use the code just replace the API_KEYS with your API's keys and LIST_ID with your List Id generated on Milchimp (https://mailchimp.com/)

//Also Make sure to Replace with your Data Center available on your API keys. Example: Mine was us13
