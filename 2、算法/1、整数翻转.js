/*  
  输入：123
  输出：321

  输入：-123
  输出：-321

  输入：120
  输出：21
*/
/* 
  思路1：
    num转化为字符串
    判断正负，如果是负数，对符号进行删减
    字符串翻转
    把字符串转化成num，加上正负号
    


  思路二：
    使用数学方法来进行计算
    分别拿到个位、十位、百位的数字
    然后在让各位+十位+百位，从而形成翻转
*/

/* const reverse = function (s) {
	let result = "";
	let str = s.toString();
	str = str > 0 ? str : str.slice(1);
	// 让str倒叙,可以使用for循环,倒着进行遍历，这样得到的结果就是
	for (var i = str.length - 1; i >= 0; i--) {
		result += str[i];
	}
	//把得到的字符串转化成num,在加上正负
	return s < 0 ? -result : +result;
}; */

/*
  第二种方法的具体解析思路
    第一次
      r 3
      result 3 --> 0 * 10 + 3
      s 12

    第二次
      r 2
      result 32  --> 3 * 10 + 2
      s 1
    
    第三次
      r 1
      result 321  --> 32 * 10 + 1
      s 0
  */
const reverse = function (s) {
	var result = 0;
	while (s) {
		// 得到最后一位
		const r = s % 10;
		result = result * 10 + r;
		s = (s - r) / 10;
	}
	return result;
};
console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(120));
