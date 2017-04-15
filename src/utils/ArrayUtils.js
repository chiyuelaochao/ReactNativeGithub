/**
 * Created by Cai Wei on 4/15/2017.
 */
export default class ArrayUtils {
    static isEqual(a, b) {
        return JSON.stringify(a) == JSON.stringify(b);
    }

    static clone(a) {
        return a.map((item)=> {
            var obj = {};
            for (var p in item) {
                obj[p] = item[p];
            }
            return obj;
        });
    }
}

/*
 function isEqual(a, b) {
 return JSON.stringify(a) == JSON.stringify(b);
 }

 function clone(a) {
 return a.map((item)=> {
 let obj = [];
 for (let p in item) {
 obj[p] = item[p];
 }
 return obj;
 });
 }
 var a = [
 {name: 'Android', isChecked: true},
 {name: 'IOS', isChecked: false},
 {name: 'Java', isChecked: true},
 {name: 'React', isChecked: true},
 {name: 'JS', isChecked: true}
 ];
 var b = [
 {name: 'Android', isChecked: false},
 {name: 'IOS', isChecked: false},
 {name: 'Java', isChecked: true},
 {name: 'React', isChecked: true},
 {name: 'JS', isChecked: true}
 ];

 var c = clone(a);
 a[0].name = 'qqqqq';
 console.log(a);
 console.log(c);*/
