let age = null;
//INPUT//
function getAge() {

    age = document.getElementById('birthDate').value;
    if (age === '') {
        alert('Введіть вік дитини коректно!');
    }
}

/**
 * 
 * @param {string} dateOfBirth дата народження у форматі 'YYYY-MM-DD'
 * @returns {number} вік у місяцях
 */
function calcPreciseAgeInMonths(dateOfBirth) {
    const current = new Date();
    const birth = new Date(dateOfBirth);
    let currentMonth = current.getMonth();
    let yearsAge = current.getFullYear() - birth.getFullYear();
    let monthAge = currentMonth - birth.getMonth();

    function checkFebr28() {
        return ((currentMonth == 1) && (current.getDate() == 29 || current.getDate() == 28) && (birth.getDate() >= 28))
    }

    function checkDate31() {
        return ((birth.getDate() == 31) && (current.getDate() == 30) && (currentMonth == 3 || currentMonth == 5 || currentMonth == 8 || currentMonth == 10))
    }

    if (((current.getDate() - birth.getDate()) < 0) && !(checkFebr28() || checkDate31())) {
        month--;
    }

    if (monthAge < 0) {
        yearsAge -= 1;
        monthAge = 12 + month;
    }

    return yearsAge * 12 + monthAge;

}
//ETALONE Vaccination case + calculate ETALONE methods//
let etaloneVac = {
    adp: [
        [2, 'АКДП'],
        [4, 'АКДП'],
        [6, 'АКДП'],
        [18, 'АКДП'],
        [72, 'АДП'],
        192, 312, 432, 552, 672, 792, 912, 1032, 1152
    ],

    hepB: [0, 2, 6],

    iopv: [
        [2, 'ІПВ'],
        [4, 'ІПВ'],
        [6, 'ОПВ'],
        [18, 'ОПВ'],
        [72, 'ОПВ'],
        [168, 'ОПВ']
    ],

    hib: [2, 4, 12],

    kpk: [12, 72],



    /**
     * Визначаємо скільки щеплень має бути згідно віку для кожної вакцини окремо
     * 
     * @param {number} age - вік в місяцях
     * @param {array} vac - масив щеплень
     * @returns {number} -кількість щепленнь 1 вакцини
     */

    calcSingleVac(age, vac) {

        for (let i = 0; i < vac.length; i++) {
            if (age < (vac[i][0] || vac[i])) {
                return i;
            }
        }
        return vac.length;
    },

    /**
     * Визначаемо  кількість необхідних щеплень згідно віку для всіх вакцин
     * 
     * @param {number} age -вік в місяцях
     * @returns {array} - масив щеплень [АДП, І/ОПВ, ГепВ, Нів, КПК]
     */

    calcTotalVac(age) {
        let total = [];
        total.push(this.calcSingleVac(age, this.adp));
        total.push(this.calcSingleVac(age, this.iopv));
        total.push(this.calcSingleVac(age, this.hepB));
        total.push(this.calcSingleVac(age, this.hib));
        total.push(this.calcSingleVac(age, this.kpk));
        return total;
    },
}


function addNametoVaccines_test(total) {

    return ['дифтерії, правця, кашлюка', 'поліомієліту', 'гепатиту В', 'гeмофільної палички', 'кору, паротиту, краснухи'].concat(total)

}

// LAUNCH CODE HERE//
function launchCalculator() {
    let ageMonth = calcPreciseAgeInMonths(age);
    let totalVaccines = etaloneVac.calcTotalVac(ageMonth);
    let toBeShown = addNametoVaccines_test(totalVaccines);

    function addElement(vacNameAndQuant, index) {
        let newVac = document.createElement('div');
        let tempInsert = document.getElementById('bottomResult');
        newVac.innerHTML = `<p>${vacNameAndQuant[index]}</p><p>${vacNameAndQuant[(5+index)]}</p>`;
        let parent = document.getElementById('vacResults');
        parent.insertBefore(newVac, tempInsert);
    }
    for (let i = 0; i < totalVaccines.length; i++) {
        addElement(toBeShown, i);
    }
}