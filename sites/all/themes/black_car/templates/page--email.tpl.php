<div class="top-bar">
  <div class="row">
    <?php if ($linked_site_name || $linked_logo): ?>
      <div class="four mobile-two columns">
        <?php if ($linked_logo): ?>
          <?php print $linked_logo; ?>
        <?php endif; ?>
      </div>
    <?php endif; ?>
      <?php if ($main_menu_links): ?>
        <nav class="twelve columns mobile-two">
          <?php print $main_menu_links; ?>
        </nav>
      <?php endif; ?>
  </div>
</div>
<div class="row">
  <?php if ($messages): print $messages; endif; ?>
  <?php if (!empty($page['help'])): print render($page['help']); endif; ?>
  <div id="main" class="<?php print $main_grid; ?> columns">
    <?php if (!empty($page['highlighted'])): ?>
    <div class="highlight panel callout"> <?php print render($page['highlighted']); ?> </div>
    <?php endif; ?>
    <a id="main-content"></a>
    <?php if ($tabs): ?>
      <?php print render($tabs); ?>
    <?php if (!empty($tabs2)): 
					print render($tabs2); endif; ?>
    <?php endif; ?>
     <?php if ($title && !$is_front && ($title != 'Create Ride Clever')): ?>
    <?php print render($title_prefix); ?>
    <div class="address alert-box error" id="page-title" ><?php print $title; ?></div>
    <?php print render($title_suffix); ?>
    <?php endif; ?>
    <?php print render($page['content']); ?> </div>
  <?php if (!empty($page['sidebar_first'])): ?>
  <div id="sidebar-first" class="<?php print $sidebar_first_grid; ?> columns sidebar"> <?php print render($page['sidebar_first']); ?> </div>
  <?php endif; ?>
  <?php if (!empty($page['sidebar_second'])): ?>
  <div id="sidebar-second" class="<?php print $sidebar_sec_grid; ?> columns sidebar"> <?php print render($page['sidebar_second']); ?> </div>
  <?php endif; ?>
</div>
<?php if (!empty($page['footer_first']) || !empty($page['footer_middle']) || !empty($page['footer_last'])): ?>
<footer class="row">
  <?php if (!empty($page['footer_first'])): ?>
  <div id="footer-first" class="four columns"> <?php print render($page['footer_first']); ?> </div>
  <?php endif; ?>
  <?php if (!empty($page['footer_middle'])): ?>
  <div id="footer-middle" class="four columns"> <?php print render($page['footer_middle']); ?> </div>
  <?php endif; ?>
  <?php if (!empty($page['footer_last'])): ?>
  <div id="footer-last" class="twelve columns mobile-four"> <?php print render($page['footer_last']); ?> </div>
  <?php endif; ?>
</footer>
<?php endif; ?>
<div class="bottom-bar">
  <div class="row">
    <div class="tweleve columns"> &copy; <?php print date('Y') . ' ' . check_plain($site_name); ?>BlackCar Technologies, inc.</div>
  </div>
  <div id="myModal" class="reveal-modal [expand, xlarge, large, medium, small]">
    <?php
if(user_is_anonymous()) {  
  $form = drupal_get_form('user_login');
  print drupal_render($form);
}
?>
  </div>
  <div id="myModal2" class="reveal-modal [expand, xlarge, large, medium, small]">
    <?php
if(user_is_anonymous()) {  
  $form = drupal_get_form('user_register_form');
  print drupal_render($form);
}
?>
  </div>
</div>
  <div class="element-invisible"> 
<?php if (!empty($page['invisible'])) { ?>
    <?php print render($page['invisible']); ?> 
<?php } ?>
  </div>
