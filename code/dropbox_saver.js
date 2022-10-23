const APP_KEY = "zNhNxWq_OzAAAAAAAAAAGwOkmkvLRlnn5wcotBJRYOHAPAVRdUZ6qGFJscH2sHxH";

function stringToBlob(str) {
    return new Blob([str], { type: "text/plain;charset=utf-8" });
}

function uploadFileToDropbox(blob, filename) {
    $.ajax({
        url: 'https://content.dropboxapi.com/2/files/upload',
        type: 'post',
        data: blob,
        processData: false,
        async: false,
        contentType: 'application/octet-stream',
        headers: {
            "Authorization": "Bearer " + APP_KEY,
            "Dropbox-API-Arg": JSON.stringify({path: '/' + filename, mode: 'add', autorename: true, mute: false})
        },
        success: function (result) {},
        error: function (err) { console.error(err); }
    })
}
