var ffmpeg = require('ffmpeg');

try {
  var process = new ffmpeg('./SampleVideo_1280x720_2mb.mp4');
  process.then(function (video) {
    video.addCommand('-ss', '00:00:06')
    video.addCommand('-vframes', '1')
    video.save(`./test_${new Date().getTime()}.jpg`, function (error, file) {
        if (!error)
          console.log('Video file: ' + file);
      });
  }, function (err) {
    console.log('Error: ' + err);
  });
} catch (e) {
  console.log(e.code);
  console.log(e.msg);
}