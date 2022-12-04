const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const { response } = require('express')
const { ppid } = require('process')
const thumbsupply = require('thumbsupply')
const app = express()
const router = express.Router()

router.use(cors({origin: 'http://localhost:3000'}))

app.use(cors({origin: 'http://localhost:3000'}))
//app.get('/video' , (request, response) => {
//    response.sendFile('assets/file_example_MP4_480_1_5MG.mp4', { root: __dirname} )
//})

app.get('/video/:id', (request, response)  => {
    const id = parseInt(request.params.id)
    console.log("Retrieving video " + id)
    
    const path = `assets/${id}.mp4`
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = request.headers.range
    if(range) {
        const parts = range.replace(/bytes=/,"").split("-")
        const start = parseInt(parts[0])
        const end = parts[1]? parseInt(parts[1]): fileSize-1
        const chunkSize = (end-start) + 1
        const file = fs.createReadStream(path, {start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        }
        response.writeHead(206, head)
        file.pipe(response)        
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        }
        response.write(200, head)
        fs.createReadStream(path).pipe(response)
    }
})

app.listen(4000, () => {
    console.log('Listening on port 4000')
})


app.get('/videos', (request, response) => {
        console.log("Getting videos")
        response.json(videos)
    }
)

app.get('/video/:id/data', (request, response) => {
        const id = parseInt(request.params.id)
        console.log("Retrieving data for id " + id)

        response.json(videos[id])
    }
)

app.get('/video/:id/thumbnail' , (request, response) => {
    const id = parseInt(request.params.id)
    console.log("Generating thumbnail for video " + id)
    thumbsupply.generateThumbnail(`assets/${id}.mp4`)
        .then(thumb => response.sendFile(thumb))
} )

app.get('/video/:id/caption' , (request, response) => {
    const id = parseInt(request.params.id)
    console.log("Generating caption for video " + id)
    response.sendFile(`assets/captions/sample.vtt`, {root: __dirname})
} )

const videos = [
    {
        id: 0,
        thumbnail: '/video/0/thumbnail',
        duration: '30 Seconds',
        name: 'Sample 1'
    },
    {
        id: 1,
        thumbnail: '/video/1/thumbnail',
        duration: '30 Seconds',
        name: 'Sample 2'
    },
    {
        id: 2,
        thumbnail: '/video/2/thumbnail',
        duration: '5 Seconds',
        name: 'Sample 3'
    }
]