import strapiClient from "./StrapiClient";

export const fetchPaginatedData = async (endpoint, pageSize = 100) => {

    let allData = [];

    let page = 1;
    let hasMore = true;
  
    const connection = strapiClient();
        
    while (hasMore) {

      const response = await connection.get(endpoint, {
        params: {
          pagination: {
            page,
            pageSize,
          },
        },
      });

      const { data, meta } = response.data;

      allData = [...allData, ...data];

      hasMore = meta.pagination.page < meta.pagination.pageCount;

      page += 1;

    }

    return allData;

  };