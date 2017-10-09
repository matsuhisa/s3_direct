class TopController < ApplicationController
  BUCKET_NAME = "rails-fileup-matsuhisa"
  IMAGE_DOMAIN = "https://s3-ap-northeast-1.amazonaws.com/"
  ACL = "public-read"
  DIRECTORY_PATH = "foo2/"

  def index
  end

  def show
    @uuid = SecureRandom.uuid
    @name = params[:name]
  end

  def create
    # IAM ならどうなるの？
    credentials = Aws::SharedCredentials.new
    file_path = "#{DIRECTORY_PATH}#{SecureRandom.uuid}.jpg"

    policy_document = {
      expiration: (Time.current + 1.minute).utc,
      conditions: [
        { bucket: BUCKET_NAME },
        { key: file_path },
        { acl: ACL },
        { url: "https://#{BUCKET_NAME}.s3.amazonaws.com/" },
        { "Content-Type" => params[:content_type] },
        [ "content-length-range", params[:size], params[:size] ]
      ]
    }.to_json
    policy = Base64.encode64(policy_document).gsub("\n", '')

    signature = Base64.encode64(
      OpenSSL::HMAC.digest(
        OpenSSL::Digest::Digest.new('sha1'),
        credentials.secret_access_key,
        policy)
    ).gsub("\n", '')

    @url = "https://#{BUCKET_NAME}.s3.amazonaws.com/"
    @AWSAccessKeyId = credentials.access_key_id
    @signature = signature
    @policy = policy
    @key = file_path
    @acl = ACL
    @content_type = params[:content_type]
    @upload_url = "#{IMAGE_DOMAIN}#{BUCKET_NAME}/#{file_path}"
  end

end
