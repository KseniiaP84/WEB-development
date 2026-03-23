(function () {

  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {

    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }

  }

})();


(function () {

  var names = ["Anna", "Mark", "Julia", "Tom", "Lara", "Sofiia", "Lisa"];

  console.log("Rule: if name ends with 'a' - Goodbye");

  for (var i = 0; i < names.length; i++) {

    var lastLetter = names[i].charAt(names[i].length - 1).toLowerCase();

    if (lastLetter === 'a') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }

  }

})();
