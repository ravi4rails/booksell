class BooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @books = Book.all
  end

  def bulk_delete_books
    respond_to do |format|
      @books = Book.where(id: params[:book_ids])
      @books.delete_all

      format.js
    end
  end
end
