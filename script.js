function clearInputFields() {
  $('.title-input-field').val('');
  $('.body-input-field').val('');
}

// function getTime() {
//   var uniqueTime = Date.now();
// }

function createIdea() {
  var ideaTitle = $('.title-input-field').val();
  var ideaBody = $('.body-input-field').val();
  var uniqueId = Date.now();
  $('.idea-list-container').append(`<article id=${uniqueId}><h2>${ideaTitle}</h2><p>${ideaBody}</p></article>`);
}

$('.save-button').on('click', function() {
  createIdea();
  clearInputFields();
});
