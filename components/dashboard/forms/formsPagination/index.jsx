import Btn from "./btn";

const Pagination = ({pagesCount,pageNumber,setPageNumber}) => {
  if (pagesCount == 1 || pagesCount == 0) {
    return <></>;
  } else if (pagesCount == 2) {
    return (
      <>
        <Btn num={1} setPageNumber={setPageNumber} pageNumber={pageNumber} />
        <Btn num={2} setPageNumber={setPageNumber} pageNumber={pageNumber} />
      </>
    );
  } else if (pagesCount == 3) {
    return (
      <>
        <Btn num={1} setPageNumber={setPageNumber} pageNumber={pageNumber} />
        <Btn num={2} setPageNumber={setPageNumber} pageNumber={pageNumber} />
        <Btn num={3} setPageNumber={setPageNumber} pageNumber={pageNumber} />
      </>
    );
  } else {
    return pageNumber > 1 ? (
      pagesCount > pageNumber ? (
        <>
          {
            pageNumber > 2 ? <Btn num={1} setPageNumber={setPageNumber} pageNumber={pageNumber} /> : <></>
          }
          <Btn
            num={pageNumber - 1}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
          />
          <Btn
            num={pageNumber}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
          />
          <Btn
            num={pageNumber + 1}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
          />
          {
            pagesCount - 1 > pageNumber ? <Btn num={pagesCount} setPageNumber={setPageNumber} pageNumber={pageNumber} /> : <></>
          }
        </>
      ) : (
        <>
          {
            pageNumber > 2 ? <Btn num={1} setPageNumber={setPageNumber} pageNumber={pageNumber} /> : <></>
          }
          <Btn
            num={pageNumber - 2}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
          />
          <Btn
            num={pageNumber - 1}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
          />
          <Btn
            num={pageNumber}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
          />
          {
            pagesCount - 1 > pageNumber ? <Btn num={pagesCount} setPageNumber={setPageNumber} pageNumber={pageNumber} /> : <></>
          }
        </>
      )
    ) : (
      <>
        <Btn num={1} setPageNumber={setPageNumber} pageNumber={pageNumber} />
        <Btn num={2} setPageNumber={setPageNumber} pageNumber={pageNumber} />
        <Btn num={3} setPageNumber={setPageNumber} pageNumber={pageNumber} />
        {
          pagesCount - 1 > pageNumber ? <Btn num={pagesCount} setPageNumber={setPageNumber} pageNumber={pageNumber} /> : <></>
        }
      </>
    );
  }
};

export default Pagination;
