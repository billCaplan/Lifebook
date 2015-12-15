Rails.application.routes.draw do
  resource :session
  resources :api, defaults: {format: :json} do
    resources :users
  end


  root "static_pages#root"
end
