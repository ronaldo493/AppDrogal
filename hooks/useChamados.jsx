import { useEffect, useState } from "react";
import { useStrapiContext } from "../context/StrapiContext";
import strapiClient from "../services/StrapiClient";
import usePagination from "./usePagination";
import { useAuthContext } from "../context/AuthContext";

const useChamados = () => {
  const conexao = strapiClient();
  const suporteStrapi = useStrapiContext();
  const authStrapi = useAuthContext();

  const { chamados, setChamados } = suporteStrapi;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const pageSize = 100;
  const { currentPage, nextPage, setDataMeta, hasMore } = usePagination(1, "paginationChamados")

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
          filters: {
            $or: [
              { nomeresponsavel: { $eq: authStrapi.user.username } }, //Igual ao username
              { nomeresponsavel: { $eq: '' } }, //Campo vazio
              { nomeresponsavel: { $null: true } }, //Campo nulo
            ],
          },
        },
      });
  
      const { data: responseData, meta } = response.data;

      setDataMeta(meta)

     
      
      nextPage();

      setChamados((prevChamados) =>  [...prevChamados, ...responseData]);
  
    } catch (err) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {   
    if(hasMore) {
      getChamados();
    }
  }, [currentPage, hasMore]);


  return {
    chamados,
    error,
    loading,
  };
};

export default useChamados;
