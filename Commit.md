# Commit

Plop has now been configured so it can:

* be run standalone as a function
* return virtual file system operations

Each time we run the docker-gen, we need to compare this commit with previous commit, to determine the "diff" that we should commit to our VCS, most likely Git via REST API.

We can compare directly on the incoming list of inputs nodes, using a calculate Hash for each JSON node to see which are new, modified or deleted.




