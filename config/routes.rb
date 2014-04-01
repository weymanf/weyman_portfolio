WeymanPort::Application.routes.draw do
  resources :static
  get "/home", to: "static#home"
  root to: "static#home"
end
