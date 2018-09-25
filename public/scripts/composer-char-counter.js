$(document).ready(function () {
  //counter
  $('textarea').on('keyup keypress', function () {
    let textLength = $(this).val().length;
    $(this).parent('form').children('.counter').text(140 - textLength);

    if (textLength > 140)
      $(this).parent('form').children('.counter').css('color', 'red');
    else
      $(this).parent('form').children('.counter').css('color', 'black');
  });


});