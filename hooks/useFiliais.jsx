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

  const pageSize = 100;
  const { currentPage, nextPage, setDataMeta } = usePagination(1, "paginationFiliais")

  //Função para buscar as filiais com paginação
  const fetchFiliais = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await conexao.get('/informacoeslojas', {
        params: {
          pagination: {
            page: currentPage,
            pageSize,
          },
        },
      });
  
      const { data: responseData, meta } = response.data;

      setDataMeta(meta)
      
      nextPage();

      setFiliais((prevFiliais) =>  [...prevFiliais, ...responseData]);
  
    } catch (err) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {   
      fetchFiliais();
  }, [currentPage]);


  return {
    filiais,
    error,
    loading,
  };
};

export default useFiliais;
