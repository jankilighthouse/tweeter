$(function(){
  $(".compose").on('click', function(e) {
    e.preventDefault();
    $(".new-tweet").slideToggle(function(){
      $(".new-tweet textarea").focus();
    });
  });
});

