wallaby.delayStart();

requirejs.config({
  paths: {
    'jquery': 'test/lib/jquery/jquery'
  }
});

require(wallaby.tests, function () {
  wallaby.start();
});