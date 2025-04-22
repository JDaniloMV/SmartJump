import { useEffect, useState } from "react";
import axios from "axios";

const Policy = () => {
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    axios.get("/api/politica/")
      .then(res => setPolicy(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!policy) return <p>Carregando política de privacidade...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Política de Privacidade</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Proteção de Dados</h2>
        <p className="text-gray-700 whitespace-pre-line">{policy.data_protection}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Cancelamento e Reembolso</h2>
        <p className="text-gray-700 whitespace-pre-line">{policy.refund_policy}</p>
      </section>
    </div>
  );
};

export default Policy;