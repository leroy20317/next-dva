export const isIOS = () => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  return ( isiOS );
};

export function isEmptyObject(e) {
  let t;
  for (t in e) {
    return !1;
  }
  return !0;
}

export function storageTest(storage) {
  if (storage) {
    try {
      storage.setItem('key', 'value');
      storage.removeItem('key');
      return true;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}

export function setCookie(key, value, day) {
  const Days = day || 30;
  const exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = `${key}=${encodeURI(value)};expires=${exp.toGMTString()};path=/`;
}

export function getCookie() {
  const allCookie = document.cookie;
  const cookiesArr = allCookie.split(';');
  const cookiesObj = {};
  for (let i = 0; i < cookiesArr.length; i++) {
    cookiesObj[cookiesArr[i].split('=')[0].replace(' ', '')] = cookiesArr[i].split('=')[1];
  }
  return cookiesObj;
}

export function get_Cookie(name) {
  let arr,
      reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  if (arr = document.cookie.match(reg)) {
    return ( arr[2] );
  } else {
    return null;
  }
}

export function delCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = get_Cookie(name);
  if (cval != null) {
    document.cookie = `${name}=${cval};expires=${exp.toGMTString()};path=/`;
  }
}

export function getScrollbarWidth() {
  if (
      document.body.scrollHeight <=
      ( window.innerHeight || document.documentElement.clientHeight )
  ) {
    return 0;
  } else {
    return 5;
  }
}
