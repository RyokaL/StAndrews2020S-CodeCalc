var oldRows = 0;
var newRows = 0;

function addOldRow() {
  oldRows += 1;
  var nextId = "old-row" + oldRows;
  $("<div/>", {
    id: nextId,
    "class" : "old-row"
  }).appendTo(".old");

  $("<input/>", {
    type:"text",
    name:"Grade",
    placeholder:"Module Grade"
  }).appendTo("#" + nextId);

  $("<input/>", {
    type:"text",
    name:"Credits",
    placeholder:"Credits"
  }).appendTo("#" + nextId);
}

function addNewRow() {
  newRows += 1;
  var nextId = "new-row" + newRows;
  $("<div/>", {
    id: nextId,
    "class" : "new-row"
  }).appendTo(".new");

   $("<input/>", {
    type:"text",
    name:"Name",
    placeholder:"Friendly Name"
  }).appendTo("#" + nextId);

  $("<input/>", {
    type:"text",
    name:"Grade",
    placeholder:"Module Grade"
  }).appendTo("#" + nextId);

  $("<input/>", {
    type:"text",
    name:"Credits",
    placeholder:"Credits"
  }).appendTo("#" + nextId);
}

function sCode() {
  var nsRows = $("#oldRows");
  var oldGrades = [];

  nsRows.children("div").each(function() {
    var g = $(this).children("input[name=Grade]").val();
    var c = $(this).children("input[name=Credits]").val();

    g = parseFloat(g);
    c = parseInt(c);

    oldGrades.push({
      grade: g,
      credits: c,
      name: ""
    });
  });

  var sRows = $("#newRows");
  var newGrades = [];

  sRows.children("div").each(function() {
    var g = $(this).children("input[name=Grade]").val();
    var c = $(this).children("input[name=Credits]").val();
    var n = $(this).children("input[name=Name]").val();

    g = parseFloat(g);
    c = parseInt(c);

    newGrades.push({
      grade: g,
      credits: c,
      name: n
    });
  });

  var results = [];

  var max = newGrades.length * newGrades.length;
  var index = new Array(newGrades.length).fill(false);
  for(var i = 0; i < max; i++) {
    var resString = "S-coded Modules: ";
    var currGrades = [];
    for(var j = 0; j < index.length; j++) {
      if(index[j]) {
        currGrades.push(newGrades[j]);
      }
      else {
        resString += newGrades[j].name + "  ";
      }
    }

    if(currGrades.length == newGrades.length) {
      resString = "No S-coded Modules: ";
    }

    var combGrades = oldGrades.concat(currGrades);
    var m = calcMean(combGrades);
    var med = calcMedian(combGrades);

    resString += " resulting in a mean of " + m + " and a median of " + med;
    results.push(resString);

    var k = 0;
    while(true) {
      if(!index[k]) {
        index[k] = true;
        break;
      }
      else {
        index[k] = false;
        k++;
      }
    }
  }

  var resDiv = $("#results");
  resDiv.empty();
  results.forEach(x => {
    resDiv.append("<p>" + x + "</p>");
  });

}

function calcMean(grades) {
  var total = 0;
  var totCredits = 0;
  for(var i = 0; i < grades.length; i++) {
    total += grades[i].grade * grades[i].credits;
    totCredits += grades[i].credits;
  }
  return (total / totCredits);
}

function calcMedian(grades) {
  var totCredits = 0;
  for(var i = 0; i < grades.length; i++) {
    totCredits += grades[i].credits;
  }
  var mid = (totCredits + 1) / 2;

  var count = 0;
  if(Number.isInteger(mid)) {
    for(var i = 0; i < grades.length; i++) {
      count += grades[i].credits;
      if(count >= mid) {
        return grades[i].grade;
      }
    }
  }
  else {
    for(var i = 0; i < grades.length; i++) {
      count += grades[i].credits;
      if(mid - 0.5 == count && mid + 0.5 > count) {
        return grades[i].grade;
      }
    }
  }
}
