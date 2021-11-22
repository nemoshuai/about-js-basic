const checkWebp = () => {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      resolve(image.width > 0 && image.height > 0);
    }
    image.onerror = () => {
      resolve(false);
    }
    image.src="data:image/webp;base64,UklGRrgAAABXRUJQVlA4WAoAAAAQAAAAKwEAlQAAQUxQSBIAAAABBxARERCQJP7/H0X0P+1/QwBWUDgggAAAAHANAJ0BKiwBlgA+bTaZSaQjIqEgKACADYlpbuF2sRtACewD32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99qwAAP7/1gAAAAAAAAAA";
  });
}

checkWebp().then(res => {
  console.log('支持webp', res);
});
