Rails.application.routes.draw do
  root 'top#index'
  post '/s3', to: 'top#create'
end
