$(document).ready( function() {
    $( "#age-range" ).slider({
      range: true,
      min: 18,
      max: 70,
      values: [ 18, 70 ],
      slide: function( event, ui ) {
        $( "#age1" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#age1" ).val( $( "#age-range" ).slider( "values", 0 ) +
      " - " + $( "#age-range" ).slider( "values", 1 ) );
    $('#gender1').multiselect();
    $('#diagnosis1').multiselect({
        enableClickableOptGroups: true
    });
    $('#depression1').multiselect();
    $('#opioid1').multiselect();
} );