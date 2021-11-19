
jQuery(document).ready(function () {

  function copyToClipboard(text) {
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
  }

  jQuery("#biglink").on('focus keydown', function () {
    jQuery("#biglink").css('border-color', 'transparent').css('color', '#555');
    jQuery("#erroroutput").html('').hide();
    if (jQuery("#biglink").val() == 'Shorten a link here') {
      jQuery("#biglink").val('');
    }
  });
  jQuery("#getlink").on('click', function (e) {
    e.preventDefault();
    if (jQuery.trim((jQuery("#biglink").val())) == '' || jQuery.trim((jQuery("#biglink").val())) == 'Shorten a link here') {
      jQuery("#biglink").css('border-color', '#ff0000').css('color', '#ff0000');
      jQuery("#erroroutput").show().html('Please add a link');
      jQuery("#biglink").val('Shorten a link here');
    }
    else {

      var biglink = jQuery("#biglink").val(),
        ajaxurl = 'https://api.shrtco.de/v2/shorten';

      // Send the data using post
      var posting = $.post(ajaxurl, { url: biglink });

      // Put the results in a div
      posting.done(function (data) {
        $("#successoutput").show();
        $("#successoutput").empty();
        $("#successoutput").append('<div class="row"><div class="listitem"><div class="row"><div class="col-lg-7 col-sm-12 col-md-12 full_link">' + data.result.full_short_link + '&nbsp;</div><div class="col-lg-3 col-sm-12 col-md-12"><div id="short_link" class="short_link">' + data.result.short_link + '</div></div><div class="col-lg-2 col-sm-12 col-md-12 btncol"><input id="btnshort_link" type="button" value="Copy" data-control="short_link" class="copybtn" /></div></div></div></div>');
        $("#successoutput").append('<div class="row"><div class="listitem"><div class="row"><div class="col-lg-7 col-sm-12 col-md-12 full_link">' + data.result.full_short_link2 + '&nbsp;</div><div class="col-lg-3 col-sm-12 col-md-12"><div id="short_link2" class="short_link">' + data.result.short_link2 + '</div></div><div class="col-lg-2 col-sm-12 col-md-12 btncol"><input id="btnshort_link2" type="button" value="Copy" data-control="short_link2" class="copybtn" /></div></div></div></div>');
        $("#successoutput").append('<div class="row"><div class="listitem"><div class="row"><div class="col-lg-7 col-sm-12 col-md-12 full_link">' + data.result.full_short_link3 + '&nbsp;</div><div class="col-lg-3 col-sm-12 col-md-12"><div id="short_link3" class="short_link">' + data.result.short_link3 + '</div></div><div class="col-lg-2 col-sm-12 col-md-12 btncol"><input id="btnshort_link3" type="button" value="Copy" data-control="short_link3" class="copybtn" /></div></div></div></div>');
        jQuery(".copybtn").on('click', function () {
          copyToClipboard(jQuery('#' + jQuery(this).data('control')).html());
          jQuery(this).val('Copied!');
        });
      });

    }

  });

});
