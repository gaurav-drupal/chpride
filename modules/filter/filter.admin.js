(function(a){Drupal.behaviors.filterStatus={attach:function(b,c){a("#filters-status-wrapper input.form-checkbox",b).once("filter-status",function(){var f=a(this);var d=a("#"+f.attr("id").replace(/-status$/,"-weight"),b).closest("tr");var e=a("#"+f.attr("id").replace(/-status$/,"-settings"),b).data("verticalTab");f.bind("click.filterUpdate",function(){if(f.is(":checked")){d.show();if(e){e.tabShow().updateSummary()}}else{d.hide();if(e){e.tabHide().updateSummary()}}Drupal.tableDrag["filter-order"].restripeTable()});if(e){e.fieldset.drupalSetSummary(function(g){return f.is(":checked")?Drupal.t("Enabled"):Drupal.t("Disabled")})}f.triggerHandler("click.filterUpdate")})}}})(jQuery);