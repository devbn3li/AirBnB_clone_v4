$(document).ready(function () {
  const $checkboxes = $(".amenities input[type='checkbox']");
  let checked_amenities = [];
  let checked_states_cities = [];

  $checkboxes.on('change', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {
      checked_amenities.push({ id, name });
      checked_states_cities.push(id);
    } else {
      checked_amenities = checked_amenities.filter(function (amenity) {
        return amenity.id != id;
      });
      checked_states_cities = checked_states_cities.filter(function (state_city_id) {
        return state_city_id != id;
      });
    }

    $('.amenities h4').empty();
    $('.locations h4').text(checked_states_cities.join(', '));
  });

  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: '/places_search',
      data: JSON.stringify({ amenities: checked_amenities, states_cities: checked_states_cities }),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (data) {
        console.log(data);
      },
      failure: function (errMsg) {
        console.log(errMsg);
      }
    });
  });
});
