import config from 'config';
import cloudinary from 'cloudinary';
cloudinary.config(config.Cloudinary);

export const upload = (url) => (
  new Promise((resolve, reject) => {
    try {
      cloudinary.uploader.upload(url, (result) => {
        resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  })
);
