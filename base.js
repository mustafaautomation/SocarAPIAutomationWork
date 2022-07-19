var supertest = require('supertest'); 
var faker = require("@faker-js/faker")
const request = supertest('https://gorest.co.in/public/v1'); 

const API_KEY = "372592dcc39419d6346d4fd9234679ccc3c6eb8fcd0a06898812b34ec3f799a5"

module.exports = 
{
    request,
    faker,
    API_KEY
}