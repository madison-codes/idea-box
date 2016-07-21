function clearInputFields() {
  $('.title-input-field').val('');
  $('.body-input-field').val('');
}
//
// function Idea(id, title, body) {
//   this.id = id;
//   this.title = title;
//   this.body = body;
// }

function IdeaLocalStorage() {
  this.storeKey = 'ideas';
}


IdeaLocalStorage.prototype.getIdeas = function() {
  return JSON.parse(window.localStorage.getItem(this.storeKey)) || [];
}

IdeaLocalStorage.prototype.addIdea = function(idea) {
  var ideas = this.getIdeas();

  ideas.unshift(idea);
  window.localStorage.setItem(this.storeKey, JSON.stringify(ideas));
}

IdeaLocalStorage.prototype.removeIdea = function(uniqueId) {
  var ideas = this.getIdeas();
  var newIdeas = [];
  newIdeas.forEach(function(idea) {
      if(!idea.uniqueId === uniqueId) newIdeas.push(idea);
  })

  window.localStorage.setItem(this.storeKey, JSON.stringify(newIdeas));
}

IdeaLocalStorage.prototype.updateIdea = function(idea) {
  var ideas = this.getIdeas();
  var newIdeas = [];
  ideas.forEach(function(existingIdea) {
      if(!existingIdea.uniqueId === idea.uniqueId) newIdeas.push(idea);
      else newIdeas.push(idea);
  });

  window.localStorage.setItem(this.storeKey, JSON.stringify(newIdeas));
}

IdeaLocalStorage.prototype.search = function(searchText) {
  var ideas = this.getIdeas();
  var results = [];
  ideas.forEach(function(idea) {
      if(idea.title.indexOf(searchText) >= 0) results.push(idea);
      else if (idea.body.indexOf(searchText) >= 0) results.push(idea);
  });
  return results;
}


//
// function IdeaRestStorage() {
//
// }
//
// IdeaRestStorage.prototype.addIdea = function(idea) {
//   // ajax post
// }

var ideaStore = new IdeaLocalStorage();


function createIdea() {
  var ideaTitle = $('.title-input-field').val();
  var ideaBody = $('.body-input-field').val();
  var uniqueId = Date.now();
  // make an idea object using an Idea constructor
  var idea = { id: uniqueId, title: ideaTitle, body: ideaBody };
  ideaStore.addIdea(idea);

  render(ideaStore.getIdeas());
  //addToContainer(idea, $('.idea-list-container'));
  //$('.idea-list-container').append(`<article id=${idea.id}><h2>${idea.title}</h2><p>${idea.body}</p></article>`);
}

function render(ideas) {
  $('.idea-list-container').empty();
  ideas.forEach(function(idea) {
    $('.idea-list-container').append(`<article id=${idea.id}><h2>${idea.title}</h2><p>${idea.body}</p></article>`);
  });
}

$('.search-field').on('keyup', function() {
  var searchText = $(this).val();
  var searchResults = ideaStore.search(searchText);
  render(searchResults);
});

$('.save-button').on('click', function() {
  var idea = createIdea();
  // save to localstorage
  clearInputFields();
});

function sampleCreateIdea(ideaTitle, ideaBody) {
  var stringAllIdeas = JSON.stringify({id: idea, title: '2a', body: '$3a'});
  localStorage.setItem('sampleIdea', stringAllIdeas)
}

// create objects around behaviour

//run all logic and seperately from DOM and destroy and recreate DOM with every interaction

// to clear everything (all stored data) set Store to empty string


render(ideaStore.getIdeas());
