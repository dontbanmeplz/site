const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

const fs = require('fs')
newsRouter.get('', async (req, res) => {
    try {
        const newsAPI = await axios.get(`http://205.185.125.73:5000/`)
        res.render('news', { articles: [{"title":"Las Islas","cap":"Las montanas de Amantani","excerpt":"Yo recomiendo que camines a las montañas de Amantani. Yo aconsejo que tu tengas un tour por las islas de Uros en un barco.","thumbnail_url":"https://cdn.discordapp.com/attachments/1055936013136056460/1093364032033013770/image0.jpg"},{"thumbnail_url":"https://cdn.discordapp.com/attachments/1055936013136056460/1093374910669262868/titicacaisth.jpg","title":"Problemas del Medio Ambiente","cap":"La Contaminación","excerpt":"Yo sugiero que no nades en el lago, pero es muy bonito. Es lástima que tu no puedas nadar porque el agua es más fría. Yo insisto en que tomes un Kayak en el lago porque es muy fácil y divertido. Yo quiero que tú vayas de pesca en el lago con los pescadores de aquí. "},{"title":"El Lago Titicaca","cap":"La Isla del Sol","excerpt":"El Lago Titicaca es un lago grande en el sur de Perú y el oeste de Bolivia. Lake Titicaca es el lago navegable más alto en el mundo. Hay varias islas en el lago. Hay las islas de Suriki, Uros, Amantani, Taquile, Isla del Sol, y la Isla De Luna.","thumbnail_url":"https://cdn.discordapp.com/attachments/1055936013136056460/1093368515991449701/image0.jpg"},{"title":"La mapa","cap":"","excerpt":"","thumbnail_url":"https://cdn.discordapp.com/attachments/1055936013136056460/1093371786214789221/image0.jpg"},{"title":"El Agua","cap":"Un Pescador","excerpt":"El Lago Titicaca es un lago grande en el sur de Perú y el oeste de Bolivia. Lake Titicaca es el lago navegable más alto en el mundo. Hay varias islas en el lago. Hay las islas de Suriki, Uros, Amantani, Taquile, Isla del Sol, y la Isla De Luna. El Lago Titicaca es el lago más grande de Sudamérica. ","thumbnail_url":"https://cdn.discordapp.com/attachments/1055936013136056460/1093365932862210148/image0.jpg"}] })
    } catch (err) {
        if (err.response) {
            res.render('news', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) {
            res.render('news', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles: null })
            console.error('Error', err.message)
        }
    }
})

newsRouter.get('/:id', async (req, res) => {
    let articleID = req.params.id
    if (articleID == "about"){
        const newsAPI = await axios.get(`http://205.185.125.73:5000/3560`)
        res.render('about', { article: newsAPI.data})
    }
    try {
        const newsAPI = await axios.get(`http://205.185.125.73:5000/${articleID}`)
        const newsAP = await axios.get(`http://205.185.125.73:5000/comments/${articleID}`)
        res.render('newsSingle', { article: newsAPI.data, comments: newsAP.data })
    } catch (err) {
        if (err.response) {
            res.render('newsSingle', { article: null, comments: []})
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('newsSingle', { article: null, comments: [] })
            console.log(err.requiest)
        } else {
            res.render('newsSingle', { article: null, comments: [] })
            console.error('Error', err.message)
        }
    }
})


newsRouter.post('', async (req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`http://205.185.125.73:5000/search/${search}`)
        res.render('newsSearch', { articles: newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('newsSearch', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('newsSearch', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles: null })
            console.error('Error', err.message)
        }
    }
})

newsRouter.post('/:id', async (req, res) => {
    const data = fs.readFileSync('comments.json', { encoding: 'utf8' });
    const js = JSON.parse(data);
    const id = req.params.id;
    if (js[id] == undefined) {
    js[id] = []}
    js[id].push({"author": req.body.author, "body": req.body.body})
    const jsonString = JSON.stringify(js)
    fs.writeFileSync('comments.json', jsonString, () => {})
    const newsAPI = await axios.get(`http://205.185.125.73:5000/${id}`)
    const newsAP = await axios.get(`http://205.185.125.73:5000/comments/${id}`)
    try {
        res.render('newsSingle', { article: newsAPI.data, comments: newsAP.data })
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            console.log(err.requiest)
        } else {
            console.error('Error', err.message)
        }
    }
})

newsRouter.get('/about', async (req, res) => {
    try {
        const newsAPI = await axios.get(`http://205.185.125.73:5000/3560`)
        res.render('about', { article: newsAPI.data})
    } catch (err) {
        if (err.response) {
            res.render('about', { article: null})
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('about', { article: null})
            console.log(err.requiest)
        } else {
            res.render('about', { article: null})
            console.error('Error', err.message)
        }
    }
})
module.exports = newsRouter 
