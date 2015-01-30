(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // Make this module AMD (Asynchronous Module Definition) compatible, so
        // that it can be used with Require.js or other module loaders.
        define([
            "jquery",
            "pat-registry",
            "pat-parser",
            "twitter-fetcher"
            ], function() {
                return factory.apply(this, arguments);
            });
    } else {
        // A module loader is not available. In this case, we need the
        // patterns library to be available as a global variable "patterns"
        factory(root.patterns, root.patterns.Parser);
    }
}(this, function($, registry, Parser) {
    var parser = new Parser("twitter");
    parser.add_argument("id");
    parser.add_argument("max-tweets", 1);
    parser.add_argument("enable-links", true);
    parser.add_argument("override-link");
    parser.add_argument("show-images", false);
    parser.add_argument("placeholder-image");
    parser.add_argument("spacer-image-url", "placeholder-16x9.png");

    var twitter = {
        name: "twitter",
        trigger: ".pat-twitter",

        init: function patTwitterInit ($el, opts) {
            var options = parser.parse($el, opts),
                new_id = "twitter" + Math.floor((Math.random() * 100000));

            if (!$el.attr("id")) {
                while ($("#" + new_id).length) {
                    new_id = "twitter" + Math.floor((Math.random() * 100000));
                }
                $el.attr("id", new_id);
            }
            options.domId = $el.attr("id");

            callback = function patTwitterCallback (tweets) {
                var x = tweets.length;
                var n = 0;
                var element = document.getElementById(options.domId);
                var html = '';
                var tweet;
                var $raw_tweet;
                while(n < x) {
                  $raw_tweet = $(tweets[n]);
                  tweet = document.createElement('article');
                  var link = document.createElement('a');
                  if (!options.enableLinks) {
                      link.href = options.overrideLink || $raw_tweet.filter('.user').find('a').attr('href');
                  }

                  if (options.showImages) {
                      var images = $raw_tweet.filter('.media').find('img');
                      var figure = document.createElement('figure');
                      var image = document.createElement('img');
                      if (options.placeholderImage || images.length) {
                          image.src = options.spacerImageUrl;;
                      }
                      if (images.length) {
                          image.setAttribute('style', 'background-image: url(' + images[0].src + ');');
                      }
                      figure.appendChild(image);
                      link.appendChild(figure);
                  }

                  var tweet_text = document.createElement('p');
                  tweet_text.setAttribute('class', "icon-twitter description");
                  tweet_text.innerHTML = $raw_tweet.filter('.tweet')[0].innerHTML;
                  link.appendChild(tweet_text);

                  tweet.appendChild(link);
                  if (x==1) {
                    html += tweet.innerHTML;
                  } else {
                    html += tweet.outerHTML;
                  }
                  n++;
                }
                element.innerHTML = html;
                $el.trigger("pat-update",
                            {pattern: "twitter",
                             layout_altered: true});
            }
            options.customCallback = callback;

            twitterFetcher.fetch(options);
        },
    };
    registry.register(twitter);
}));
