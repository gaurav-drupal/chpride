<?php
/**
 * @file
 * rc_my_driver_coming_view.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function rc_my_driver_coming_view_views_default_views() {
  $export = array();

  $view = new view();
$view->name = 'driver_coming';
$view->description = 'Map the customer sees while the car is coming';
$view->tag = 'default, customer';
$view->base_table = 'users';
$view->human_name = 'Driver coming';
$view->core = 7;
$view->api_version = '3.0';
$view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

/* Display: Master */
$handler = $view->new_display('default', 'Master', 'default');
$handler->display->display_options['title'] = 'Driver coming';
$handler->display->display_options['use_more_always'] = FALSE;
$handler->display->display_options['access']['type'] = 'perm';
$handler->display->display_options['access']['perm'] = 'access user profiles';
$handler->display->display_options['cache']['type'] = 'none';
$handler->display->display_options['query']['type'] = 'views_query';
$handler->display->display_options['exposed_form']['type'] = 'basic';
$handler->display->display_options['pager']['type'] = 'full';
$handler->display->display_options['pager']['options']['items_per_page'] = '10';
$handler->display->display_options['style_plugin'] = 'default';
$handler->display->display_options['row_plugin'] = 'fields';
/* Relationship: Entity Reference: Referencing entity */
$handler->display->display_options['relationships']['reverse_field_car_driver_node']['id'] = 'reverse_field_car_driver_node';
$handler->display->display_options['relationships']['reverse_field_car_driver_node']['table'] = 'users';
$handler->display->display_options['relationships']['reverse_field_car_driver_node']['field'] = 'reverse_field_car_driver_node';
$handler->display->display_options['relationships']['reverse_field_car_driver_node']['required'] = TRUE;
/* Relationship: User: Profile */
$handler->display->display_options['relationships']['profile']['id'] = 'profile';
$handler->display->display_options['relationships']['profile']['table'] = 'users';
$handler->display->display_options['relationships']['profile']['field'] = 'profile';
$handler->display->display_options['relationships']['profile']['bundle_types'] = array(
  'driver' => 'driver',
);
/* Field: User: Name */
$handler->display->display_options['fields']['name']['id'] = 'name';
$handler->display->display_options['fields']['name']['table'] = 'users';
$handler->display->display_options['fields']['name']['field'] = 'name';
$handler->display->display_options['fields']['name']['label'] = '';
$handler->display->display_options['fields']['name']['alter']['word_boundary'] = FALSE;
$handler->display->display_options['fields']['name']['alter']['ellipsis'] = FALSE;
/* Field: Profile: Car Location */
$handler->display->display_options['fields']['field_car_location']['id'] = 'field_car_location';
$handler->display->display_options['fields']['field_car_location']['table'] = 'field_data_field_car_location';
$handler->display->display_options['fields']['field_car_location']['field'] = 'field_car_location';
$handler->display->display_options['fields']['field_car_location']['relationship'] = 'profile';
$handler->display->display_options['fields']['field_car_location']['click_sort_column'] = 'wkt';
$handler->display->display_options['fields']['field_car_location']['type'] = 'geofield_openlayers';
$handler->display->display_options['fields']['field_car_location']['settings'] = array(
  'map_preset' => 'geofield_formatter_map',
  'data' => 'full',
);
/* Sort criterion: User: Created date */
$handler->display->display_options['sorts']['created']['id'] = 'created';
$handler->display->display_options['sorts']['created']['table'] = 'users';
$handler->display->display_options['sorts']['created']['field'] = 'created';
$handler->display->display_options['sorts']['created']['order'] = 'DESC';
/* Contextual filter: Content: Nid */
$handler->display->display_options['arguments']['nid']['id'] = 'nid';
$handler->display->display_options['arguments']['nid']['table'] = 'node';
$handler->display->display_options['arguments']['nid']['field'] = 'nid';
$handler->display->display_options['arguments']['nid']['relationship'] = 'reverse_field_car_driver_node';
$handler->display->display_options['arguments']['nid']['default_action'] = 'default';
$handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
$handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
$handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
$handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
/* Filter criterion: User: Active */
$handler->display->display_options['filters']['status']['id'] = 'status';
$handler->display->display_options['filters']['status']['table'] = 'users';
$handler->display->display_options['filters']['status']['field'] = 'status';
$handler->display->display_options['filters']['status']['value'] = '1';
$handler->display->display_options['filters']['status']['group'] = 1;
$handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
/* Filter criterion: User: Roles */
$handler->display->display_options['filters']['rid']['id'] = 'rid';
$handler->display->display_options['filters']['rid']['table'] = 'users_roles';
$handler->display->display_options['filters']['rid']['field'] = 'rid';
$handler->display->display_options['filters']['rid']['value'] = array(
  4 => '4',
);

