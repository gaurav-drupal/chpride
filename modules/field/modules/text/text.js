(function(a){Drupal.behaviors.textSummary={attach:function(b,c){a(".text-summary",b).once("text-summary",function(){var e=a(this).closest("div.field-type-text-with-summary");var d=e.find("div.text-summary-wrapper");d.once("text-summary-wrapper").each(function(j){var g=a(this);var k=g.find("label");var f=e.find(".text-full").eq(j).closest(".form-item");var i=f.find("label");if(i.length==0){i=a("<label></label>").prependTo(f)}var h=a('<span class="field-edit-link">(<a class="link-edit-summary" href="#">'+Drupal.t("Hide summary")+"</a>)</span>").toggle(function(){g.hide();a(this).find("a").html(Drupal.t("Edit summary")).end().appendTo(i);return false},function(){g.show();a(this).find("a").html(Drupal.t("Hide summary")).end().appendTo(k);return false}).appendTo(k);if(a(this).find(".text-summary").val()==""){h.click()}return})})}}})(jQuery);