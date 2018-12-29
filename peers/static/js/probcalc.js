$(document).ready( function() {
    // probability calculation part
    $( "#age-pick" ).slider({
        value:30,
        min: 18,
        max: 70,
        slide: function( event, ui ) {
          $( "#age2" ).val( ui.value );
        }
      });
    $('#age2').val($('#age-pick').slider("value"));
    $('#gender2').multiselect();
    $('#diagnosis2').multiselect();
    $('#depression2').multiselect();
    $('#opioid2').multiselect();
    $('#probsubmit').click(function(event){
        event.preventDefault();
        const age = $('#age-pick').slider("value");
        // console.log(age);
        const gender = $('#gender2').val();
        // console.log(gender);
        const diagnosis = $('#diagnosis2').val();
        // console.log(diagnosis);
        const depression = $('#depression2').val();
        // console.log(depression);
        const opioid = $('#opioid2').val();
        // console.log(opioid);
        const duration = $('#duration').val();
        // console.log(duration);
        $.ajax({
          type:"POST",
          url:'/api/prob/',
          contentType: 'application/json', 
          data:JSON.stringify({age:age, gender: gender, 
            diagcode: diagnosis, depression: depression, opioid: opioid, duration: duration})
        })
         .done(function(rawdata){
            let output="<p><strong>"+rawdata+"</strong><p>"
            $('#outputprob').html(output);
         })
         .fail(function(){
            alert('Probability Calculation Failed!');
         });
      });
});
