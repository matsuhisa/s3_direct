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
    for(index=0; index < e.target.files.length; index++){
      var file = e.target.files[index];
      // 事前にファイルの大きさや種類をチェックする

      var s3_post = function(file){
        return $.ajax({
          url: '/s3',
          type: 'POST',
          dataType: 'json',
          data: {
            size: file.size,  // ファイルの大きさ
            content_type: file.type  // ファイルの形式
          }
        }).done(function(data){

          var name, fd = new FormData();
          for (name in data.form) if (data.form.hasOwnProperty(name)) {
            fd.append(name, data.form[name]);
          }
          fd.append('file', file); // ファイル添付

          // 送信
          var xhr = new XMLHttpRequest();
          xhr.open('POST', data.form.url, true);
          xhr.onload = function(event) {
            if (xhr.status === 204) {
              $('.images').append($("<img>").width(200).attr({"src": data.upload_url}));
            } else {
              console.error(xhr.statusText);
              console.error(data.form.url);
            }
          }
          xhr.send(fd);
        })
      };

      s3_post(file);
    };
  });
});
