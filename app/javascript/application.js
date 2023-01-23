// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import * as bootstrap from "bootstrap"

$(document).ready(function() {
  var counter = 0;
  $('.book-select-check').on('click', function(){
    if($(this).prop('checked')) {
      counter += 1;
      $("#delete-books").text(`Delete ${pluralize(counter, 'Book')}`);
      $("#delete-books").show();
    } else {
      counter -= 1;
      $("#delete-books").text(`Delete ${pluralize(counter, 'Book')}`);
      if(counter <= 0) {
        $("#delete-books").hide();
      }
    }
  });

  $("#delete-books").on('click', function(){
    var bookIds = [];

    $('.book-select-check').each(function(){
      if($(this).prop('checked')) {
        bookIds.push($(this).data('book-id'))
      }
    });

    if(confirm('Are you sure you want to delete selected books? This action can not be undone. If you want to delete selected books click on the OK else click on Cancel.')) {
      $.ajax({
        url: 'books/bulk_delete_books',
        type: 'DELETE',
        data: { book_ids: bookIds }
      });
    } else {
      return false;
    }
  });

  $("#books-index-master").on('click', function(){
    $('.book-select-check').prop('checked', $(this).prop('checked'))

    var counter = 0;

    if($(this).prop('checked')) {
      counter += $('.book-select-check').length;
      $("#delete-books").text(`Delete ${pluralize(counter, 'Book')}`);
      $("#delete-books").show()
    } else {
      $("#delete-books").hide()
    }
  });

});

const pluralize = (counter, string) => {
  if(counter > 1) {
    return `${counter} ${string+'s'}`
  } else {
    return `${counter} ${string}`
  }
}