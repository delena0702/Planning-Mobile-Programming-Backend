const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const KEY_MAP_TMOUT = 3000000;
const CODE = "code";

class KeyMap {
    dic

    constructor() {
        this.dic = {};
    }

    add(key, value) {
        if (this.dic[key]) return false;
        this.dic[key] = value;
        setTimeout(() => {
            delete this.dic[key];
        }, KEY_MAP_TMOUT);
        return true;
    }

    get(key) {
        if (!this.dic[key]) return null;
        return this.dic[key];
    }
}

const key_map = new KeyMap();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/request', (req, res) => {
    let code;
    do {
        code = (0 | Math.random() * 1000000).toString().padStart(6, "0");
    } while (!key_map.add(code, req.body.data));

    res.type("xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?><respond><code>${code}</code><data>${req.body.data}</data></respond>`);
});

app.get('/connect', (req, res) => {
    let code = req.query[CODE];
    let result = key_map.get(code);

    res.type("xml");
    if (!result) res.send(`<?xml version="1.0" encoding="UTF-8"?><respond><state>${0}</state><code>${code}</code><data>${""}</data></respond>`);
    else res.send(`<?xml version="1.0" encoding="UTF-8"?><respond><state>${1}</state><code>${code}</code><data>${key_map.get(code)}</data></respond>`);
});

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html>
    
    <head>
        <title>Test</title>
    </head>
    
    <body>
        <form id="form" action="/request" method="post">
            <p>데이터 입력</p>
            <input type="text" name="data" />
            <input type="submit" value="제출"/>
        </form>
    </body>
    
    </html>`);
});

app.listen(port, () => {
    console.log(`Node.js app listening on port ${port}`);
});