var ideaStore = new IdeaLocalStorage();

function clearInputFields() {
  $('.title-input-field').val('');
  $('.body-input-field').val('');
}

// function IdeaLocalStorage() {
//   this.storeKey = ideas;
//   this.ideaStore = [];
// }
//

// *mentor
function IdeaLocalStorage() {
  this.storeKey = 'ideas';
}

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
    $('.idea-list-container').append (`
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


IdeaLocalStorage.prototype.getIdeas = function() {
  return JSON.parse(window.localStorage.getItem(this.storeKey)) || [];
};

IdeaLocalStorage.prototype.addIdea = function(idea) {
  var ideas = this.getIdeas();
  ideas.unshift(idea);
  window.localStorage.setItem(this.storeKey, JSON.stringify(ideas));
};

IdeaLocalStorage.prototype.removeIdea = function(e) {
  var newIdeas = [];
  var id = parseInt($(e.target).closest('article').attr('id'));
  var ideas = this.getIdeas().filter(function(idea) {
    return idea.id !== id;
  });
  window.localStorage.setItem(this.storeKey, JSON.stringify(ideas));
  render(ideaStore.getIdeas());
};

// +IdeaLocalStorage.prototype.removeIdea = function(uniqueId) {
//   +  var ideas = this.getIdeas();
//   +  var newIdeas = [];
//   +  newIdeas.forEach(function(idea) {
//     +      if(!idea.uniqueId === uniqueId) newIdeas.push(idea);
//     +  })
//     +  window.localStorage.setItem(this.storeKey, JSON.stringify(newIdeas));
//   }

IdeaLocalStorage.prototype.updateIdea = function(e) {
  var ideas = this.getIdeas();
  var newIdeas = [];
  var id = parseInt($(e.target).closest('article').attr('id'));
  var ideaTitle = $(e.target).closest('.edit-title').text();
  var ideaBody = $(e.target).closest('.edit-body').text();
  ideas.forEach(function(existingIdea) {
    if(existingIdea.uniqueId !== idea.uniqueId) newIdeas.push(idea);
    else newIdeas.push(idea);
  });
    window.localStorage.setItem(this.storeKey, JSON.stringify(newIdeas));
};
  // WHAT WAS WORKING FOR UPDATEIDEA
//   var idea = { id: id, title: ideaTitle, body: ideaBody };
//     ideaStore.addIdea(idea);
//
//     render(ideaStore.getIdeas());
// };

IdeaLocalStorage.prototype.search = function(searchText) {
  var ideas = this.getIdeas();
  var results = [];
  ideas.forEach(function(idea) {
      if(idea.title.indexOf(searchText) >= 0) results.push(idea);
      else if (idea.body.indexOf(searchText) >= 0) results.push(idea);
  });
  return results;
};

$('.idea-list-container').on('click', '.delete-button', function(e) {
  ideaStore.removeIdea(e);
});

$('.search-field').on('keyup', function() {
  var searchText = $(this).val();
  var searchResults = ideaStore.search(searchText);
  render(searchResults);
});

$('.save-button').on('click', function(ideas) {
  createIdea();
  clearInputFields();
});

render(ideaStore.getIdeas());

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
