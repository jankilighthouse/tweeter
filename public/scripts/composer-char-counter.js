$(document).ready(function() {

  const max_length = 140;

  $(".new-tweet textarea").on('keyup', function() {
    const length = this.value.length;
    // console.log(length);
    const $counter = $(this).parent().children(".counter");

    $counter.text(max_length - length);


  });
});