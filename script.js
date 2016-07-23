function clearInputFields() {
  $('.title-input-field').val('');
  $('.body-input-field').val('');
}

// // Constructor: Allows to make n amount of instances (object)
function IdeaLocalStorage() {
  this.storeKey = 'ideas';
  this.ideas = [];
}

IdeaLocalStorage.prototype.getIdeas = function() {
  return JSON.parse(window.localStorage.getItem(this.storeKey)) || [];
}

IdeaLocalStorage.prototype.addIdea = function(idea) {
  var ideas = this.getIdeas();
  ideas.unshift(idea);
  window.localStorage.setItem(this.storeKey, JSON.stringify(ideas));
}

IdeaLocalStorage.prototype.removeIdea = function(e) {
  // the id of the idea that was clicked
  // forEach: remove the idea that's matcjng the unique od
  // e.target ---> button that was clicked
  var id = parseInt($(e.target).closest('article').attr('id'));

  var ideas = this.getIdeas().filter(function(idea) {
    return idea.id !== id;
  });

  // var ideas = this.getIdeas();
  // var newIdeas = []
  // ideas.forEach(function(idea) {
  //     if(!idea.id === ideas.id) newIdeas.push(ideas);
  // })

  // extrac \t to a saveAndRender()

  window.localStorage.setItem(this.storeKey, JSON.stringify(ideas));
  render(ideaStore.getIdeas());
}

IdeaLocalStorage.prototype.updateIdea = function(e) {
  // grab id of item that was clicked
  // update title and body of idea that was clicked
  // keep uniqueId
  // update title & body of idea
  var id = parseInt($(e.target).closest('article').attr('id'));
  var ideaTitle = $(e.target).closest('.edit-title').text();
  var ideaBody = $(e.target).closest('.edit-body').text();
  // make an idea object using an Idea constructor
  var idea = { id: id, title: ideaTitle, body: ideaBody };
    ideaStore.addIdea(idea);

    render(ideaStore.getIdeas());
};
//   var ideas = this.getIdeas();
//   var newIdeas = [];
//   ideas.forEach(function(existingIdea) {
//       if(!existingIdea.uniqueId === idea.uniqueId) newIdeas.push(idea);
//       else newIdeas.push(idea);
//   });
//   window.localStorage.setItem(this.storeKey, JSON.stringify(newIdeas));
// }

IdeaLocalStorage.prototype.search = function(searchText) {
  var ideas = this.getIdeas();
  var results = [];
  ideas.forEach(function(idea) {
      if(idea.title.indexOf(searchText) >= 0) results.push(idea);
      else if (idea.body.indexOf(searchText) >= 0) results.push(idea);
  });
  return results;
}

var ideaStore = new IdeaLocalStorage();

function createIdea() {
  var ideaTitle = $('.title-input-field').val();
  var ideaBody = $('.body-input-field').val();
  var uniqueId = Date.now();
  // make an idea object using an Idea constructor
  var idea = { id: uniqueId, title: ideaTitle, body: ideaBody };
  ideaStore.addIdea(idea);

  render(ideaStore.getIdeas());
}

function render(ideas) {
  $('.idea-list-container').empty();
  ideas.forEach(function(idea) {
    $('.idea-list-container').append(`
      <article id=${idea.id}>
      <span class="top line">
      <h2 contenteditable = "true" class="idea-edit edit-title">${idea.title}</h2>
      <button type="button" class="delete-button"/></button></span>
      <p contenteditable = "true" class="idea-edit edit-body">${idea.body}</p>
      <span class="bottom-line">
      <button type="button" class="quality-button up"/></button>
      <button type="button" class="quality-button down"/></button>
      <p class="quality">quality: </p>
      </span>
      </article>
    `);
  });
}

// DELETE BUTTON
$('.idea-list-container').on('click', '.delete-button', function(e) {
  ideaStore.removeIdea(e);
})

$('.search-field').on('keyup', function() {
  var searchText = $(this).val();
  var searchResults = ideaStore.search(searchText);
  render(searchResults);
});

$('.save-button').on('click', function() {
  createIdea();
  clearInputFields();
});

render(ideaStore.getIdeas());

// SAVE ON RETURN PRESS
$('.main-content').keypress(function(e) {
    if(e.which == 13) {
    ideaStore.updateIdea(e);
  }
});

// CLICK OUTSIDE EVENTLISTENER
// $(document).on ('click', function() {
//       console.log('hello');
//     });
//
// $('.idea-edit').on('click', function(event) {
//   event.isImmediatePropagationStopped();
//   console.log('clickout');
// });

// DELETE BUTTON

// EDITABLE FIELD FOR TITLE & BOVY

// event handeler for each
// triggers change to body/ title
// saves and rerenders on event handeler (return or click out)


// QUALITY

// event handeler to trigger event
// counter function up
// counter function down
// matching function with array

//
// // Singleton Object
// var IdeaLocalStorage = {
//   storeKey: 'ideas',
//   ideas: [],
//   removeIdea: function(id) {
//       // refactoring to a singleton
//   }
// };


// $('.idea-list-container').on('click', '#delete-article-button', function() {
//   deleteIdea();
// });

// create objects around behaviour

//run all logic and seperately from DOM and destroy and recreate DOM with every interaction

// to clear everything (all stored data) set Store to empty string



//
// function deleteIdea() {
//   $('#delete-article-button').closest('article').remove();
// }
//
// function createIdea() {
//   var $uniqueId = Date.now();
//   var $ideaBody = $('.body-input-field').val();
//   var $ideaTitle = $('.title-input-field').val();
//   // var idea = new Idea($uniqueId, $ideaTitle, $ideaBody);
//   $(`
//     <article id=${$uniqueId} class="idea-article">
//     <h2>${$ideaTitle}</h2>
//     <button id="delete-article-button">DELETE</button>
//     <p>${$ideaBody}</p>
//     <button id="increase-quality-button">Thumbs Up</button>
//     <button id="decrease-quality-button">Thumbs Down</button>
//     </article>
//     `).prependTo('.idea-list-container');
// }
//
// function Idea(id, title, body) {
//   this.id = id;
//   this.title = title;
//   this.body = body;
// }

// -//
// -// function deleteIdea() {
// -//   $('#delete-article-button').closest('article').remove();
// -// }
// -//
// -// function createIdea() {
// -//   var $uniqueId = Date.now();
// -//   var $ideaBody = $('.body-input-field').val();
// -//   var $ideaTitle = $('.title-input-field').val();
// -//   // var idea = new Idea($uniqueId, $ideaTitle, $ideaBody);
// -//   $(`
// -//     <article id=${$uniqueId} class="idea-article">
// -//     <h2>${$ideaTitle}</h2>
// -//     <button id="delete-article-button">DELETE</button>
// -//     <p>${$ideaBody}</p>
// -//     <button id="increase-quality-button">Thumbs Up</button>
// -//     <button id="decrease-quality-button">Thumbs Down</button>
// -//     </article>
// -//     `).prependTo('.idea-list-container');
// -// }
// -//
// -// function Idea(id, title, body) {
// -//   this.id = id;
// -//   this.title = title;
// -//   this.body = body;
// -// }
