var ideaStore = new IdeaLocalStorage();

function clearInputFields() {
  $('.title-input-field').val('');
  $('.body-input-field').val('');
}

function IdeaLocalStorage() {
  JSON.parse(localStorage.getItem('ideas'));
}

function createIdea() {
  var ideaTitle = $('.title-input-field').val();
  var ideaBody = $('.body-input-field').val();
  var uniqueId = Date.now();
  var ideaQuality = "swill";
  // make an idea object using an Idea constructor
  var idea = { id: uniqueId, title: ideaTitle, body: ideaBody, quality: ideaQuality};
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
      <p class="level">quality: <span class="quality">${idea.quality}</span></p>
      </span>
      </article>
    `);
  });
}
function findIdea(id) {
  var collection = $.makeArray($('.idea-list-container').find('article'));
  return collection.filter(function(idea) { return idea.id == id })[0];
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


IdeaLocalStorage.prototype.updateIdea = function() {
  var newIdeas = this.getIdeas().map(function(idea) {
  var latest = findIdea(parseInt(idea.id));
  var newTitle = $(latest).find('.edit-title').text();
  var newBody = $(latest).find('.edit-body').text();
  var full = newTitle + newBody;

  if (newTitle != idea.title) {
    idea.title = newTitle;
  }
  if (newBody != idea.body) {
    idea.body = newBody;
  }
  return idea;
});
  window.localStorage.setItem(this.storeKey, JSON.stringify(newIdeas));
  render(ideaStore.getIdeas());
};

IdeaLocalStorage.prototype.search = function(searchText) {
  var ideas = this.getIdeas();
  var results = [];
  ideas.forEach(function(idea) {
    if(idea.title.indexOf(searchText) >= 0) {
      results.push(idea);
    } else if (idea.body.indexOf(searchText) >= 0) {
      results.push(idea);
    }
  });
  return results;
};

IdeaLocalStorage.prototype.levelUp = function(e) {
  var id = parseInt($(e.target).closest('article').attr('id'));
  var quality = $(e.target).siblings('.level').children().text();
  var ideas = this.getIdeas();
  ideas.forEach(function(idea) {
    if (idea.id === id) {
      if (idea.quality == 'plausible') {
        idea.quality = 'genius';
      }
      if (idea.quality == 'swill') {
        idea.quality = 'plausible';
      }
    }
  });
  window.localStorage.setItem(this.storeKey, JSON.stringify(ideas));
  render(ideaStore.getIdeas());
};

IdeaLocalStorage.prototype.levelDown = function(e) {
  var id = parseInt($(e.target).closest('article').attr('id'));
  var quality = $(e.target).siblings('.level').children().text();
  var ideas = this.getIdeas();
  ideas.forEach(function(idea) {
    if (idea.id === id) {
      if (idea.quality == 'plausible') {
        idea.quality = 'swill';
      }
      if (idea.quality == 'genius') {
        idea.quality = 'plausible';
      }
    }
  });
  window.localStorage.setItem(this.storeKey, JSON.stringify(ideas));
  render(ideaStore.getIdeas());
};

$('.idea-list-container').on('click', '.down', function(e) {
  ideaStore.levelDown(e);
});

$('.idea-list-container').on('click', '.up', function(e) {
  ideaStore.levelUp(e);
});

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

// render ideas on page load
render(ideaStore.getIdeas());

$('.idea-list-container').keypress(function(e) {
  if(e.which == 13) {
    ideaStore.updateIdea(e);
  }
});

$('.idea-list-container').on('focusout', '.idea-edit', function(e) {
  ideaStore.updateIdea(e);
});
