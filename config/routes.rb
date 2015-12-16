Rails.application.routes.draw do
  resource :session
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show]
    resources :posts
  end
  resources :users, except: [:show]
  resources :current, only: [:index]


  root "static_pages#root"
end
