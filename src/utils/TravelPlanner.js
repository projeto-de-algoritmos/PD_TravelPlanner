getName = (item) => item[0][0];
function getNames(item) {
    if (item == -1) return [];
    else return item[0];
}

function getRank(item) {
    if (item[1] == undefined) return 0;
    else return item[1];
} 

function concatValues(touristSpotA, touristSpotB=-1) {
    if (touristSpotB == -1) {
        return touristSpotA;
    } else {
        names = getNames(touristSpotA);
        nominhos = getNames(touristSpotB);

        for (var nominho of nominhos) {
            names.push(nominho)
        }

        ranking = getRank(touristSpotA) + getRank(touristSpotB);
        return [names, ranking];
    }
}

function retrieveRemaining(schedule, i, j, numHoras) {
    jPos = j - numHoras;

    if (jPos < 0) {
        return -1;
    }

    iPos = i - 1;
    names = getNames(schedule[iPos][jPos]);
    ranking = getRank(schedule[iPos][jPos]);

    if (names.length == 0) {
        return -1;
    }

    return [names, ranking]
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
    
    cols = maxHour / 3;
    rows = touristSpots.length;

    schedule = [];

    for (var i=0; i<rows; i++) {
        schedule.push([]);
        for (var j=0; j<cols; j++) {
            schedule[i].push(-1);
        }
    }

    return schedule;
}


function calcTable(touristSpots, schedule) {
    rows = schedule.length;
    cols = schedule[0].length;


    for (var i=0; i<rows; i++) {
        var touristSpot = touristSpots[i];
    
        let name = touristSpot[0];
        let numHoras = touristSpot[1]/3;
        let ranking = touristSpot[2];

        for (var j=0; j<cols; j++) {
            if (i==0) {
                if (numHoras <= j+1) {
                    schedule[i][j] = [[name], ranking];
                }
            } else {
                if (numHoras <= j+1) {
                    var remainingRank = 0;
                    
                    if (j>0) {
                        var remain = retrieveRemaining(schedule, i, j, numHoras);
                        remainingRank = getRank(remain);
                    }

                    if (getRank(schedule[i-1][j]) < remainingRank + ranking) {
                        schedule[i][j] = concatValues([[name], ranking], remain);
                    } else {
                        if (schedule[i-1][j] != -1)
                            schedule[i][j] = [getNames(schedule[i-1][j]), getRank(schedule[i-1][j])];
                    }
                } else {
                    if (schedule[i-1][j] != -1) 
                        schedule[i][j] = [getNames(schedule[i-1][j]), getRank(schedule[i-1][j])];
                }
            }

        }
    }
}

lista = [['violao', 3, 1500], ['radio', 12, 3000], ['notebook', 9, 2000]];

calcTable(lista, buildTable(lista));