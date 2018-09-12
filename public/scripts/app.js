
 $(function() {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


function createTweetElement(tweet) {

  const avatar = tweet.user.avatars.small;
  const user = tweet.user.name;
  const handle=tweet.user.handle;
  const content=tweet.content.text;
  const created_at=tweet.created_at;
  // const $image = $('<img />').text(avatar).addClass('avatar');
  // const $name = $('<h2 />').text(user);
  // const $side_info=$('<span />').text(handle);
  // const $content_c=$('<strong />').text(content);
  // const $time=$('<p />').text(created_at);

let html=`
  <article class="tweet">
  <header>
  <div class="img">
    <img class="avatar" src=${avatar}>
  </div>
  <h2>${user}</h2>

  <span id="aside">${handle}</span>
  </header>

  <strong>${content}</strong>

  <footer>
    <p>
      ${created_at}
      </p>
  </footer>
   </article>
`;

  return html;
};

function renderTweets(tweets) {
  // var $html = $('<section id="tweets"></section>');
  $("#tweets").empty();
tweets.forEach((tweet) => {
  var a=createTweetElement(tweet);
  // console.log(a);
  $("#tweets").prepend(a);
});
}
 $('form#tweets-things').on('submit', function(e) {
    e.preventDefault();
    let formData = $('form#tweets-things').serialize();

    console.log(formData);
    $.ajax('/tweets',{
      method:'POST',
      data:formData
    }).then(function(){
            $('form#new-product input').val('');

            loadTweets(data);
    })
          // return $.ajax('/tweets');
});

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

});
// function formtweetvalidation(form){
//   if ($('#tweets-things[text]').length > 140) {
//     alert('your tweet should be under 140 text')
// }
