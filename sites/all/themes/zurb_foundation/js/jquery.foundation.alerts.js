(function(a){a.fn.foundationAlerts=function(b){var c=a.extend({callback:a.noop},b);a(document).on("click",".alert-box a.close",function(d){d.preventDefault();a(this).closest(".alert-box").fadeOut(function(e){a(this).remove();c.callback()})})}})(jQuery);