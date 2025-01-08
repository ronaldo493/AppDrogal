import { useEffect, useState } from "react";
import { useStrapiContext } from "../context/StrapiContext";
import  usePagination  from "./usePagination";

const useFiliais = () => {
    const suporteStrapi = useStrapiContext();

    const { filiais, setFiliais } = suporteStrapi;

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const getFiliais = async () => {
        setLoading(true);
        setError(null);
    
        try {
          const data = await usePagination('/informacoeslojas');

          setFiliais(data);
    
        } catch (err) {
            setError(err.message || "Erro desconhecido");
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        //Verifica se o estado de filiais está vazio antes de buscar os dados
        if (filiais.length === 0) {
            getFiliais();
        }
    }, [filiais])

    return { filiais, error, loading }
}

export default useFiliais;