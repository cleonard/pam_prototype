$( document ).ready(function() {
  // Observer for clicking flags
  $('.flag .fa').click(function() {
    jobs_count = $('#jobs_count span');
    // Update job count
    if ($(this).hasClass('fa-flag-o')) {
      jobs_count.text(Number(jobs_count.text()) + 1);
    } else {
      jobs_count.text(Number(jobs_count.text()) - 1); 
    }
    // Toggle flat
    $(this).toggleClass('fa-flag-o');
    $(this).toggleClass('fa-flag');
  });
  
  $('li .company').click(function() {
    $(this).text($(this).parents('li').data('delta'));
  });
  
  // Call circle opacity
  setCircleOpacity();
  
  // Set up sliders
  $( ".slider" ).slider({
    value: 0,
    min: -0.5,
    max: 0.5,
    step: 0.25,
    create: function() {
      $(this).children('.ui-slider-handle').first().text($(this).slider( "value" ));
    },
    slide: function( event, ui ) {
      $(this).children('.ui-slider-handle').first().text(plusMinus(ui.value));
    },
    change: function() {
      updateList();
    }
  });
});

function plusMinus(value) {
  if (value == -0.5) {
    return "--"
  } else if (value == -0.25) {
    return "-";
  } else if (value == 0) {
    return "0";
  } else if (value == 0.25) {
    return "+";
  } else if (value == 0.5) {
    return "++";
  } else {
    return "?";
  }
}

function setCircleOpacity() {
  $('.fa-circle').each( function() {
    delta = $(this).parents('li').first().data('delta');
    $(this).fadeTo(750, (1 - Number(delta)));
  });
}

function updateList() {
  // Person = x1 and y1
  // job = x2 and y2
  x1 = $('#involvement .slider').slider( "value" );
  y1 = $('#execution .slider').slider( "value" );
  
  $('#jobs li').each(function(){
    x2 = $(this).data('x');
    y2 = $(this).data('y');
    newDelta = calculateDelta(x1, y1, x2, y2);
    $(this).data('delta', newDelta);
  });
  
  $('#jobs ul li').sort(sortLi).appendTo('#jobs ul');
  setCircleOpacity();
}

function sortLi(a, b) {
  return ($(b).data('delta')) < ($(a).data('delta')) ? 1 : -1; 
}

function calculateDelta(x1, y1, x2, y2) {
  x_diff = Number(x1) - Number(x2);
  y_diff = Number(y1) - Number(y2);
  return(Math.sqrt( (x_diff * x_diff) + (y_diff * y_diff) ));
}