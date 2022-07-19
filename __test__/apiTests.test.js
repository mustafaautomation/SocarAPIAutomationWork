const request = require('../base');
const exp = require('constants');



describe('Users test',()=>{

    let userID;
    
    describe('POST',()=>{
    it('/users',()=>{

        const data = {

            
            email : request.faker.faker.internet.email(),
            name : `${request.faker.faker.name.lastName()} ${request.faker.faker.name.firstName()}` ,
            gender : request.faker.faker.name.gender(true).toLowerCase(),
            status : 'active'
        }
     

        return request.request.post('/users')
        .set("Authorization" ,`Bearer ${request.API_KEY}`)
        .send(data)
        .then((res)=>{
       

            expect(res.body.data.email).toEqual(data.email)
            expect(res.body.data).toMatchObject(data)
            console.log(res.body.data)
            userID = res.body.data.id; 
         
        })

     })

    })

    describe('GET',()=>{
    it('/Users',()  =>{


       return request.request.get(`/users`).
       set("Authorization" ,`Bearer ${request.API_KEY}`).
       expect(200).
       then((res)=>{

            
            expect(res.body.data[1].id).toBeGreaterThan(1)
            expect(res.body).toBeDefined()
          
          
        })
    })



    it('/Users:id',()  =>{


        return request.request.get(`/users/${userID}`)
        .set("Authorization" ,`Bearer ${request.API_KEY}`)
        .expect(200)
        .then((res)=>{
 
             
             expect(res.body.data.id).toEqual(userID)
             expect(res.body).toBeDefined()
           
           
         })
     })


     
    it('Users?ender=female&page=5&status=active',()  =>{


        return request.request.get(`/users?&page=5&limit=3&gender=female&status=active`)
        .set("Authorization" ,`Bearer ${request.API_KEY}`)
        .expect(200)
        .then((res)=>{
 

            expect(res.body).toBeDefined()         

            res.body.data.forEach(data => {
                expect(data.gender).toEqual("female")
                expect(data.status).toEqual("active")
            })
            
           
           
         })
     })
})


   

    

    describe('PUT',()=>{
     
     it('Put /users  update data',()=>{

        const data = {

            email : request.faker.faker.internet.email(),
            name : `${request.faker.faker.name.lastName()} ${request.faker.faker.name.firstName()}` ,
            gender : request.faker.faker.name.gender(true).toLowerCase(),
            status : 'inactive'
     
        }

        return request.request.put(`/users/${userID}`)
        .set("Authorization" ,`Bearer ${request.API_KEY}`)
        .send(data)
        .then((res)=>{
   

            expect(res.body.data.email).toEqual(data.email)
            expect(res.body.data).toMatchObject(data)
        })

     })

     

    })


    describe('DELETE',()=>{
     it('Delete /user',()=>{

        return request.request.delete(`/users/${userID}`)
        .set("Authorization" ,`Bearer ${request.API_KEY}`)
        .expect(204)
        .then((res) =>{
        
    
        })
     })

    })




    


});