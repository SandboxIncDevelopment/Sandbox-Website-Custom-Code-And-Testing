// Contact page scripts. Source: Contact page footer.
// Needs jQuery (provided by Webflow).

/* @block contact-autogrow */
/*Add Auto Scrolling to Text Area*/
var textarea = jQuery('.contact-text-area-field');
textarea.on("input", function () {
    jQuery(this).css("height", ""); //reset the height
    jQuery(this).css("height", jQuery(this).prop('scrollHeight') + "px");
});
/* @endblock */

/* @block contact-toggle */
 /* Toggle Labs Colors */
 $(document).ready(function() {
  $('#lab-toggle-button').click(function() {
    $('.info-content-container').addClass('info-content-container--labs');
    $('#agency-toggle-button').removeClass('contact-toggle-button-default---agency-selected');
    $('#lab-toggle-button').addClass('contact-toggle-button-default--labs-selected');
    
  });
  
    $('#agency-toggle-button').click(function() {
    $('.info-content-container').removeClass('info-content-container--labs');
    $('#lab-toggle-button').removeClass('contact-toggle-button-default--labs-selected');
    $('#agency-toggle-button').addClass('contact-toggle-button-default---agency-selected');
  });
  
  
  
});
/* @endblock */
