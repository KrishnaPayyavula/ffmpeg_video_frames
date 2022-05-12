var AWS = require('aws-sdk');
const { error } = require('console');
const fs = require('fs');
var ffmpeg = require('ffmpeg');
var s3 = new AWS.S3();

const s3download = (bucketName = "", keyName = "", localDest = "") => {

    if (typeof localDest == 'undefined') {
        localDest = keyName;
    }

    let params = {
        Bucket: bucketName, // your bucket name,
        Key: keyName // path to the object you're looking for
    };

    let file = fs.createWriteStream(localDest);

    return new Promise((resolve, reject) => {
        s3.getObject(params).createReadStream()
            .on('end', () => {
                return resolve("File downloaded");
            })
            .on('error', (error) => {
                return reject(error);
            }).pipe(file);
    });
};

const bucket_name = "videos-kansas-demo",
    key_name = "videos/file_example_MP4.mp4",
    localDest = `sample_test_video.mp4`;

s3download(bucket_name, key_name, localDest).then(async (error, response) => {
    if (error) throw error;
    console.log(response);

    var process = new ffmpeg('./sample_test_video.mp4');
    await process.then(function (video) {
        video.addCommand('-ss', '00:00:06')
        video.addCommand('-vframes', '1')
        video.save(`./test_${new Date().getTime()}.jpg`, function (error, file) {
            if (!error)
                console.log('Video file: ' + file);
        });
    }, function (err) {
        console.log('Error: ' + err);
    });

}).catch(error => {
    console.log(error)
})

processVideoFile(localDest)





/**
 * 
 * @param {string} video_file_name video file name to process it into frames
 */
function processVideoFile(video_file_name) {
    try {
        console.log("fdsf", video_file_name);
        var process = new ffmpeg(`./${video_file_name}`);
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
}
