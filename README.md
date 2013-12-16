test-viewer
===========

The goal of this project is to provide a pretty viewable view of HTF haskell tests, kind of like what karma does for
javascript tests.  A node server will listen for HTF test output changes, parse them, and do a push to a local angularUI
for pretty display.

Installation
======

Check out the repo:

```
git clone https://github.com/devshorts/test-viewer
```

Pull back the dependent node modules

```
npm install
```


Configuration
=======

Replace the `hconfig.json` in the root folder with a JSON config like

```
{
    "projectSource": "/Users/devshorts/Projects/code/haskellProject"
}
```

Running
=======

Load up the app with `node app.js`.  After that, test-viewer will listen for HTF log file changes in the `dist/test/*.log`
folder and re-parse any haskell test output files after they are detected to have been changed.  Failed parsings are
ignored.

Hitting the `cabal test` button does what it says it'll do. It'll run cabal test for the configured project source, which
will trigger a re-parse of the output test files.

Screen Shots
=======

![Main page](readmeImg/app.png)