import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('content-Type', 'application/octet-stream');
      headers.set('charset', 'utf8');
      headers.set('X-RapidAPI-Key', rapidApiKey);
      headers.set(
        'X-RapidAPI-Host',
        'article-extractor-and-summarizer.p.rapidapi.com'
      );

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      // encodeURIComponent() função para os caracteres especiais que possam estar nos valores dos parametros para evitar erros no servidor ou comportamentos inesperados
      query: (params) =>
        `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
    })
  })
});

export const { useLazyGetSummaryQuery } = articleApi;
