Rails.application.routes.draw do
  resource :session
  resources :api, defaults: {format: :json} do
    resources :users, only: [:show]
  end
  resources :users, except: [:show]


  root "static_pages#root"
end
