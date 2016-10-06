(function ($) {

Drupal.Nodejs.callbacks.swapIt = {
  //grab the message and inject into the header
  callback: function (message) {
    if(message.channel == 'swapit_demo') {
      $('form #nodejs-selector').html(message.data.body);
    }
  }
};
Drupal.Nodejs.callbacks.myowncallback = {
  callback: function (message) {
  	//console.log(message);
  	if (message.callback == 'myowncallback') {
  	    // Do whatever I want on the client's browser from here
            alert(message.data.somecustomdata);
  	}
  }
};
})(jQuery);

