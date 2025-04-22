import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blog = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('/api/blog/')
      .then(response => setArticles(response.data))
      .catch(error => console.error('Erro ao buscar artigos:', error));
  }, []);

  const grouped = articles.reduce((acc, post) => {
    acc[post.category] = acc[post.category] || [];
    acc[post.category].push(post);
    return acc;
  }, {});

  const categoriasOrdem = [
    'Biomecânica da Corrida',
    'Dicas de Treinamento',
    'Estudos e Pesquisas',
    'Notícias sobre Produtos',
    'Vídeos',
  ];

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Blog Moove Lab</h1>

      {categoriasOrdem.map(cat => (
        grouped[cat]?.length > 0 && (
          <section key={cat} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{cat}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grouped[cat].map(post => (
                <div key={post.id} className="border rounded-xl p-4 shadow hover:shadow-md">
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{post.date}</p>
                  <p className="mb-4">{post.summary}</p>
                  {post.video_url ? (
                    <div className="aspect-video">
                      <iframe
                        src={post.video_url}
                        title={post.title}
                        className="w-full h-full rounded"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <a href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                      Ler mais
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
};

export default Blog;
