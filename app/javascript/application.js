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

    $.ajax({
      url: 'books/bulk_delete_books',
      type: 'DELETE',
      data: { book_ids: bookIds }
    });
  });

});

const pluralize = (counter, string) => {
  if(counter > 1) {
    return `${counter} ${string+'s'}`
  } else {
    return `${counter} ${string}`
  }
}