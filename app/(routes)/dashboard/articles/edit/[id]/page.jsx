"use client"
import React ,{useEffect} from 'react'
import GoBack from '@/components/GoBack';
import EditArticle from '@/components/EditArticle';
import { useUpdateArticle } from '@/hooks/useFetchArticles';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { useGetArticleById } from '@/hooks/useFetchArticles';
export default function page({params}) {
    const articleId = params.id;
    const { data, error, isLoading, getArticleById } = useGetArticleById();
    useEffect(() => {
      getArticleById(articleId);
      
    }, [articleId]);
    isLoading ? <Loading/>:null
    error ? <Error /> :null

  return (
    <div>
      <GoBack title="Edit Acticle"/>
      <EditArticle article={data} />
    </div>
  )
}
