const Btn = ({ num , setPageNumber , pageNumber }) => {
  return (
    <button
      onClick={() => setPageNumber(num)}
      className={
        num == pageNumber ?
        "w-9 h-9 bg-blue-600 text-white font-bold rounded-lg fa-num" :
        "w-9 h-9 bg-blue-200 text-blue-600 font-bold transition-all duration-300 hover:bg-blue-300 hover:shadow-lg rounded-lg fa-num"
      }
    >
      {num}
    </button>
  );
};

export default Btn;
