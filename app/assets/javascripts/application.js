function checkFileApi(){
  window.FileReader
}

$(function() {
  var fileInput = $('input[type="file"]');

  $.ajaxPrefilter(
    function(options, originalOptions, xhr){
      if ( !options.crossDomain ) {
        var token = $('meta[name="csrf-token"]').attr('content');
        xhr.setRequestHeader('X-CSRF-Token', token);
      }
    }
  );

  fileInput.on('change', function (e) {
    var file = e.target.files[0];

    // 事前にファイルの大きさや種類をチェックする

    $.ajax({
      url: '/s3',
      type: 'POST',
      dataType: 'json',
      data: {
        size: file.size,  // ファイルの大きさ
        content_type: file.type  // ファイルの形式
      }
    }).done(function (data) {

      var name, fd = new FormData();
      for (name in data.form) if (data.form.hasOwnProperty(name)) {
        fd.append(name, data.form[name]);
      }
      fd.append('file', file); // ファイル添付

      // 送信
      var xhr = new XMLHttpRequest();
      xhr.open('POST', data.form.url, true);
      xhr.onload = function(event) {
        console.log(xhr.status);
        if (xhr.status === 204) {
          $('.images').append($('<img>').attr({"src": data.upload_url}));
          console.log(data.upload_url);
        } else {
          console.error(xhr.statusText);
        }
      }
      xhr.send(fd);
    })
  });

});
