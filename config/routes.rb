Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "books#index"

  resources :books do 
    collection do 
      delete :bulk_delete_books
    end
  end

  namespace :admin do 
    resources :books do 
      patch :update_book_name, on: :member
    end
  end
end
