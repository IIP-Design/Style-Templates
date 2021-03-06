<?php
/**
 * Registers the Style_Blocks class.
 *
 * @package Style_Blocks
 * @since 0.0.1
 */

 /**
  * Register all hooks to be run by the plugin.
  *
  * @package Style_Blocks
  */
class Style_Blocks {

  /**
   * The loader that's responsible for maintaining and registering all hooks that power the plugin.
   *
   * @since 0.0.1
   * @access protected
   * @var Style_Blocks_Loader $loader    Maintains and registers all hooks for the plugin.
   */
  protected $loader;

  /**
   * The unique identifier of this plugin.
   *
   * @since 0.0.1
   * @access protected
   * @var string $plugin_name
   */
  protected $plugin_name;

  /**
   * The version number of this plugin.
   *
   * @since 0.0.1
   * @access protected
   * @var string $version
   */
  protected $version;

  /**
   * Define the core functionality of the plugin.
   *
   * Set the plugin name and the plugin version that can be used throughout the plugin.
   * Load the dependencies and set the hooks for the admin area and
   * the public-facing side of the site.
   *
   * @since 0.0.1
   */
  public function __construct() {
    $this->plugin_name = 'styled-block-builder';
    $this->version     = '3.0.2';
    $this->load_dependencies();
    $this->define_admin_hooks();
    $this->define_public_hooks();
  }

  /**
   * Loads the classes needed to run this plugin.
   *
   * Includes the following files that make up the plugin:
   *
   * - Style_Blocks\Admin. Defines all hooks for the admin area.
   * - Style_Blocks\Frontend. Defines all hooks for the public side of the site.
   * - Style_Blocks\Loader. Orchestrates the hooks of the plugin.
   * - Style_Blocks\Metabox. Defines all hooks for the custom metabox.
   * - Style_Blocks\Migration. Defines all hooks for migrating blocks from legacy storage.
   * - Style_Blocks\Settings. Defines all hooks for the plugin's settings page.
   * - Style_Blocks\Roles. Defines all hooks for the plugin's built-in user management.
   * - Style_Blocks\Shortcode. Defines all hooks for the custom shortcode.
   * - Style_Blocks\Update_Block. Defines all hooks for used in saving block data.
   * - Style_Blocks\URE. Defines all hooks for integration the User Role Editor plugin.
   *
   * Create an instance of the loader which will be used to register the hooks with WordPress.
   *
   * @since 0.0.1
   * @access private
   */
  private function load_dependencies() {
    // The class responsible for orchestrating the actions and filters of the core plugin.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-loader.php';

    // The class responsible for defining all actions that occur in the admin area.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-admin.php';

    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/metabox/class-metabox.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/metabox/ajax/class-update-block.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/metabox/ajax/class-migrate-legacy.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/settings/class-settings.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/settings/class-roles.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/settings/class-ure.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/shortcode/class-shortcode.php';

    // The class responsible for defining all actions that occur in the public-facing side of the site.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-frontend.php';

    $this->loader = new Style_Blocks\Loader();
  }

  /** Register all of the hooks related to the admin area functionality of the plugin. */
  private function define_admin_hooks() {
    // Instantiate all admin classes.
    $plugin_admin     = new Style_Blocks\Admin( $this->get_plugin_name(), $this->get_version() );
    $plugin_ajax      = new Style_Blocks\Update_Block( $this->get_plugin_name(), $this->get_version() );
    $plugin_metabox   = new Style_Blocks\Metabox( $this->get_plugin_name(), $this->get_version() );
    $plugin_migrate   = new Style_Blocks\Migrate_Legacy( $this->get_plugin_name(), $this->get_version() );
    $plugin_settings  = new Style_Blocks\Settings( $this->get_plugin_name(), $this->get_version() );
    $plugin_shortcode = new Style_Blocks\Shortcode( $this->get_plugin_name(), $this->get_version() );
    $plugin_roles     = new Style_Blocks\Roles( $this->get_plugin_name(), $this->get_version() );
    $plugin_ure       = new Style_Blocks\URE( $this->get_plugin_name(), $this->get_version() );

    // Admin hooks.
    $this->loader->add_action( 'init', $plugin_admin, 'register_admin_scripts_styles' );
    $this->loader->add_action( 'admin_notices', $plugin_admin, 'localize_admin_script_globals' );

    // Ajax hooks.
    $this->loader->add_action( 'wp_ajax_gpalab_update_block', $plugin_ajax, 'handle_block_update' );
    $this->loader->add_action( 'wp_ajax_gpalab_delete_block', $plugin_ajax, 'handle_block_deletion' );

    // Legacy block migration hooks.
    $this->loader->add_action( 'wp_ajax_gpalab_convert_legacy', $plugin_migrate, 'handle_legacy_conversion' );
    $this->loader->add_action( 'wp_ajax_gpalab_delete_legacy', $plugin_migrate, 'handle_legacy_deletion' );

    // Custom metabox hooks.
    $this->loader->add_action( 'add_meta_boxes', $plugin_metabox, 'add_blocks_metabox' );

    // Settings page hooks.
    $this->loader->add_filter( 'plugin_action_links_styled-block-builder/styled-block-builder.php', $plugin_settings, 'add_settings_link' );
    $this->loader->add_action( 'admin_menu', $plugin_settings, 'add_blocks_settings_page' );
    $this->loader->add_action( 'admin_init', $plugin_settings, 'populate_blocks_settings' );

    // Shortcode hooks.
    $this->loader->add_action( 'init', $plugin_shortcode, 'add_blocks_shortcode' );

    // Native permissions management hooks.
    $this->loader->add_action( 'update_option_gpalab-blocks-role', $plugin_roles, 'update_role_caps', 10, 2 );

    // User Role Editor compatibility hooks.
    $this->loader->add_filter( 'ure_capabilities_groups_tree', $plugin_ure, 'add_custom_group', 10, 1 );
    $this->loader->add_filter( 'ure_custom_capability_groups', $plugin_ure, 'get_plugin_caps', 10, 2 );
  }

  /** Register all of the hooks related to the public-facing functionality. */
  private function define_public_hooks() {
    $plugin_frontend = new Style_Blocks\Frontend( $this->get_plugin_name(), $this->get_version() );

    // Frontend hooks.
    $this->loader->add_action( 'init', $plugin_frontend, 'register_blocks_scripts_styles' );
  }

  /**
   * Run the loader to execute all of the hooks with WordPress.
   *
   * @since 0.0.1
   */
  public function run() {
    $this->loader->run();
  }

  /**
   * The reference to the class that orchestrates the hooks with the plugin.
   *
   * @since  0.0.1
   * @return Style_Blocks_Loader    Orchestrates the hooks of the plugin.
   */
  public function get_loader() {
    return $this->loader;
  }

  /**
   * Retrieve the name of the plugin.
   */
  public function get_plugin_name() {
    return $this->plugin_name;
  }

  /**
   * Retrieve the version number of the plugin.
   */
  public function get_version() {
    return $this->version;
  }
}
