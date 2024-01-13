$(document).ready(function () {
  console.log('amenities');
  let $checkboxes = $(".amenities input[type='checkbox']");
  let checked_amenities = [];

  $checkboxes.on('change', function () {
    amenity_id = $(this).data('id');
    amenity_name = $(this).data('name');

    if ($(this).is(':checked')) {
      checked_amenities.push({
        'id': amenity_id,
        'name': amenity_name

      });
    }else {
      checked_amenities = checked_amenities.filter(function (amenity) {
        return amenity.id != amenity_id;
      });
    }
    $('.amenities h4').empty();
    for (let index = 0; index < checked_amenities.length; index++) {
      if (checked_amenities.length == 1 || index == checked_amenities.length - 1) {
        $('.amenities h4').append(checked_amenities[index].name);
      }else {
        $('.amenities h4').append('' + checked_amenities[index].name + ', ');
      }
    }
    if (checked_amenities.length >= 3) {
      $('.amenities h4').addClass('text-ellipsis');
    } else {
      $('.amenities h4').removeClass('text-ellipsis');
    }
  });
});
