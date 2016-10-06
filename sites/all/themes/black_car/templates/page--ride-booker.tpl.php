<style>
 @media only screen and (max-width:767px) { 
 .userIcon {display:block;}
 }
 .form-submit {color:red !important}
 </style>
<?php 
$node = arg(1);
$data = node_load($node);$msg = "";
if(!empty($data->field_ride_event)){
if($data->field_ride_event['und'][0]['tid'] == 4){
$msg = "Ride has been Cancelled by Customer";
} else if($data->field_ride_event['und'][0]['tid'] == 5){
$msg = "Ride has been Cancelled by Driver";
} else {
$msg = "";
}
}
?>
<?php
        global $user;
        $node = node_load(arg(1));
        if((in_array("Customer", $user->roles)) && (!empty($node->field_car_driver)) && ($user->name == $node->name) && (empty($node->field_pickup_time))){ 
	?>
		<a data-reveal-id='addPeople'>
    <div class="button red splitFare">Split Fare</div></a>
	<?php } ?>

<div class="top-bar hide-for-small">
  <div class="row">
    <?php if ($linked_site_name || $linked_logo): ?>
      <div class="four mobile-two columns hide-for-small">
        <?php if ($linked_logo): ?>
          <?php print $linked_logo; ?>
        <?php endif; ?>
      </div>
      <div class="four columns">
        
        <?php if ($is_front): ?>
          <h1 id="site-name"><?php print $linked_site_name; ?></h1>
        <?php else: ?>
          <div id="site-name"><?php print $linked_site_name; ?></div>
        <?php endif; ?>
      </div>
    <?php endif; ?>
  </div>
</div>
<div class="row"><a href="/user" class="userIcon"><img src="/sites/all/themes/black_car/images/home.png" alt="Home" style="position:relative;"></a>
  <?php if ($messages): print $messages; endif; ?>
  <?php if (!empty($page['help'])): print render($page['help']); endif; ?><?php if($msg != ""){echo "<div style='width:100%' class='alert button'>".$msg."</div>";} ?>
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
    <?php print render($page['content']); ?>
     </div>
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
    <div class="tweleve columns"> &copy; <?php print date('Y') . ' ' . check_plain($site_name); ?>BlackCar Technologies, inc. </div>
  </div>
</div>
<?php if (!empty($page['invisible'])) {?>
    <?php print render($page['invisible']); ?> 
<?php } ?>
<div id="addPeople" class="reveal-modal" data-reveal>
<h2 style="color: red">Please enter Username</h2>
   <?php  print render(drupal_get_form('user_search')); ?>
   <div class='AcceptedUser'></div>
   <a class="close-reveal-modal">&#215;</a>
</div>
<script>
jQuery( ".splitFare" ).click(function() {
jQuery.ajax({url:"/acceptedUser/<?php echo arg(1); ?>",success:function(result){
      jQuery(".AcceptedUser").html(result);
    }});
});
jQuery( ".notaccepted" ).click(function() {
jQuery.ajax({url:"/acceptedUser/<?php echo arg(1); ?>",success:function(result){
      jQuery(".AcceptedUser").html(result);
    }});
});
</script>
<?php 

$node = node_load(arg(1));
if(!empty($node->field_share_ride_users)){
echo $node->field_share_ride_users['und'][0]['value'].'<br>'; 
echo $node->field_accepted_users['und'][0]['value']; 
}
?>