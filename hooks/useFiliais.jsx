import { useEffect, useState } from "react";
import { useStrapiContext } from "../context/StrapiContext";
import strapiClient from "../services/StrapiClient";

const useFiliais = () => {
  const conexao = strapiClient();
  const suporteStrapi = useStrapiContext();

  const { filiais, setFiliais } = suporteStrapi;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const pageSize = 100;

  //Função para buscar as filiais com paginação
  const getFiliais = async () => {
    setLoading(true);
    setError(null);
    let allFiliais = [];
    let totalPages = 1;
    let currentPage = 1;

    try {
      while (currentPage <= totalPages) {
        const response = await conexao.get('/informacoeslojas', {
          params: {
            pagination: {
              page: currentPage,
              pageSize,
            },
          },
        });

        const { data: responseData, meta } = response.data;

        allFiliais = [...allFiliais, ...responseData];
        totalPages = meta.pagination.pageCount;
        currentPage++;

      };

      setFiliais(allFiliais);
  
    } catch (err) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      getFiliais(); 
      console.log(filiais.map((filial) => filial.codigofilial))
  }, []);


  return {
    filiais,
    error,
    loading,
  };
};

export default useFiliais;
