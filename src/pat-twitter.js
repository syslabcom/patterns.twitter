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
    parser.add_argument("show-images", false);

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
            twitterFetcher.fetch(options);
        }
    };
    registry.register(twitter);
}));
