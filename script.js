function clearInputFields() {
  $('.title-input-field').val('');
  $('.body-input-field').val('');
}

function Idea(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
}

function createIdea() {
  var ideaTitle = $('.title-input-field').val();
  var ideaBody = $('.body-input-field').val();
  var uniqueId = Date.now();
  // make an idea object using an Idea constructor
  var idea = new Idea(uniqueId, ideaTitle, ideaBody);
  $('.idea-list-container').append(`<article id=${idea.id}><h2>${idea.title}</h2><p>${idea.body}</p></article>`);
}

$('.save-button').on('click', function() {
  var idea = createIdea();
  // save to localstorage
  clearInputFields();
});
