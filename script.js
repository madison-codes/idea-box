// A new idea with the provided title and body should appear in the idea list.
function clearInputFields() {
  $('.title-input-field').val('');
  $('.body-input-field').val('');
}

function createIdea() {
  var ideaTitle = $('.title-input-field').val();
  var ideaBody = $('.body-input-field').val();

$('.idea-list-container').prepend('<article\>' +
                           '<h2>'+ ideaTitle +'</h2>' +
                           '<p>' + ideaBody +'</p>' +
                           '</article>');
}

$('.save-button').on('click', function() {
  createIdea();
  clearInputFields();
});

// The text fields should be cleared and ready to accept a new idea. The page should not reload.
// Ideas should still be present upon reloading the page.
