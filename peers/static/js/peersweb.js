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
    $('#kmsubmit').click(function(event){
      event.preventDefault();
      const agemin = $('#age-range').slider("values",0);
      const agemax = $('#age-range').slider("values",1);
      const gender = $('#gender1').val() || [];
      const diagnosis = $('#diagnosis1').val() || [];
      const depression = $('#depression1').val() || [];
      const opioid = $('#opioid1').val() || [];
      $.ajax({
        type:"POST",
        url:'/api/kmplot/',
        contentType: 'application/json', 
        data:JSON.stringify({minage: agemin, maxage: agemax,
          gender: gender, diagcode: diagnosis, depression: depression, opioid: opioid})
      })
       .done(function(rawImage){
          $('#kmplot').attr("src", "data:image/png;base64,"+rawImage);
       })
       .fail(function(){
          alert('Picture loading failed!');
       });
    });
});
