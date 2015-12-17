Rails.application.routes.draw do
  resource :session
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index]
    resources :posts
    resources :comments
  end
  resources :users, except: [:show, :index]
  resources :current, only: [:index]


  root "static_pages#root"
end
