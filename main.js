require.config({
    baseUrl: "src",
    paths: {
        "i18n":                 "bower_components/patternslib/src/core/i18n",
        "jquery":               "bower_components/jquery/jquery",
        "logging":              "bower_components/logging/src/logging",
        "pat-autosuggest":      "bower_components/patternslib/src/pat/autosuggest",
        "pat-compat":           "bower_components/patternslib/src/core/compat",
        "pat-jquery-ext":       "bower_components/patternslib/src/core/jquery-ext",
        "pat-logger":           "bower_components/patternslib/src/core/logger",
        "pat-parser":           "bower_components/patternslib/src/core/parser",
        "pat-registry":         "bower_components/patternslib/src/core/registry",
        "pat-utils":            "bower_components/patternslib/src/core/utils",
        "patterns":             "bower_components/patternslib/bundle",
        "select2":              "bower_components/select2/select2",
        "twitter-fetcher":      "bower_components/twitter-fetcher/js/twitterFetcher"
    }
});
require(["pat-registry", "pat-twitter"], function(registry, twitter) {
    window.patterns = registry;
    // workaround this MSIE bug :
    // https://dev.plone.org/plone/ticket/10894
    if ($.browser.msie) {
        $("#settings").remove();
    }
    registry.init();
    return;
});