/* Display: Page */
$handler = $view->new_display('page', 'Page', 'page');
$handler->display->display_options['path'] = 'driver-coming';

/* Display: OpenLayers Data Overlay */
$handler = $view->new_display('openlayers', 'OpenLayers Data Overlay', 'openlayers_1');
$handler->display->display_options['defaults']['row_plugin'] = FALSE;
$handler->display->display_options['row_plugin'] = 'fields';

/* Display: Block */
$handler = $view->new_display('block', 'Block', 'block_1');

/* Display: New dp */
$handler = $view->new_display('block', 'New dp', 'block_2');
$handler->display->display_options['defaults']['style_plugin'] = FALSE;
$handler->display->display_options['style_plugin'] = 'leaflet';
$handler->display->display_options['style_options']['data_source'] = 'field_car_location';
$handler->display->display_options['style_options']['name_field'] = 'name';
$handler->display->display_options['style_options']['description_field'] = 'name';
$handler->display->display_options['style_options']['map'] = 'google-high-res';
$handler->display->display_options['style_options']['icon'] = array(
  'iconUrl' => '',
  'shadowUrl' => '',
  'iconSize' => array(
    'x' => '',
    'y' => '',
  ),
  'iconAnchor' => array(
    'x' => '',
    'y' => '',
  ),
  'shadowAnchor' => array(
    'x' => '',
    'y' => '',
  ),
  'popupAnchor' => array(
    'x' => '',
    'y' => '',
  ),
);
$handler->display->display_options['defaults']['style_options'] = FALSE;
$handler->display->display_options['defaults']['row_plugin'] = FALSE;
$handler->display->display_options['defaults']['row_options'] = FALSE;
$handler->display->display_options['defaults']['fields'] = FALSE;
/* Field: User: Name */
$handler->display->display_options['fields']['name']['id'] = 'name';
$handler->display->display_options['fields']['name']['table'] = 'users';
$handler->display->display_options['fields']['name']['field'] = 'name';
$handler->display->display_options['fields']['name']['label'] = '';
$handler->display->display_options['fields']['name']['alter']['word_boundary'] = FALSE;
$handler->display->display_options['fields']['name']['alter']['ellipsis'] = FALSE;
/* Field: Profile: Car Location */
$handler->display->display_options['fields']['field_car_location']['id'] = 'field_car_location';
$handler->display->display_options['fields']['field_car_location']['table'] = 'field_data_field_car_location';
$handler->display->display_options['fields']['field_car_location']['field'] = 'field_car_location';
$handler->display->display_options['fields']['field_car_location']['relationship'] = 'profile';
$handler->display->display_options['fields']['field_car_location']['click_sort_column'] = 'wkt';
$handler->display->display_options['fields']['field_car_location']['type'] = 'geofield_openlayers';
$handler->display->display_options['fields']['field_car_location']['settings'] = array(
  'map_preset' => 'geofield_formatter_map',
  'data' => 'full',
);
/* Field: Content: datageo */
$handler->display->display_options['fields']['field_datageo']['id'] = 'field_datageo';
$handler->display->display_options['fields']['field_datageo']['table'] = 'field_data_field_datageo';
$handler->display->display_options['fields']['field_datageo']['field'] = 'field_datageo';
$handler->display->display_options['fields']['field_datageo']['relationship'] = 'reverse_field_car_driver_node';
$handler->display->display_options['fields']['field_datageo']['click_sort_column'] = 'wkt';
$handler->display->display_options['fields']['field_datageo']['type'] = 'geofield_leaflet';
$handler->display->display_options['fields']['field_datageo']['settings'] = array(
  'leaflet_map' => 'google-high-res',
  'height' => '400',
  'popup' => 0,
  'icon' => array(
    'iconUrl' => '',
    'shadowUrl' => '',
    'iconSize' => array(
      'x' => '',
      'y' => '',
    ),
    'iconAnchor' => array(
      'x' => '',
      'y' => '',
    ),
    'shadowAnchor' => array(
      'x' => '',
      'y' => '',
    ),
    'popupAnchor' => array(
      'x' => '',
      'y' => '',
    ),
  ),
);
$translatables['driver_coming'] = array(
  t('Master'),
  t('Driver coming'),
  t('more'),
  t('Apply'),
  t('Reset'),
  t('Sort by'),
  t('Asc'),
  t('Desc'),
  t('Items per page'),
  t('- All -'),
  t('Offset'),
  t('« first'),
  t('‹ previous'),
  t('next ›'),
  t('last »'),
  t('Content referencing User from field_car_driver'),
  t('Profile'),
  t('Car Location'),
  t('All'),
  t('Page'),
  t('OpenLayers Data Overlay'),
  t('Block'),
  t('New dp'),
  t('datageo'),
);

  $export['rider_driver_on_map'] = $view;

  return $export;
}
