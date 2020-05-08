/////////////////ETALONE/////////////////
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
     * Визначаємо скільки щеплень має бути згідно віку
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
     * Визначаемо загальну кількість необхідних щеплень згідно віку
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


function testShowTotalVac(total) {
    return `ADP-${total[0]} OPV-${total[1]} HepB-${total[2]} Hib-${total[3]}, KPK-${total[4]} `
}
//let testX = etaloneVAc.calcTotalVac(50);


////////////input//////////////


// !!! test!!! //
function testGetUserInfo() {
    let userinfo = [];
    userinfo.push('john Doe');
    userinfo.push(+prompt('Age Month'));
    userinfo.push(+prompt('ADP?'));
    userinfo.push(+prompt('OPV?'));
    userinfo.push(+prompt('HEP B?'));
    userinfo.push(+prompt('Hib?'));
    userinfo.push(+prompt('KPK?'));
    return userinfo;
}

function CreateUser(user) {

    this.name = user[0];
    this.age = user[1];
    this.adp = user[2];
    this.iopv = user[3];
    this.hepB = user[4];
    this.hib = user[5];
    this.kpk = user[6];
    this.total = user.slice(2);
}
let x = testGetUserInfo();

let newuser = new CreateUser(x);


////////// compare //////////////
function compareToEtalone(user, etalone = etaloneVac) {
    let age = user.age;
    etalone = etalone.calcTotalVac(age);
    let result = [];
    for (let i = 0; i < etalone.length; i++) {
        result.push(etalone[i] - user.total[i])
    }
    return result;
}
// !!! test !!!//
let result = compareToEtalone(newuser);
console.log(testShowTotalVac(result));