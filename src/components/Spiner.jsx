const Spiner = ({top}) => { 
  return (
    <div className='loading-wrapper'>
      <span 
        className={`loader ${top ? 'loader-top' : ''}`}
      ></span>
    </div>
  );
}
export default Spiner