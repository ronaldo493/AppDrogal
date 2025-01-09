import { useEffect, useState } from "react";
import { useStrapiContext } from "../context/StrapiContext";
import strapiClient from "../services/StrapiClient";
import usePagination from "./usePagination";

const useFiliais = () => {
  const conexao = strapiClient();
  const suporteStrapi = useStrapiContext();

  const { filiais, setFiliais } = suporteStrapi;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const pageSize = 100; //Número de itens por página
  
  //hook de paginação
  const { currentPage, nextPage, prevPage, hasMore } = usePagination(1, fetchFiliais);

  //Função para buscar as filiais com paginação
  const fetchFiliais = async (page) => {
    setLoading(true);
    setError(null);

    try {
      //Realiza a requisição para o Strapi
      const response = await conexao.get('/informacoeslojas', {
        params: {
          pagination: {
            page,
            pageSize,
          },
        },
      });

      const { data: responseData, meta } = response.data;

      setFiliais((prevFiliais) => [...prevFiliais, ...responseData]);

      //Se a resposta retornar menos que o pageSize, significa que não há mais dados
      if (responseData.length < pageSize) {
        return { hasMore: false };
      }

      return { hasMore: meta.pagination.page < meta.pagination.pageCount };
    } catch (err) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadAllPages = async () => {
      let page = 1;
      let hasMorePages = true;

      //Continua requisitando até que não haja mais páginas
      while (hasMorePages) {
        const { hasMore: more } = await fetchFiliais(page);
        hasMorePages = more;
        page += 1;
      }
    };

    //Inicia a busca assim que o componente for montado
    if (filiais.length === 0) {
      loadAllPages();
    }
  }, [filiais]);


  return {
    filiais,
    error,
    loading,
    nextPage,
    prevPage,
    hasMore,
  };
};

export default useFiliais;
