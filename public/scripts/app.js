$(document).ready(function () {
  loadTweets();
  // prevent script injection
    const max_length = 140;
    function escape(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  function likeTweet(event) {
    const targetTweet = event.target;
    const tweetID = $(targetTweet).data('id');
    let data = {id: tweetID};

    if($(targetTweet).hasClass('likes')) {
      $(targetTweet).removeClass('likes');
      data.likeStatus = 'remove';
    } else {
      $(targetTweet).addClass('likes');
      data.likeStatus='add';
    }
// Make the post request to update the like count
  $.ajax('/tweets/updateLikes', {method: 'POST', data: data})
  .then(function(likeCount) {
    $(`#${tweetID}-likes`).text(likeCount);
  });

  }
function createTweetElement(tweet) {
  const avatar = tweet.user.avatars.small;
  const user = tweet.user.name;
  const handle=tweet.user.handle;
  const content=escape(tweet.content.text); // Escaping text
  const created_at=tweet.created_at;
  const likes = tweet.likes;

let html=`
  <article class="tweet">
   <header>
   <div class="img">
     <img class="avatar" src=${avatar}>
   </div>
   <h2>${user}</h2>
   <span id="aside">${handle}</span>
   </header>
   <div class="content">
   <strong>${content}</strong>
   </div>
   <footer>
    <div class="created_at">
      ${created_at}
    </div>
      <div class='social'>
         <span><i class='fa fa-flag' aria-hidden='true'></i></span>
         <span><i class='fa fa-retweet' aria-hidden='true'></i></span>
         <span><i data-id="${tweet._id}" class='fa fa-heart icons' aria-hidden='true'></i><span id="${tweet._id}-likes">${tweet.likes}</span></span>
      </div>
   </footer>
  </article>
`;
  return html;
};
function renderTweets(tweets) {
  $("#tweets").empty();
  tweets.forEach((tweet) => {
  var a=createTweetElement(tweet);
  $("#tweets").prepend(a);
  });
  $('.fa-heart').click(function(event) {
    // $(this.animate({fontSize: '15px'},100).animate({fontSize: '14px'},100));
    likeTweet(event);
  });
}

function loadTweets() {
  $.ajax({
    url: `/tweets`,
    method: 'GET',
    dataType: "json",
    success: function (data) {
      console.log('Success: ', data);
      renderTweets(data);
    }
  });
}
// Checks for input validity and returns correponding error message
function inputValid(length) {
    if (!length) {
      return "Tweet cannot be empty";
    }
    if (length >= 140) {
      return "Tweet cannot exceed max limit";
    }
}
 $('form#tweets-things').on('submit', function(e) {
    e.preventDefault();
    $textarea = $(this).children("textarea")[0]; //find length jquery
    var length = $textarea.textLength;
    let formData = $('form#tweets-things').serialize();
    if(!inputValid(length)){
    $.ajax('/tweets',{
      method:'POST',
      data:formData
    }).then(function(){
            $('form#tweets-things textarea').val('');
            loadTweets();
    })
     } else {

              $(".errorMessage").text(inputValid(length));  // return $.ajax('/tweets');
            }
  });
  // Removes the error message when the user tries to type again in the textarea
  $(".new-tweet textarea").focus(() => {
    $(".errorMessage").text("");
  });
});






