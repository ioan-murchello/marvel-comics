  const handleKeyDown = (e, id, index, cb) => {
    if (e.key === 'Enter' || e.key === ' ') {
      cb(id, index);
    }   
  };

  export default handleKeyDown

    //   handleSelectChar(id, index);

