const fs = require('fs');
const path = require("path");
const ytdl = require('ytdl-core');
const { exec } = require('child_process');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/home.html'));
})

// POST method route
app.post('/', function (req, res) {

	const data = req.body;
	const output = getRndInteger(0,9999999)+'.mp4';

	ytdl(data.url).pipe(fs.createWriteStream(output));

	setTimeout(function(){
		exec(`ffmpeg -re -stream_loop -1 -i ${output} -acodec libmp3lame  -ar 44100 -b:a 128k -pix_fmt yuv420p -profile:v baseline -s 1920x1080 -bufsize 6000k -vb 400k -maxrate 1500k -deinterlace -vcodec libx264 -preset veryfast -g 30 -r 30 -f flv "${data.server}"`, (err, stdout, stderr) => {
		  if (err) {
		    console.error(`exec error: ${err}`);
		    return;
		  }
		});
		console.log('Start Live!');
		setTimeout(function(){
			try {
			  fs.unlinkSync(output)
			  //file removed
			} catch(err) {
			  console.error(err)
			}	
		}, 5000);		
	}, 15000);


	console.log('Got body:', req.body);
    res.send('<script>alert("Đã thực hiện live! vui lòng chờ 15s để hệ thống bắt đầu!");window.location = "/";</script>');
})


app.listen(80, console.log('Server Started!'));