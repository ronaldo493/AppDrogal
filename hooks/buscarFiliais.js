import { useState, useEffect, useCallback } from "react";
import { createApiClientStrapi } from "../services/StrapiClient";
import useStrapiFiliais from "../components/FiliaisContext";

const useFiliais = () => {
    const conexao = createApiClientStrapi();
    
    const suporteStrapi = useStrapiFiliais();

    const { filial, setFilial } = suporteStrapi;

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const refetch = useCallback(async () =>{
        setLoading(true);
        setError(null);

        try {
            const response = await conexao.get('/informacoeslojas');
            if (setFilial) {
                setFilial(response.data);
            } else {
                console.error("`setFilial` não está definido em `suporteStrapi`.");
            }
        } catch (err) {
            console.error("Erro ao buscar filiais:", err);
            setError(err.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    }, [conexao, setFilial]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { filial, error, loading, refetch }
}

export default useFiliais;