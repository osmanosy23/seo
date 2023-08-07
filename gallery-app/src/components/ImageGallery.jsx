import useFirestore from "../hooks/useFirestore";
import getUnsplashImages from "../unsplash";
import { useState, useEffect, useRef } from "react";

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore('images');
  // console.log(docs)
  const [randomImage, setRandomImage] = useState(null);
  const lastImageRef = useRef(null); // Create a ref for the last image element

  const formatUsername = (email) => {
    const formattedUsername = email.split('@')[0];
    return formattedUsername;
  };

  useEffect(() => {
    // Set up the Intersection Observer
    const observer = new IntersectionObserver(
      handleObserverCallback,
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );

    if (lastImageRef.current) {
      observer.observe(lastImageRef.current);
    }

    return () => {
      // Clean up the Intersection Observer when component unmounts
      if (lastImageRef.current) {
        observer.unobserve(lastImageRef.current);
      }
    };
  }, [randomImage]);

  const handleObserverCallback = async (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      // When the last image comes into view, load more random images
      try {
        const randomImages = await getUnsplashImages();
        setRandomImage((prevRandomImage) => [...prevRandomImage, ...randomImages]);
      } catch (error) {
        console.error('Error fetching random images:', error);
      }
    }
  };

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
      <h2 className="text-4xl text-center" style={{margin: '20px 0'}}>User Images</h2>
      <div className='grid md:grid-cols-3 justify-center gap-4 mt-10'>
        {images.map((image) => (
          <div
            key={image.imageUrl}
            className="card card-compact w-full bg-base-100 shadow-xl">
            <figure className='max-h-[15rem]'>
              <img src={image.imageUrl} alt="Picture Loading" />
            </figure>


            <div className="card-body">
              <p>Author: {formatUsername(image.userEmail)}</p>
              <span>Posted on: {image.createdAt.toLocaleDateString()}</span>

            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <button className="btn btn-primary" onClick={handleRandomImageClick}>
          Get Random Images!
        </button>
      </div>

      {randomImage && randomImage.length > 0 && (
                <div className="mt-8">
          <h2 className="text-4xl text-center">Random Images</h2>
          <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
          {randomImage.map((image, index) => (
            <div key={image.id} ref={index === randomImage.length - 1 ? lastImageRef : null} style={{ margin: '10px 0' }}>
              <div className="card card-compact bg-base-100 shadow-xl">
                <figure className='max-h-[15rem]'>
              <img src={image.urls?.regular} alt="Random Image" className="random-image" style={{ maxWidth: '300px' }}/>
              </figure>
              <div className="card-body">
              <p style={{ fontSize: '18px', margin: '10px 0' }}> {image.user?.name}</p>
              {/* // removed "by" from above */}
              </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>)
}
export default ImageGallery;