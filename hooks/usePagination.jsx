import { useState } from "react";

const usePagination = (initialPage = 1, refetch) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true); 

  //Função para avançar para a próxima página
  const nextPage = async () => {
    if (!hasMore) return;
    const nextPage = currentPage + 1;
    const { hasMore: newHasMore } = await refetch(nextPage);

    //Se a resposta retornar menos que o pageSize, significa que não há mais dados
    setHasMore(newHasMore);
    setCurrentPage(nextPage);  //Atualiza a página atual
  };

  //Função para voltar para a página anterior
  const prevPage = async () => {
    if (currentPage <= 1) return;
    const previousPage = currentPage - 1;
    await refetch(previousPage);
    setCurrentPage(previousPage);
  };

  return {
    currentPage,
    nextPage,
    prevPage,
    hasMore,
  };
};

export default usePagination;
