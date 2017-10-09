json.set! :uuid, @uuid
json.set! :name, @name
json.form do
  json.set! :foo, 'foo1'
  json.set! :bar, 'bar2'
  json.set! :qiita, 'http://qiita.com/api/v2/users/tutu'
end
