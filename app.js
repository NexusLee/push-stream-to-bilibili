    var ffmpeg = require('fluent-ffmpeg');
    var inputPath = './media/mv.mp4';
    var outputPath = 'rtmp://live-send.acg.tv/live/xxxx';
    ffmpeg(inputPath)
    .inputOptions('-re')
    .inputOptions('-ac 2')
    .addInput('./bin/logo.png')
   /* .complexFilter([
    {
    filter: 'scale',
    options: [1080,-1],
    inputs: '[0:v]',
    outputs: 'c'
    },
    {
    filter: 'scale',
    options: [200,-1],
    inputs: '[1:v]',
    outputs: 'logo'
    },
    {
    filter: 'overlay',
    options: {
    x: 'main_w-overlay_w-5',
    y: 5
    },
    inputs: ['c','logo'],
    outputs: ['output','a']
    }
    ],'output')*/
    .on('start', function(commandLine) {
    console.log('Spawned Ffmpeg with command: ' + commandLine);
    })
    .on('error', function(err, stdout, stderr) {
    console.log('error: ' + err.message);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    })
    .on('end', function() {
    console.log('Processing finished !');
    })
    .addOptions([
   // '-vcodec libx264',
   // '-preset veryfast',
   // '-crf 22',
    '-maxrate 1000k',
    '-bufsize 3000k',
    '-acodec libmp3lame',
    '-ac 2',
    '-ar 44100',
    '-b:a 96k'
    ])
    .format('flv')
    //.pipe(outputPath, { end: true });
    .output(outputPath, {end: true}) .run(); 
