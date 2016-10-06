(function(a){Drupal.behaviors.autocomplete={attach:function(b,c){var d=[];a("input.autocomplete",b).once("autocomplete",function(){var e=this.value;if(!d[e]){d[e]=new Drupal.ACDB(e)}var f=a("#"+this.id.substr(0,this.id.length-13)).attr("autocomplete","OFF").attr("aria-autocomplete","list");a(f[0].form).submit(Drupal.autocompleteSubmit);f.parent().attr("role","application").append(a('<span class="element-invisible" aria-live="assertive"></span>').attr("id",f.attr("id")+"-autocomplete-aria-live"));new Drupal.jsAC(f,d[e])})}};Drupal.autocompleteSubmit=function(){return a("#autocomplete").each(function(){this.owner.hidePopup()}).length==0};Drupal.jsAC=function(d,b){var c=this;this.input=d[0];this.ariaLive=a("#"+this.input.id+"-autocomplete-aria-live");this.db=b;d.keydown(function(e){return c.onkeydown(this,e)}).keyup(function(e){c.onkeyup(this,e)}).blur(function(){c.hidePopup();c.db.cancel()})};Drupal.jsAC.prototype.onkeydown=function(b,c){if(!c){c=window.event}switch(c.keyCode){case 40:this.selectDown();return false;case 38:this.selectUp();return false;default:return true}};Drupal.jsAC.prototype.onkeyup=function(b,c){if(!c){c=window.event}switch(c.keyCode){case 16:case 17:case 18:case 20:case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:return true;case 9:case 13:case 27:this.hidePopup(c.keyCode);return true;default:if(b.value.length>0&&!b.readOnly){this.populatePopup()}else{this.hidePopup(c.keyCode)}return true}};Drupal.jsAC.prototype.select=function(b){this.input.value=a(b).data("autocompleteValue")};Drupal.jsAC.prototype.selectDown=function(){if(this.selected&&this.selected.nextSibling){this.highlight(this.selected.nextSibling)}else{if(this.popup){var b=a("li",this.popup);if(b.length>0){this.highlight(b.get(0))}}}};Drupal.jsAC.prototype.selectUp=function(){if(this.selected&&this.selected.previousSibling){this.highlight(this.selected.previousSibling)}};Drupal.jsAC.prototype.highlight=function(b){if(this.selected){a(this.selected).removeClass("selected")}a(b).addClass("selected");this.selected=b;a(this.ariaLive).html(a(this.selected).html())};Drupal.jsAC.prototype.unhighlight=function(b){a(b).removeClass("selected");this.selected=false;a(this.ariaLive).empty()};Drupal.jsAC.prototype.hidePopup=function(b){if(this.selected&&((b&&b!=46&&b!=8&&b!=27)||!b)){this.input.value=a(this.selected).data("autocompleteValue")}var c=this.popup;if(c){this.popup=null;a(c).fadeOut("fast",function(){a(c).remove()})}this.selected=false;a(this.ariaLive).empty()};Drupal.jsAC.prototype.populatePopup=function(){var c=a(this.input);var b=c.position();if(this.popup){a(this.popup).remove()}this.selected=false;this.popup=a('<div id="autocomplete"></div>')[0];this.popup.owner=this;a(this.popup).css({top:parseInt(b.top+this.input.offsetHeight,10)+"px",left:parseInt(b.left,10)+"px",width:c.innerWidth()+"px",display:"none"});c.before(this.popup);this.db.owner=this;this.db.search(this.input.value)};Drupal.jsAC.prototype.found=function(d){if(!this.input.value.length){return false}var b=a("<ul></ul>");var c=this;for(key in d){a("<li></li>").html(a("<div></div>").html(d[key])).mousedown(function(){c.select(this)}).mouseover(function(){c.highlight(this)}).mouseout(function(){c.unhighlight(this)}).data("autocompleteValue",key).appendTo(b)}if(this.popup){if(b.children().length){a(this.popup).empty().append(b).show();a(this.ariaLive).html(Drupal.t("Autocomplete popup"))}else{a(this.popup).css({visibility:"hidden"});this.hidePopup()}}};Drupal.jsAC.prototype.setStatus=function(b){switch(b){case"begin":a(this.input).addClass("throbbing");a(this.ariaLive).html(Drupal.t("Searching for matches..."));break;case"cancel":case"error":case"found":a(this.input).removeClass("throbbing");break}};Drupal.ACDB=function(b){this.uri=b;this.delay=300;this.cache={}};Drupal.ACDB.prototype.search=function(c){var b=this;this.searchString=c;c=c.replace(/^\s+|\s+$/,"");if(c.length<=0||c.charAt(c.length-1)==","){return}if(this.cache[c]){return this.owner.found(this.cache[c])}if(this.timer){clearTimeout(this.timer)}this.timer=setTimeout(function(){b.owner.setStatus("begin");a.ajax({type:"GET",url:b.uri+"/"+Drupal.encodePath(c),dataType:"json",success:function(d){if(typeof d.status=="undefined"||d.status!=0){b.cache[c]=d;if(b.searchString==c){b.owner.found(d)}b.owner.setStatus("found")}},error:function(d){alert(Drupal.ajaxError(d,b.uri))}})},this.delay)};Drupal.ACDB.prototype.cancel=function(){if(this.owner){this.owner.setStatus("cancel")}if(this.timer){clearTimeout(this.timer)}this.searchString=""}})(jQuery);