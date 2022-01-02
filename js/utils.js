// async, await 개별 에러 핸들링
export const handleError = (promise) => {
  return promise
    .then((data) => [undefined, data])
    .catch((error) => [error, undefined]);
};

// 에러 던지기
export const throwError = (txt) => {
  throw new Error(`${txt} 실패!`);
};

// 프로미스 반환
export const defaultPromise = new Promise((resolve, reject) => {
  resolve(true);
});
