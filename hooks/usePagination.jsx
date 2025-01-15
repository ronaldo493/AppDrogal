import { useState, useEffect } from "react";

const usePagination = (initialPage = 1, context = "default") => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true); 
  const [dataMeta, setDataMeta] = useState();


  //Função para avançar para a próxima página
  const nextPage = () => {
    if (currentPage >= dataMeta?.pagination?.pageCount) {
      setHasMore(false)
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };


  //Função para voltar para a página anterior
  const prevPage = async () => {
    if (currentPage <= 1) return;
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
  };

  return {
    currentPage,
    nextPage,
    prevPage,
    hasMore,
    setHasMore,
    setDataMeta,
    dataMeta,
  };
};

export default usePagination;
