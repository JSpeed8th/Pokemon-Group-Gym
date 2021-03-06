// -------------------ASSIGNING VARIABLES TO HTML ELEMENTS----------------------

var pokemon = document.getElementById('pokemon');
var secondScreen = document.querySelector('.stat_screen');
var pokeName = document.getElementById('name_of_pokemon');
var leftButton = document.getElementById('left');
var rightButton = document.getElementById('right');
var headerName = document.getElementById('headerName');
var attackButton = document.querySelector('.attack_button')

var dynamicHeight = document.getElementById('height');
var dynamicHp = document.getElementById('hp');
var dynamicAttack = document.getElementById('attack');

let quad = document.querySelector('#ability')
let li = document.createElement('li')
li.classList.add('abilities')

window.addEventListener('load', function() {
  setTimeout(removeLoadingScreen, 5000)
})
var pikachu = document.querySelector('#pikachu');

// -----------------------------EVENT LISTENERS---------------------------------

// Every click will cycle through Trainer's array of pokemon and call ajax function below.

var clicks = -1;
rightButton.addEventListener('click', function() {
  if(clicks < jordansDeck.pokedex.length - 1) {
    clicks++
    console.log('right')
    ajaxCall()
    pokemonSlideIn()
  } else {
    clicks = 0;
    console.log('right')
    ajaxCall()
  }
})

leftButton.addEventListener('click', function() {
  if(clicks == 0) {
    clicks = jordansDeck.pokedex.length - 1
    console.log('left')
    ajaxCall()
  } else {
    clicks--
    console.log('left')
    ajaxCall()
  }
})

attackButton.addEventListener('click', function() {
  pokemonAttack()
})

// Hover Animations

leftButton.addEventListener('mouseover', function() {
  leftButton.style.color = 'black';
  leftButton.style.opacity = '1';
  leftButton.style.transition = '.2s';
})

leftButton.addEventListener('mouseout', function() {
  leftButton.style.color = 'black';
  leftButton.style.opacity = '0.5';
  leftButton.style.transition = '.2s';
})

rightButton.addEventListener('mouseover', function() {
  rightButton.style.color = 'black';
  rightButton.style.opacity = '1';
  rightButton.style.transition = '.2s';
})

rightButton.addEventListener('mouseout', function() {
  rightButton.style.color = 'black';
  rightButton.style.opacity = '0.5';
  rightButton.style.transition = '.2s';
})

// Attack Button Hover Animation

attackButton.addEventListener('mouseover', function() {
  attackButton.style.opacity = '0.5';
  attackButton.style.transition = '.2s';
})

attackButton.addEventListener('mouseout', function() {
  attackButton.style.opacity = '1';
  attackButton.style.transition = '.2s';
})



// -----------------------------------END---------------------------------------


// --------------------------------AJAX CALL------------------------------------

function ajaxCall() {
    $.ajax({url:'https://fizal.me/pokeapi/api/' + jordansDeck.pokedex[clicks].nationalNumb + '.json',
    success: function(response) {
      changeName(response)
      pokePic(response)
      statAssignment(response)
      dynamicStats()
    }
  })
}



         // DYNAMICALLY CHANGING INNER HTML BY CALLING FUNCTIONS BELOW

// -----------------------------POKE PIC FUNCTION-------------------------------

function pokePic(x) {
    pokemon.style.backgroundImage = "url(" + x['sprites']['front_default'] + ")";

}


// ----------------------------POKE NAME FUNCTION-------------------------------

function changeName(x) {
  pokeName.innerHTML = x.name

}

// ---------------------FUNCTION ASSIGNING POKEMON STATS------------------------

function statAssignment(response) {
  jordansDeck.pokedex[clicks].name = response['name'];
  jordansDeck.pokedex[clicks].height = response['height'];
  jordansDeck.pokedex[clicks].hp = response['stats'][5]['base_stat'];
  jordansDeck.pokedex[clicks].attack = response['stats'][4]['base_stat'];
  jordansDeck.pokedex[clicks].abilities = response['abilities'];
}

// -------------------FUNCTION DYNAMICALLY CHANGING STATS-----------------------

