Rails.application.routes.draw do
  # PWA
  resource :init
  resource :manifest
  resource :offline
  resource :service_worker
  
  # Frontend
  root to: "application#show"
  resources :workers
end
