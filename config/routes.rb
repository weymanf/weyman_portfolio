WeymanPort::Application.routes.draw do
  resources :static
  get "/home", to: "static#home"
  get "/asteroids", to: "static#asteroids"
  root to: "static#home"

  
end
