const UploadForm = () => {
  return <div className="text-center mt-10">
    <forrm className="flex items-center flex-col gap-8">
      <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
      <button className='btn gap-3'>
        Upload<span>🚀</span>
      </button>
    </forrm>
  </div>
};

export default UploadForm;