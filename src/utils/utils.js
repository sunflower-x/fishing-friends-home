import Taro from '@tarojs/taro';
import * as R from 'ramda';
import _ from './lodash';

export function escapeUndefined(object) {
  return Object.keys(object || {}).reduce((total, next) => {
    if (typeof object[next] !== 'undefined') {
      Object.assign(total, { [next]: object[next] });
    }
    return total;
  }, {});
}

export function escapeUndefinedOrNull(object, types = ['undefined', 'null']) {
  const includeUd = types.includes('undefined');
  const includeUn = types.includes('null');
  return Object.keys(object || {}).reduce((total, next) => {
    const value = object[next];
    if (!Array.isArray(types)) return Object.assign(total, { [next]: value });
    if (includeUd && typeof value === 'undefined') return total;
    if (includeUn && !value && typeof value != 'undefined' && value != 0) return total;
    return Object.assign(total, { [next]: value });
  }, {});
}

// 对象分割
export function objSplit(obj = {}, splitName = '') {
  return _.groupBy(
    Object.keys(obj).map((v) => {
      const [preKey, key, ...rest] = v.split(splitName);
      return { preKey, key, value: obj[v] };
    }),
    'preKey'
  );
}

// 数组过滤
export function arrToObjFilter(arr, filter, isReverse = false) {
  if (!filter) return arr;
  if (!arr || !arr.length) return arr;
  const filterKey = Object.keys(filter || {});
  return arr.filter((v) =>
    filterKey.every((item) => {
      if ((item || '').startsWith('no-')) {
        const itemName = (item || '').replace('no-', '');
        return reverseSure(!(_.get(filter, item) || '').includes(_.get(v, itemName)), isReverse);
      } else {
        return reverseSure((_.get(filter, item) || '').includes(_.get(v, item)), isReverse);
      }
    })
  );
}

// 反转
export const reverseSure = (value, isReverse) => (isReverse ? !value : value);

export const attributes = {
  input: 2,
  select: 3,
  date: 4,
  number: 5,
  switch: 6,
  dateTime: 14,
};

// 首字母大写
export const toUpperFirst = (str) => {
  if (typeof str != 'string') return str;
  return str.replace(/(\w)/, function (v) {
    return v.toUpperCase();
  });
};

// atom混入
export const transformByAtom = (item) => {
  return { ...item, ...R.path(['atom'], item) };
};

export const pcFormConfigTrans = (arr = []) => {
  return arr.map((v) => ({
    alias: v.label,
    attributeCode: v.key,
    attributeName: v.key,
    attributeContent: v.dataSource || '',
    attribute: attributes[v.type] || 2,
    isCheck: v.required ? 0 : 1,
    disabled: v.disabled,
    check: '1',
  }));
};
// htmlStr为获取到的图片数据，.webp格式

export const picType = (htmlStr) => {
  return new Promise((resolve, reject) => {
    if (!htmlStr.includes('.webp')) return resolve(htmlStr);
    Taro.getSystemInfo({
      success: (res) => {
        if (res.system.startsWith('iOS')) {
          const iosStr = htmlStr.replace(/\.webp/g, '.jpg');
          resolve(iosStr);
        } else {
          resolve(htmlStr);
        }
      },
      fail: (err) => reject(err),
    });
  });
};

export const dangerHtmlDeal = (str) => (str || '').replace(/\n/g, '<br/>').replaceAll(' ', '&nbsp;');

export const judgeFile = (fileName) => {
  // 后缀获取
  var suffix = '';
  // 获取类型结果
  try {
    var flieArr = fileName.split('.');
    suffix = flieArr[flieArr.length - 1];
  } catch (err) {
    suffix = '';
  }
  if (!suffix) return '';
  // 图片格式
  if (['png', 'jpg', 'jpeg', 'bmp', 'gif'].includes(suffix)) return 'image';
  // 匹配txt
  if (['txt'].includes(suffix)) return 'txt';
  // 匹配 excel
  if (['xls', 'xlsx'].includes(suffix)) return 'excel';
  // 匹配 word
  if (['doc', 'docx'].includes(suffix)) return 'word';
  // 匹配 pdf
  if (['pdf'].includes(suffix)) return 'pdf';
  // 匹配 ppt
  if (['ppt'].includes(suffix)) return 'ppt';
  // 匹配 视频
  if (['mp4', 'm2v', 'mkv'].includes(suffix)) return 'video';
  // 匹配 音频
  if (['mp3', 'wav', 'wmv'].includes(suffix)) return 'radio';
  // 其他 文件类型
  return 'other';
};

export const getFileIcon = (fileName) => {
  const fileType = judgeFile(fileName);

  const fileUrlObj = {
    image: 'https://img.dianplus.cn/vpc/1/1014284963706572801/jpg-2x_11.png',
    excel: 'https://img.dianplus.cn/vpc/1/1014284963706572801/excel-2x_25.png',
    word: 'https://img.dianplus.cn/vpc/1/1014284963706572801/word-2x_00.png',
    pdf: 'https://img.dianplus.cn/vpc/1/1014284963706572801/pdf-2x_90.png',
    ppt: 'https://img.dianplus.cn/vpc/1/1014284963706572801/ppt-2x_32.png',
    other: 'https://img.dianplus.cn/vpc/1/1014284963706572801/FILE-2x_62.png',
  };
  return {
    fileType,
    fileIcon: fileUrlObj[fileType] || fileUrlObj.other,
  };
};

export const formatFileSize = (fileSize) => {
  if (fileSize < 1024) {
    return fileSize + 'B';
  } else if (fileSize < 1024 * 1024) {
    var temp = fileSize / 1024;
    temp = temp.toFixed(2);
    return temp + 'KB';
  } else if (fileSize < 1024 * 1024 * 1024) {
    var temp = fileSize / (1024 * 1024);
    temp = temp.toFixed(2);
    return temp + 'MB';
  } else {
    var temp = fileSize / (1024 * 1024 * 1024);
    temp = temp.toFixed(2);
    return temp + 'GB';
  }
};
// js精确乘法
export const accMul = (arg1, arg2) => {
  let r1 = arg1.toString(),
    r2 = arg2.toString(),
    m = 0;
  try {
    m += arg1.toString().split('.')[1].length;
  } catch (e) {

  }
  try {
    m += arg2.toString().split('.')[1].length;
  } catch (e) {

  }
  return Number(r1.replace('.', '')) * Number(r2.replace('.', '')) / Math.pow(10, m);
}
// js精确除法
export const accDiv = (arg1, arg2) => {
  let r1,
    r2,
    t1 = 0,
    t2 = 0;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {

  }
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {

  }
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return accMul((r1 / r2), Math.pow(10, t2 - t1));
}
export const accAdd = (arg1, arg2) => {
  let r1;
  let r2;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
// js精确减法
export const accSub = (arg1, arg2) => {
  let r1;
  let r2;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = Math.pow(10, Math.max(r1, r2));
  const n = (r1 >= r2) ? r1 : r2;

  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
