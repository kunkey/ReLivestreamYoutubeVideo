# ReLivestreamYoutubeVideo
ReLivestream Youtube Video With Url
# System 
Centos OS + FFMPEG + PM2
* FFMPEG
 => https://linuxcanban.com/huong-dan-cai-dat-va-su-dung-ffmpeg-tren-centos-7-va-centos-8/
# Install Package
=> move terminal to project folder<br>
=> npm install
# Install PM2
=> npm i -g pm2 
# Open Port 80
=> iptables -I INPUT -p tcp --dport 3030 -j ACCEPT<br>
=> service iptables save
# Run 
=> pm2 start app.js
