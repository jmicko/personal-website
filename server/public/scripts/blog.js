$( window ).on( "load", function() {
    console.log('js, jq');
    // Anything that should come in on page load goes here
    onLoad();
  })

  function onLoad(params) {
      console.log('ready');
  }