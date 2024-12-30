import { useState, useEffect, useCallback } from "react";
import { useStrapiFiliais } from "../components/FiliaisContext";
import { fetchPaginatedData } from "../services/Pagination";

const useFiliais = () => {
    
    const suporteStrapi = useStrapiFiliais();

    const { filiais, setFiliais } = suporteStrapi;

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
    
        try {
          const data = await fetchPaginatedData('/informacoeslojas');

          setFiliais(data);
    
          console.log("Todos os dados das filiais salvos no estado:");
          data.forEach(filial => {
            console.log(filial.codigofilial);  //Exibe o código
          });
        } catch (err) {
            console.error("Erro ao buscar filiais:", err);
            setError(err.message || "Erro desconhecido");
        } finally {
          setLoading(false);
        }
      }, [setFiliais]);

    useEffect(() => {
        refetch();
    }, []);

    return { filiais, error, loading, refetch }
}

export default useFiliais;