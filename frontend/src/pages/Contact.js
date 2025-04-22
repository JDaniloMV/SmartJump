import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import { motion } from 'framer-motion';

const Contact = () => {
  const [info, setInfo] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get('/api/contato/info/'),
      axios.get('/api/contato/redes/')
    ])
      .then(([res1, res2]) => {
        setInfo(res1.data[0]);
        setSocialLinks(res2.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar dados de contato", err);
        setLoading(false);
      });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome obrigatório';
    if (!formData.email.trim()) newErrors.email = 'E-mail obrigatório';
    if (!formData.message.trim()) newErrors.message = 'Mensagem obrigatória';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await axios.post('/api/contato/mensagem/', formData);
      setFeedback({ type: 'success', message: 'Mensagem enviada com sucesso!' });
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      setFeedback({ type: 'error', message: 'Erro ao enviar a mensagem.' });
    }

    setTimeout(() => setFeedback(null), 4000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <motion.div
      className="px-6 py-10 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8">Fale Conosco</h1>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Informações de contato */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-5 bg-gray-300 rounded w-3/4" />
            <div className="h-5 bg-gray-300 rounded w-1/2" />
            <div className="h-5 bg-gray-300 rounded w-2/3" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        ) : info && (
          <motion.div
            className="space-y-4 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              <span>{info.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-600" />
              <InputMask
                value={info.phone}
                mask="(99) 99999-9999"
                disabled
                className="bg-transparent outline-none"
              />
            </div>
            {info.address && (
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-blue-600 mt-1" />
                <span>{info.address}</span>
              </div>
            )}
            {info.map_embed_url && (
              <div className="mt-4">
                <iframe
                  src={info.map_embed_url}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Localização"
                  className="rounded"
                ></iframe>
              </div>
            )}
          </motion.div>
        )}

        {/* Formulário de contato */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <input
              type="text"
              placeholder="Seu nome"
              className={`w-full border rounded p-2 ${errors.name ? 'border-red-500' : ''}`}
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Seu e-mail"
              className={`w-full border rounded p-2 ${errors.email ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea
              placeholder="Sua mensagem"
              rows="5"
              className={`w-full border rounded p-2 ${errors.message ? 'border-red-500' : ''}`}
              value={formData.message}
              onChange={e => handleChange('message', e.target.value)}
            />
            {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enviar Mensagem
          </button>
          {feedback && (
            <motion.div
              className={`mt-4 p-3 rounded ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {feedback.message}
            </motion.div>
          )}
        </motion.form>
      </div>

      {/* Redes sociais */}
      {!loading && (
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Siga-nos nas redes sociais</h2>
          <div className="flex flex-col gap-4">
            {socialLinks.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <i className={`${link.icon_class} text-xl`}></i>
                <span className="capitalize">{link.platform}</span>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Contact;
