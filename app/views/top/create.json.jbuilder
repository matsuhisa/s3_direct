json.set! :upload_url, @upload_url
json.form do
  json.set! :url, @url
  json.set! :AWSAccessKeyId, @AWSAccessKeyId
  json.set! :signature, @signature
  json.set! :policy, @policy
  json.set! :key, @key
  json.set! :acl, "public-read"
  json.set! "Content-Type", @content_type
end
