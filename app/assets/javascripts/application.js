$(function() {

  var names = ["りんご", "バナナ", "ぶどう"];
  for(var index=0; index < names.length; index++) {
    console.log("------>");
    var name = names[index];
    console.log(name);

    var promise = function(name){
      return $.ajax({
        url: '/show.json',
        type: 'get',
        data: { name: name }
      }).done(function(data){
        console.log("promise.done -->");
        console.log(name);
        console.log(data.name);
        console.table(data);
        console.log("-->");
      })
    };
    promise(name);
    // var promise = $.ajax({
    //   url: '/show.json',
    //   type: 'get',
    //   data: { name: name }
    // });

    // promise.done(function(data, textStatus, jqXHR){
    //   console.log(name);
    //   console.log(data.name);
    // });
    console.log("------>");
  }



  // var names = ["りんご", "バナナ", "ぶどう"];
  // for(var index=0; index < names.length; index++) {
  //   console.log("------>");
  //   var name = names[index];
  //   console.log(name);
  //
  //   var promise = $.ajax({
  //     url: '/show.json',
  //     type: 'get',
  //     data: { name: name }
  //   });
  //
  //
  //   promise.done(function(data, textStatus, jqXHR){
  //     console.log(name);
  //     console.log(data.name);
  //   });
  //   console.log("------>");
  // }

  console.log("start ------>");
    // var promise = $.ajax({
    //   url: '/show.json',
    //   type: 'get'
    // });
    //
    // promise.done(function(data, textStatus, jqXHR){
    //   console.log(textStatus);
    //   console.log(data);
    // });

    // $.ajax({
    //   url: '/show.json',
    //   type: 'get'
    // }).done(function (data){
    //     data = data;
    //     console.log("ajax:" + data
    //   );
    // });

    // $.get('/show.json', function(data){
    //   data = data
    //   console.log(data);
    // });

    //console.log(promise);
    //console.log(data);
  console.log("end   ------>");
});

// $(function() {
//   var fileInput = $('input[type="file"]');
//
//   $.ajaxPrefilter(
//     function(options, originalOptions, xhr){
//       if ( !options.crossDomain ) {
//         var token = $('meta[name="csrf-token"]').attr('content');
//         xhr.setRequestHeader('X-CSRF-Token', token);
//       }
//     }
//   );
//
//   fileInput.on('change', function (e) {
//
//     for(index=0; index < e.target.files.length; index++){
//       var file = e.target.files[index];
//
//       // 事前にファイルの大きさや種類をチェックする
//
//       $.ajax({
//         url: '/s3',
//         type: 'POST',
//         dataType: 'json',
//         data: {
//           size: file.size,  // ファイルの大きさ
//           content_type: file.type  // ファイルの形式
//         }
//       }).done(function (data) {
//         var name, fd = new FormData();
//         for (name in data.form) if (data.form.hasOwnProperty(name)) {
//           fd.append(name, data.form[name]);
//         }
//         fd.append('file', file); // ファイル添付
//
//         // 送信
//         var xhr = new XMLHttpRequest();
//         xhr.open('POST', data.form.url, true);
//         xhr.onload = function(event) {
//           if (xhr.status === 204) {
//             $('.images').append($('<img>').attr({"src": data.upload_url}));
//             console.log(data.upload_url);
//           } else {
//             console.error(xhr.statusText);
//             console.error(data.form.url);
//           }
//         }
//         xhr.send(fd);
//
//       })
//     };
//
//   });
//
// });
