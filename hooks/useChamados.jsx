import { useEffect, useState } from "react";
import { useStrapiContext } from "../context/StrapiContext";
import strapiClient from "../services/StrapiClient";
import usePagination from "./usePagination";

const useChamados = () => {
  const conexao = strapiClient();
  const suporteStrapi = useStrapiContext();

  const { chamados, setChamados } = suporteStrapi;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const pageSize = 100;
  const { currentPage, nextPage, setDataMeta } = usePagination(1, "paginationChamados")

  //Função para buscar as filiais com paginação
  const getChamados = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await conexao.get('/chamados', {
        params: {
          pagination: {
            page: currentPage,
            pageSize,
          },
        },
      });
  
      const { data: responseData, meta } = response.data;

      setDataMeta(meta)

      console.log(responseData)
      
      nextPage();

      setChamados((prevChamados) =>  [...prevChamados, ...responseData]);
  
    } catch (err) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {   
    if(chamados.length === 0) {
      getChamados();
    }
  }, [currentPage]);


  return {
    chamados,
    error,
    loading,
  };
};

export default useChamados;
