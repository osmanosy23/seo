import useFirestore from "../hooks/useFirestore";
import getUnsplashImages from "../unsplash";
import { useState } from "react";

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore('images');
  // console.log(docs)
  const [randomImage, setRandomImage] = useState(null);

  if (isLoading) {
    return (
      <div className='text-center mt-10'>
        <progress className="progress w-56"></progress>
      </div>
    )
  }
  const handleRandomImageClick = async () => {
    try {
      const randomImages = await getUnsplashImages();
      setRandomImage(randomImages);
    } catch (error) {
      console.error('Error fetching random images:', error);
    }
  };




  return (
    <div>
      <div className='grid md:grid-cols-3 justify-center gap-4 mt-10'>
        {images.map((image) => (
          <div
            key={image.imageUrl}
            className="card card-compact w-full bg-base-100 shadow-xl">
            <figure className='max-h-[15rem]'>
              <img src={image.imageUrl} alt="Picture Loading" />
            </figure>


            <div className="card-body">
              <p>Upload by: {image.userEmail}</p>
              <span>Created on: {image.createdAt.toLocaleDateString()}</span>

            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button className="btn btn-primary" onClick={handleRandomImageClick}>
          Get Random Images
        </button>
      </div>

      {randomImage && randomImage.length > 0 && (
        <div className="mt-8">
          <h2>Random Images</h2>
          {randomImage.map((image) => (
            <div key={image.id}>
              <img src={image.urls?.regular} alt="Random Image" />
              <p>By: {image.user?.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>)
}
export default ImageGallery;