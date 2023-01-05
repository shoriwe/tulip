var gitSemverTags = require('git-semver-tags');

// gitSemverTags([options,] callback)

gitSemverTags(function (err, tags) {
    console.log(tags[0]);
});