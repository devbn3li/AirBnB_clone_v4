$(document).ready(function () {
  console.log('amenities');
  const $checkboxes = $(".amenities input[type='checkbox']");
  let checked_amenities = [];

  $checkboxes.on('change', function () {
    amenity_id = $(this).data('id');
    amenity_name = $(this).data('name');

    if ($(this).is(':checked')) {
      checked_amenities.push({
        id: amenity_id,
        name: amenity_name

      });
    } else {
      checked_amenities = checked_amenities.filter(function (amenity) {
        return amenity.id != amenity_id;
      });
    }
    $('.amenities h4').empty();
    for (let index = 0; index < checked_amenities.length; index++) {
      if (checked_amenities.length == 1 || index == checked_amenities.length - 1) {
        $('.amenities h4').append(checked_amenities[index].name);
      } else {
        $('.amenities h4').append('' + checked_amenities[index].name + ', ');
      }
    }
    if (checked_amenities.length >= 3) {
      $('.amenities h4').addClass('text-ellipsis');
    } else {
      $('.amenities h4').removeClass('text-ellipsis');
    }
  });

  console.log('2-hbnb');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      console.log(data);
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
  const postData = {
    states: '',
    cities: '',
    amenities: ''
  };
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: JSON.stringify({ postData }),
    contentType: 'application/json',
    success: function (data) {
      $.each(data, function (index, place) {
        const places = '<article>' +
          '<div class="title_box">' +
          '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night">$' + place.price_by_night + '</div>' +
          '</div>' +
          '<div class="information">' +
          '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '') + '</div>' +
          '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '') + '</div>' +
          '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '') + '</div>' +
          '</div>' +
          '<div class="description">' + place.description + '</div>' +
          '</article>';

        $('section.places').append(places);
      });

      console.log('article total:' + $('section.places article').length);
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
});
