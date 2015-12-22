Rails.application.routes.draw do
  resource :session
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index, :update]
    resources :posts
    resources :comments
    resources :follows
    resources :images
    resources :image_comments
  end
  resources :users, except: [:show, :index, :update]
  resources :current, only: [:index]


  root "static_pages#root"
end
