<?php
/**
 * Registers the Sanitize_Link_List_Meta class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 3.0.0
 */

namespace Style_Blocks;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the Link List.
 *
 * @package Style_Blocks\Sanitizer
 * @since 3.0.0
 */
class Sanitize_Link_List_Meta {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $data     Unsanitized values sent over in the AJAX request.
   * @param array $uploads  Sanitized values provided from as a result of file upload.
   * @return array          Array of sanitized values
   */
  public function sanitize_inputs( $data, $uploads ) {
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-background.php';
    $sanitize_background = new Sanitize_Background();

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-files.php';
    $sanitize_files = new Sanitize_Files();

    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-links.php';
    $sanitize_links = new Sanitize_Links();

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['files'] ) ) {
      $sanitized['files'] = $sanitize_files->sanitize_files( $unsanitary['files'], $uploads );
    }

    if ( ! empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }

    if ( ! empty( $unsanitary['links'] ) ) {
      $sanitized['links'] = $sanitize_links->sanitize_links( $unsanitary['links'] );
    }

    if ( ! empty( $unsanitary['linkColor'] ) ) {
      $sanitized['linkColor'] = sanitize_text_field( $unsanitary['linkColor'] );
    }

    if ( ! empty( $unsanitary['linkStyle'] ) ) {
      $sanitized['linkStyle'] = sanitize_text_field( $unsanitary['linkStyle'] );
    }

    if ( ! empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    if ( ! empty( $unsanitary['titleColor'] ) ) {
      $sanitized['titleColor'] = sanitize_text_field( $unsanitary['titleColor'] );
    }

    if ( ! empty( $unsanitary['facebook'] ) ) {
      $sanitized['facebook'] = sanitize_text_field( $unsanitary['facebook'] );
    }

    if ( ! empty( $unsanitary['twitter'] ) ) {
      $sanitized['twitter'] = sanitize_text_field( $unsanitary['twitter'] );
    }

    if ( ! empty( $unsanitary['instagram'] ) ) {
      $sanitized['instagram'] = sanitize_text_field( $unsanitary['instagram'] );
    }

    if ( ! empty( $unsanitary['youtube'] ) ) {
      $sanitized['youtube'] = sanitize_text_field( $unsanitary['youtube'] );
    }

    $sanitized_background = $sanitize_background->sanitize_background( $unsanitary );

    $combined = array_merge( $sanitized, $sanitized_background );

    return $combined;
  }
}
