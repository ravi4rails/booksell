// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import * as bootstrap from "bootstrap"

$(function(){
  $('[data-bs-toggle="tooltip"]').tooltip();
});

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
        data: { book_ids: bookIds },
        beforeSend: () => {
          $("#loader").show();
        },
        complete: () => {
          $("#loader").hide();
        },
        success: () => {
          $("#flash-notification").html(
            `
              <div class="alert alert-success" role="success">
                Your request has been submitted successfully. Selected books has been deleted from the database.
              </div>
            `
          )
          setInterval(function(){
            $('.alert').fadeOut();
          }, 2000)
        }
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

  $('.copy-link').on('click', function(){
    const link = $(this).prev('a').attr('href');

    var temp = $("<input>");
    $('body').append(temp);
    temp.val(link).select();
    document.execCommand('copy');

    $(this).attr('title', 'Link Copied')
           .tooltip('_fixTitle')
           .tooltip('show')
           .attr('title', 'Copy link to clipboard')
           .tooltip('_fixTitle'); 
    temp.remove();
  });

});

const pluralize = (counter, string) => {
  if(counter > 1) {
    return `${counter} ${string+'s'}`
  } else {
    return `${counter} ${string}`
  }
}