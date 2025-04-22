import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Store = () => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [upcomingProducts, setUpcomingProducts] = useState([]);
  const [interestForms, setInterestForms] = useState({});

  useEffect(() => {
    axios.get('/api/products/')
      .then(response => {
        const produtos = response.data;
        setAvailableProducts(produtos.filter(p => p.is_active));
        setUpcomingProducts(produtos.filter(p => !p.is_active));
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const handleChange = (productId, field, value) => {
    setInterestForms(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (productId) => {
    const formData = interestForms[productId];
    if (!formData?.name || !formData?.email) return alert("Preencha nome e e-mail!");

    try {
      await axios.post('/api/interesse/', {
        product: productId,
        name: formData.name,
        email: formData.email,
      });
      alert("Interesse cadastrado com sucesso!");
      setInterestForms(prev => ({ ...prev, [productId]: {} }));
    } catch (error) {
      alert("Erro ao enviar interesse.");
    }
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Loja Moove Lab</h1>

      {/* Produtos disponíveis para compra */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Adquira nossos produtos</h2>
        <p className="mb-6 text-gray-600">Pagamento via cartão, boleto ou Pix.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableProducts.map(product => (
            <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-md">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="mb-2">{product.description}</p>
              <p className="text-green-600 font-semibold mb-4">R$ {product.price}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Comprar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Produtos em pré-venda / desenvolvimento */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Produtos em desenvolvimento</h2>
        <p className="mb-6 text-gray-600">Cadastre-se para receber novidades.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingProducts.map(product => (
          <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="mb-4">{product.description}</p>

            {interestForms[product.id]?.showForm ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full p-2 border rounded"
                  value={interestForms[product.id]?.name || ""}
                  onChange={e => handleChange(product.id, 'name', e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full p-2 border rounded"
                  value={interestForms[product.id]?.email || ""}
                  onChange={e => handleChange(product.id, 'email', e.target.value)}
                />
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                  onClick={() => handleSubmit(product.id)}
                >
                  Cadastrar Interesse
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() =>
                  setInterestForms(prev => ({
                    ...prev,
                    [product.id]: { ...prev[product.id], showForm: true }
                  }))
                }
              >
                Tenho Interesse
              </button>
            )}
          </div>
        ))}
        </div>
      </section>
    </div>
  );
};

export default Store;
