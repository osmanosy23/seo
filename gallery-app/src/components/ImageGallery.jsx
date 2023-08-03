const ImageGallery = () => {
  return <div className='grid md:grid-cols-3 justify-center gap-4 mt-10'>
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure><img src="https://media.istockphoto.com/id/1347455404/photo/shot-of-an-unrecognizable-woman-spending-a-day-in-the-city.jpg?s=612x612&w=0&k=20&c=W3-QMPd9D-ok_upk94ooFtb3wnWUZW4Gu8dtYRH3fKI=" alt="Shoes" /></figure>
      <div className="card-body">
        <p>By:</p>
        <span>Created on:</span>
      </div>
    </div>
  </div>
};

export default ImageGallery;