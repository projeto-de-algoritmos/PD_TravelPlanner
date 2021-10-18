getNames = (item) => item[0];
getName = (item) => item[0][0];
getRank = (item) => item[1];

function concatValues(touristSpotA, touristSpotB) {
    if (touristSpotB == -1) {
        return touristSpotA;
    } else {
        names = getNames(touristSpotA);
        nominho = getName(touristSpotB);
        names.push(nominho);
        ranking = getRank(touristSpotA) + getRank(touristSpotB);
        return [names, ranking];
    }
}

function montaTabela(touristSpots, maxHour) {
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



// Deve-se esperar um array de tuplas no formato [('nome', numHoras, ranking), ('nome', numHoras, ranking), ('nome', numHoras, ranking)]
function calculaTabela(touristSpots, schedule) {
    cols = 2;
    rows = 3;

    for (var i=0; i<rows; i++) {
        var touristSpot = touristSpots[i];
    
        let name = touristSpot[0];
        let numHoras = touristSpot[1]/3;
        let ranking = touristSpot[2];

        for (var j=0; j<cols; j++) {
            if (i==0) {
                if (numHoras <= j+1) schedule[i][j] = [[name], ranking];
            } else {
                if (numHoras <= j+1) {
                    if (getRank(schedule[i-1][j]) < ranking) {
                        // TODO
                        // valor do item atual + valor restante = schedule[i][j-numHoras] && getNames(schedule[i][j-numHoras]) != name
                        schedule[i][j] = [[name], ranking];
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

    console.log(schedule);
    console.log(getNames(schedule[0][0]));
}

lista = [['pindamangoiaba', 3, 4], ['laranjeira', 6, 9], ['bolo de abacaxi', 3, 6]];

calculaTabela(lista, montaTabela(lista, 6));
concatValues([["Pindamangoiaba", "Laranjeira"], 8], [["Augusta"], 6]);