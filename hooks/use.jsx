import { useState } from "react";

const usePagination = (pageQuanty, refetch) => {
  const [currentPage, setCurrentPage] = useState(1);

  //Função para avançar para a próxima página
  const nextPage = async () => {
    const nextPage = currentPage + 1;
    if (nextPage <= pageQuanty) {  //Verifica se a próxima página é válida
      setCurrentPage(nextPage);
      await refetch(nextPage); //Passa a próxima página para o refetch
    }
  };

  //Função para voltar para a página anterior
  const prevPage = async () => {
    const previousPage = currentPage - 1;
    if (previousPage > 0) { //Verifica se a página anterior é válida
      setCurrentPage(previousPage);
      await refetch(previousPage);
    }
  };

  return {
    currentPage,
    nextPage,
    prevPage,
  };
};

export default usePagination;
