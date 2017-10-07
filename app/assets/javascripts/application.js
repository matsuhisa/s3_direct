// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .



$(function() {
  var fileInput = $('input[type="file"]');
  fileInput.on('change', function (e) {
    var file = e.target.files[0];

    // 0. 事前にファイルの大きさや種類をチェックする

    // 1. サーバからpolicyとsignatureをもらう
    // 上図でいう(1)に対応
    $.ajax({
      url: '/s3',
      type: 'POST',
      dataType: 'json',
      data: {
        // サーバにこれからアップロードするファイルの情報を渡す。
        size: file.size,  // ファイルの大きさ
        content_type: file.type  // ファイルの形式
      }
    }).done(function (data) {

      // 2. サーバが返した情報をそのまま使ってFormDataを作る
      var name, fd = new FormData();
      for (name in data.form) if (data.form.hasOwnProperty(name)) {
        fd.append(name, data.form[name]);
      }
      fd.append('file', file); // ファイルも忘れずに添付する

      // 送信
     // 上図でいう(3)に対応
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
