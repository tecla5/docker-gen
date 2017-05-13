# Github API

Is too complicated to be used raw. We will use an API wrapper such as:

- [octocat: promises](https://www.npmjs.com/package/octocat)
- [octonode](https://github.com/pksunkara/octonode)
- [nodegit](http://radek.io/2015/10/27/nodegit/)
- [github-api: promises](https://github.com/github-tools/github/)

Blog posts

- [commit a file with github API](http://www.levibotelho.com/development/commit-a-file-with-the-github-api)
- [pushing list of files to github](https://medium.freecodecamp.com/pushing-a-list-of-files-to-the-github-with-javascript-b724c8c09b66)

See [issue](https://github.com/SamyPesse/octocat.js/issues/19)

## Conclusion

For now using [this solution](https://medium.freecodecamp.com/pushing-a-list-of-files-to-the-github-with-javascript-b724c8c09b66) included as `git/github/github-pusher.js`.

TODO: extract as a library!

```js
let GithubPusher = require('./github-pusher')
let api = new GithubPusher({token: 'API_TOKEN'});
api.setRepo('GITHUB_USER', 'REPOSITORY');
api.setBranch('AWESOME_BRANCH')
    .then( () => api.pushFiles(
        'Making a commit with my adorable files',
        [
            {content: 'You are a Wizard, Harry', path: 'harry.txt'},
            {content: 'May the Force be with you', path: 'jedi.txt'}
        ])
    )
    .then(function() {
        console.log('Files committed!');
    });
```

## github-api

Uses Promises

```js
(https://github.com/github-tools/github/blob/master/test/repository.spec.js#L350)

  it('should compare two branches', function(done) {
      remoteRepo.createBranch('master', 'compare', assertSuccessful(done, function() {
        remoteRepo.writeFile('compare', fileName, updatedText, updatedMessage, assertSuccessful(done, function() {
            remoteRepo.compareBranches('master', 'compare', assertSuccessful(done, function(err, diff) {
              expect(diff).to.have.own('total_commits', 1);
              expect(diff.files[0]).to.have.own('filename', fileName);

              done();
            }));
        }));
      }));
  });
```

## Octonode

Could likely easily be promisified

[Promise support](https://github.com/pksunkara/octonode/issues/139)

"the fact that you use request to make all the calls, adding support for promises/async/await becomes pretty simple if you switch to https://github.com/request/request-promise."

[request-promise](https://github.com/request/request-promise)

### Big commit

```js
repo.create_commit('message', 'tree', [parents], callback);
```

### Create content

```js
ghrepo.createContents('lib/index.js', 'commit message', 'content', callback); //path

ghrepo.updateContents('lib/index.js', 'commit message', 'content', 'put-sha-here', callback);

ghrepo.deleteContents('lib/index.js', 'commit message', 'put-sha-here', callback);
```