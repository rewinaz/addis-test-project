export const debounce = function (cb: Function, delay: number) {
  let timer: any;
  return function () {
    // @ts-ignore
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(context, arguments);
    }, delay);
  };
};