function dynamicStats() {
  dynamicHeight.innerHTML = jordansDeck.pokedex[clicks].height
  dynamicHp.innerHTML = jordansDeck.pokedex[clicks].hp
  dynamicAttack.innerHTML = jordansDeck.pokedex[clicks].attack
  getAbilities()
  // dynamicAbilities0.innerHTML = jordansDeck.pokedex[clicks].abilities [0]['ability']['name']
  // dynamicAbilities1.innerHTML = jordansDeck.pokedex[clicks].abilities [1]['ability']['name']

  // if(jordansDeck.pokedex[clicks].abilities.length === 3) {
  //    dynamicAbilities2.innerHTML = jordansDeck.pokedex[clicks].abilities [2]['ability']['name']
  // }

}

/* Function to Create Dynamic Abilities */

function getAbilities() {
  li.textContent = '' //Set the Text content of the list of abilities to nothing
  console.log(jordansDeck.pokedex[clicks].abilities)
  //For each entry in abilities set the li text content to this ability
  jordansDeck.pokedex[clicks].abilities.map(item => {
    li.textContent += `${item.ability.name} `
    quad.appendChild(li)
  })
}

// ----------------------FUNCTION FOR SLIDE IN ANIMATION------------------------

function pokemonSlideIn() {
  pokemon.style.animationName = 'pokemonslidein';
  pokemon.style.animationDuration = '1.2s';
  pokemon.style.animationDirection = 'alternate';
}


function playMusic() {
 var song1 = new Audio('audio/115-battle (vs trainer).mp3')
 return song1
}

function pokemonAttack() {
  pokemon.style.animationName = 'attack, attack2, attack3';
  pokemon.style.animationDuration = '1s', '2s', '1s';
  // pokemon.style.animationDirection = 'reverse';
}

// ------------------------CREATE A POKEMON  CONSTRUCTOR------------------------

class Pokemon {
  constructor(nationalNumb) {
    this.nationalNumb = nationalNumb;
    this.name;
    this.height;
    this.hp;
    this.attack;
    this.abilities;
  }
};

var jigglypuff = new Pokemon(39)
var eevee = new Pokemon(133)
var psyduck = new Pokemon(54)

// --------------------CREATE A POKEMON TRAINER CONSTRUCTOR---------------------

class Trainer{
  constructor(fname, lname) {
    this.fname = fname;
    this.lname = lname;
    this.pokedex = [];
  }
  addToPokedex(pokemonObject) {
    this.pokedex.push(pokemonObject);
  }
  all() {
    return this.pokedex;
  }
  get(pokemon) {
    return pokemon;
  }
}

var jordansDeck = new Trainer ('Rafiq and Jordan', 'blank')

jordansDeck.addToPokedex(jigglypuff)
jordansDeck.addToPokedex(eevee)
jordansDeck.addToPokedex(psyduck)

// 1. Create a class for each pokemon instance.
// 2. Figure out if ajax should be included within the class or if it should be considered my pokedex.
// 3. Maybe pokemon has the info and the ajax calls it?

// ---------REPLACES 'POKEMON' WITHIN TITLE WITH TRAINER'S FIRST NAME-----------

headerName.innerHTML = jordansDeck.fname + "'s";

// ---- Rafiq & Taj's Pokemon ------------------------------

let getPokemon = () => {
  let id = [10,11,12,80,81,82];

  id.forEach(item => {
    let newPokemon = new Pokemon(item)
    jordansDeck.addToPokedex(newPokemon)
  })

}

getPokemon()

function removeLoadingScreen() {
  //Get Main Screen
  mainScreen = document.querySelector('.main-wrapper')
  mainScreen.classList.remove('hidden')

  //Remove loading screen
  loadingScreen = document.querySelector('#loading--screen')
  loadingScreen.classList.add('hidden')
}

// ----------------------------DISPLAYING PIKACHU-------------------------------

$.ajax({url:'https://fizal.me/pokeapi/api/25.json',
success: function(response) {
  console.log(response)
  pikachu.style.backgroundImage = "url(" + response['sprites']['back_default'] + ")";
}
})
