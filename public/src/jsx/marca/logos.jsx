function LogoBanner(params) {
  params.width ??= 160;
  params.href ??= "/";
  return LOAD_IMG_SZS({
    szs: [1024],
    src: (sz) => `/src/img/logo/texto/v4-w=${sz}.png`,
    ...params,
  });
}
function Logo404(params) {
  return LOAD_IMG_SZS({
    szs: [512, 1024],
    src: (sz) => `/src/img/logo/states/404-w=${sz}.png`,
    ...params,
  });
}

function LOAD_IMG_SZS(params) {
  const p = { ...params };
  delete p.src;
  delete p.szs;
  delete p.width;
  delete p.href;

  const { src, szs, width = 300, href } = params;
  const sz = szs
    .sort()
    .reverse()
    .find((w) => width <= w);
  const img = <img src={src(sz)} width={`${width}px`} {...p} />;
  if (href) {
    return <a href={href}>{img}</a>;
  }
  return img;
}
