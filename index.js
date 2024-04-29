const express = require('express');
const app = express();
const dns = require('dns');
const map = {};
// Basic Configuration
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:false}));
app.use(express.static('./public'));

function checkUrlValidity(urlString, callback) {
    try {
        const urlObj = new URL(urlString);
        const hostname = urlObj.hostname;
        
        dns.lookup(hostname, (err, address, family) => {
            if (err) {
                console.error('DNS Lookup Error:', err);
                callback(false);
            } else {
                console.log('Resolved IP Address:', address);
                callback(true);
            }
        });
    } catch (err) {
        console.error('Invalid URL:', err);
        callback(false);
    }
}

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
    const {url} = req.body;
    checkUrlValidity(url, isValid => {
        if (!isValid) {
            res.json({err : 'invalid url'});
        } else {
            let rand;
            do {
                rand = Math.floor(Math.random() * 10000);
            } while (map[rand]);
            
            map[rand] = url;
            res.json({original_url : url, short_url : rand});
        }
    });
});

app.get('/api/shorturl/:rout',(req,res)=>{
    const {rout} = req.params;
    if(map[rout]){
        const originalUrl = map[rout];
        res.redirect(originalUrl);
    }else{
        res.json({"error": "No short URL found for the given input"})
    }
});


app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});
