function clearInputFields() {
  $('.title-input-field').val('');
  $('.body-input-field').val('');
}

function deleteIdea() {
  $('#delete-article-button').closest('article').remove();
}

function createIdea() {
  var $uniqueId = Date.now();
  var $ideaBody = $('.body-input-field').val();
  var $ideaTitle = $('.title-input-field').val();
  // var idea = new Idea($uniqueId, $ideaTitle, $ideaBody);
  $(`
    <article id=${$uniqueId} class="idea-article">
    <h2>${$ideaTitle}</h2>
    <button id="delete-article-button">DELETE</button>
    <p>${$ideaBody}</p>
    <button id="increase-quality-button">Thumbs Up</button>
    <button id="decrease-quality-button">Thumbs Down</button>
    </article>
    `).prependTo('.idea-list-container');
}

function Idea(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
}

function sampleCreateIdea(ideaTitle, ideaBody) {
  var stringAllIdeas = JSON.stringify({id: idea, title: '2a', body: '$3a'});
  localStorage.setItem('sampleIdea', stringAllIdeas)
}

$('.save-button').on('click', function() {
  createIdea();
  clearInputFields();
});

$('.idea-list-container').on('click', '#delete-article-button', function() {
  deleteIdea();
});


  // make an idea object using an Idea constructor
