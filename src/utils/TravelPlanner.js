// const getName = (item) => item[0][0];

function getNames(item) {
  if (item === -1) return [];
  else return item[0];
}

function getRank(item) {
  if (item[1] === undefined) return 0;
  else return item[1];
}

function concatValues(touristSpotA, touristSpotB = -1) {
  if (touristSpotB === -1) {
    return touristSpotA;
  } else {
    var names = getNames(touristSpotA);
    var nominhos = getNames(touristSpotB);

    for (var nominho of nominhos) {
      names.push(nominho);
    }

    var ranking = getRank(touristSpotA) + getRank(touristSpotB);
    return [names, ranking];
  }
}

function retrieveRemaining(schedule, i, j, numHoras) {
  var jPos = j - numHoras;

  if (jPos < 0) {
    return -1;
  }

  var iPos = i - 1;
  var names = getNames(schedule[iPos][jPos]);
  var ranking = getRank(schedule[iPos][jPos]);

  if (names.length === 0) {
    return -1;
  }

  return [names, ranking];
}

function getHighestHour(touristSpots) {
  var maxHour = -1;
  for (var touristSpot of touristSpots) {
    var hour = touristSpot[1];
    if (hour > maxHour) maxHour = hour;
  }
  return maxHour;
}

function buildTable(touristSpots) {
  var maxHour = getHighestHour(touristSpots);

  var cols = maxHour / 3;
  var rows = touristSpots.length;

  var schedule = [];

  for (var i = 0; i < rows; i++) {
    schedule.push([]);
    for (var j = 0; j < cols; j++) {
      schedule[i].push(-1);
    }
  }

  return schedule;
}

function calcTable(touristSpots, schedule) {
  var rows = schedule.length;
  var cols = schedule[0].length;

  for (var i = 0; i < rows; i++) {
    var touristSpot = touristSpots[i];

    let name = touristSpot[0];
    let numHoras = touristSpot[1] / 3;
    let ranking = touristSpot[2];

    for (var j = 0; j < cols; j++) {
      if (i === 0) {
        if (numHoras <= j + 1) {
          schedule[i][j] = [[name], ranking];
        }
      } else {
        if (numHoras <= j + 1) {
          var remainingRank = 0;

          if (j > 0) {
            var remain = retrieveRemaining(schedule, i, j, numHoras);
            remainingRank = getRank(remain);
          }

          if (getRank(schedule[i - 1][j]) < remainingRank + ranking) {
            schedule[i][j] = concatValues([[name], ranking], remain);
          } else {
            if (schedule[i - 1][j] !== -1)
              schedule[i][j] = [
                getNames(schedule[i - 1][j]),
                getRank(schedule[i - 1][j]),
              ];
          }
        } else {
          if (schedule[i - 1][j] !== -1)
            schedule[i][j] = [
              getNames(schedule[i - 1][j]),
              getRank(schedule[i - 1][j]),
            ];
        }
      }
    }
  }

  return schedule;
}

export default function gateway(touristSpots) {
  var schedule = buildTable(touristSpots);

  var lastRow = schedule.length - 1;
  var lastCol = schedule[0].length - 1;

  var newSchedule = calcTable(touristSpots, schedule);

  return getNames(newSchedule[lastRow][lastCol]);
}
