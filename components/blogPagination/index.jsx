import Btn from "./btn";

const Pagination = (data) => {
  if (data.pagesCount == 1 || data.pagesCount == 0) {
    return <></>;
  } else if (data.pagesCount == 2) {
    return (
      <>
        <Btn {...data} num={1}/>
        <Btn {...data} num={2}/>
      </>
    );
  } else if (data.pagesCount == 3) {
    return (
      <>
        <Btn {...data} num={1}/>
        <Btn {...data} num={2}/>
        <Btn {...data} num={3}/>
      </>
    );
  } else {
    return data.pn > 1 ? (
      data.pagesCount > data.pn ? (
        <>
          {
            data.pn > 2 ? <Btn {...data} num={1}/> : <></>
          }
          <Btn
            num={data.pn - 1}
            {...data}
          />
          <Btn
            num={data.pn}
            {...data}
          />
          <Btn
            num={data.pn + 1}
            {...data}
          />
          {
            data.pagesCount - 1 > data.pn ? <Btn {...data} num={data.pagesCount}/> : <></>
          }
        </>
      ) : (
        <>
          {
            data.pn > 2 ? <Btn {...data} num={1}/> : <></>
          }
          <Btn 
            {...data} 
            num={data.pn - 2}
          />
          <Btn 
            {...data} 
            num={data.pn - 1}
          />
          <Btn 
            {...data} 
            num={data.pn}
          />
          {
            data.pagesCount - 1 > data.pn ? <Btn {...data} num={data.pagesCount}/> : <></>
          }
        </>
      )
    ) : (
      <>
        <Btn {...data} num={1}/>
        <Btn {...data} num={2}/>
        <Btn {...data} num={3}/>
        {
          data.pagesCount - 1 > data.pn ? <Btn {...data} num={data.pagesCount}/> : <></>
        }
      </>
    );
  }
};

export default Pagination;