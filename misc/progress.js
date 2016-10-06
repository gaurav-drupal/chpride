(function(a){Drupal.progressBar=function(f,d,e,b){var c=this;this.id=f;this.method=e||"GET";this.updateCallback=d;this.errorCallback=b;this.element=a('<div class="progress" aria-live="polite"></div>').attr("id",f);this.element.html('<div class="bar"><div class="filled"></div></div><div class="percentage"></div><div class="message">&nbsp;</div>')};Drupal.progressBar.prototype.setProgress=function(b,c){if(b>=0&&b<=100){a("div.filled",this.element).css("width",b+"%");a("div.percentage",this.element).html(b+"%")}a("div.message",this.element).html(c);if(this.updateCallback){this.updateCallback(b,c,this)}};Drupal.progressBar.prototype.startMonitoring=function(c,b){this.delay=b;this.uri=c;this.sendPing()};Drupal.progressBar.prototype.stopMonitoring=function(){clearTimeout(this.timer);this.uri=null};Drupal.progressBar.prototype.sendPing=function(){if(this.timer){clearTimeout(this.timer)}if(this.uri){var b=this;a.ajax({type:this.method,url:this.uri,data:"",dataType:"json",success:function(c){if(c.status==0){b.displayError(c.data);return}b.setProgress(c.percentage,c.message);b.timer=setTimeout(function(){b.sendPing()},b.delay)},error:function(c){b.displayError(Drupal.ajaxError(c,b.uri))}})}};Drupal.progressBar.prototype.displayError=function(c){var b=a('<div class="messages error"></div>').html(c);a(this.element).before(b).hide();if(this.errorCallback){this.errorCallback(this)}}})(jQuery);