Rails.application.routes.draw do
  # Backend
  resource :init
  resource :manifest
  resource :offline
  resource :service_worker
  resources :workers
  
  # Frontend
  resource :application, controller: :application, path: ''
end
