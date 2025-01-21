import { useEffect, useState } from "react";

const usePagination = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true); 
  const [dataMeta, setDataMeta] = useState();


  //Função para avançar para a próxima página
  const nextPage = () => {
    if (currentPage >= dataMeta?.pagination?.pageCount) {
      setHasMore(false)
      return;
    }
    console.log("Antes de atualizar:", currentPage)
    setCurrentPage((prevPage) => prevPage + 1);
  };
  
// UseEffect para mostrar quando o estado atual foi atualizado
useEffect(() => {
  console.log("currentPage atualizado:", currentPage);  // Valor atualizado de currentPage
}, [currentPage]);

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
