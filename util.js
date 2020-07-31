/**
 * 版本号比较
 * @param {*} v1 
 * @param {*} v2 
 */
const versionCompare = (v1, v2) => {

    //versionCompare('1.2.1','1.1.1')
    //000100020001 000100010001

    var _v1 = toNum(v1), _v2 = toNum(v2);
    if (_v1 >= _v2) return true;
    if (_v1 < _v2) return false;

    function toNum(a) {
        var a = a.toString();
        var c = a.split('.');
        var num_place = ["", "0", "00", "000", "0000"], r = num_place.reverse();
        for (var i = 0; i < c.length; i++) {
            var len = c[i].length;
            c[i] = r[len] + c[i];
        }
        var res = c.join('');
        return res;
    }
}

export default {
    versionCompare: versionCompare,
};