WeymanPort::Application.routes.draw do
  resources :static
  get "/home", to: "static#home"
  get "/asteroids", to: "static#asteroids"
  get "/snake", to: "static#snake"
  root to: "static#home"

  
end
