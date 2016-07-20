// CLEAR INPUT FIELDS

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
  $(`
    <article id=${$uniqueId} class="idea-article">
    <h2>${$ideaTitle}</h2>
    <button id="delete-article-button">DELETE</button>
    <p>${$ideaBody}</p>
    </article>
    `).prependTo('.idea-list-container');
  // $('.idea-list-container').append(`<article id=${idea.id}><h2>${idea.title}</h2><p>${idea.body}</p></article>`);
}

// SAVE BUTTON ENABLED
// localStorage.setItem(idea)
// save to localstorage

$('.save-button').on('click', function() {
  createIdea();
  clearInputFields();
});

$('.idea-list-container').on('click', '#delete-article-button', function() {
  deleteIdea();
});


  // make an idea object using an Idea constructor
// ________________________________________________________________________________________
// var ideas = [];
// ​
// $(document).ready(function () {
// 	var storedIdeas = JSON.parse(localStorage.getItems(‘ideas’));
// 	if (storedIdeas) {
// 		ideas = storage;
// 	}
// });
// ​
// var ideas = {
// 	add: createIdea(newIdea) {
// 		newIdea.id = Date.now();
// 		ideas.push(newIdea)
// 		localStorage.setItem(‘ideas’, ideas);
// 	},
// 	remove: function (id) {
// 		ideas = ideas.filter(function (idea) {
// 			return idea.id !== id;
// 	});
// 	localStorage.setItem(‘ideas’, ideas);
// 	}
// }
// _________________________________________________________________________

// function Idea(id, title, body) {
//   this.id = id;
//   this.title = title;
//   this.body = body;
// }
//
// function saveIdea() {
//   var idea = new Idea(uniqueId, ideaTitle, ideaBody);
//   localStorage.setItem('uniqueId', idea)
// }
//
//
// // Need clearification on definition of object, array and properties
//
//

//
// if (window.localStorage) {
//   $('.title-input-field').on('keyup', function() {
//     var ideaTitle = $('.title-input-field').value;
//     localStorage.setItem('.title-input-field', title);
//   }
// }
