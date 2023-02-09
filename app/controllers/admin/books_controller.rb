class Admin::BooksController < AdminController
  before_action :set_book, only: %i[edit show update destroy]

  def index
    @books = Book.all
  end

  def new
    @book = Book.new
  end

  def create
    @book = Book.new(book_params)
    respond_to do |format|
      if @book.save
        format.html { redirect_to admin_books_path, notice: 'Book created successfully' }
      else
        format.html { render :new }
      end
    end
  end

  def edit; end

  def show; end

  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to admin_books_path, notice: 'Book updated successfully' }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    respond_to do |format|
      @book.destroy
      format.html { redirect_to admin_books_path, notice: 'Book deleted successfully' }
    end
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:name, :price, :author, :category, :buy_link, :cover_image)
  end
end
