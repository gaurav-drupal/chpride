(function(a){Drupal.hideEmailAdministratorCheckbox=function(){if(a("#edit-update-status-module-1").is(":checked")){a(".form-item-update-status-module-2").show()}else{a(".form-item-update-status-module-2").hide()}a("#edit-update-status-module-1").change(function(){a(".form-item-update-status-module-2").toggle()})};Drupal.behaviors.cleanURLsSettingsCheck={attach:function(c,d){if(!(a("#edit-clean-url").length)||a("#edit-clean-url.install").once("clean-url").length){return}var b=d.basePath+"admin/config/search/clean-urls/check";a.ajax({url:location.protocol+"//"+location.host+b,dataType:"json",success:function(){location=d.basePath+"admin/config/search/clean-urls"}})}};Drupal.cleanURLsInstallCheck=function(){var b=location.protocol+"//"+location.host+Drupal.settings.basePath+"admin/config/search/clean-urls/check";a.ajax({async:false,url:b,dataType:"json",success:function(){a("#edit-clean-url").attr("value",1)}})};Drupal.behaviors.copyFieldValue={attach:function(b,c){for(var d in c.copyFieldValue){a("#"+d,b).once("copy-field-values").bind("blur",function(){var e=c.copyFieldValue[d];for(var g in e){var f=a("#"+e[g]);if(f.val()==""){f.val(this.value)}}})}}};Drupal.behaviors.dateTime={attach:function(b,c){for(var d in c.dateTime){if(c.dateTime.hasOwnProperty(d)){(function(f,h){var e="#edit-"+h;var g=e+"-suffix";a("input"+e,b).once("date-time").keyup(function(){var i=a(this);var j=f.lookup+(/\?q=/.test(f.lookup)?"&format=":"?format=")+encodeURIComponent(i.val());a.getJSON(j,function(k){a(g).empty().append(" "+f.text+": <em>"+k+"</em>")})})})(c.dateTime[d],d)}}}};Drupal.behaviors.pageCache={attach:function(b,c){a("#edit-cache-0",b).change(function(){a("#page-compression-wrapper").hide();a("#cache-error").hide()});a("#edit-cache-1",b).change(function(){a("#page-compression-wrapper").show();a("#cache-error").hide()});a("#edit-cache-2",b).change(function(){a("#page-compression-wrapper").show();a("#cache-error").show()})}}})(jQuery);