const express = require('express')
const app = express()
const hostname = '127.0.0.1';
const port = 4000;
const axios = require('axios')

app.get('/', (req,res) => {
    res.end('HEllo orld')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/who_dis",(req,response) => {
    const data = {
        url: 'https://www.thewrap.com/wp-content/uploads/2021/12/harry-potter.jpg',
    };
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '5b0ae2db974b48efb713e6b3f362417a',
        }
    }
    // var post_req = request(options, function(res){
    //     // res.setEncoding('utf8');
    //     res.on('data', function(chuck) {
    //         console.log('Response: '+chuck);
    //     });
    // });
    // post_req.write(data);
    // post_req.end();
    axios.post('https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories&details=Celebrities&language=en', data, options).then((res) => {
        console.log("RESPONSE RECEIVED: ", res.data.categories[0].detail.celebrities);
        // for (let i = 0; i < res.data.categories.length; i++) {
        //     console.log(res.data.categories[i].detail)
            
        // }
        var names = []
        for (let i = 0; i < res.data.categories[0].detail.celebrities.length; i++) {
            names.push(res.data.categories[0].detail.celebrities[i].name)
        }
        response.send({names: names})
    }).catch((error) => console.log( error ) );
})