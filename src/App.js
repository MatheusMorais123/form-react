

import React, { useState } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

const Form = styled.form`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  label {
    display: block;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    margin-bottom: 16px;
  }

  button {
    width: 100%;
    padding: 8px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Formulario = () => {
  const [cnpj, setCnpj] = useState('');
  const [cnpjFile, setCnpjFile] = useState(null);
  const [sigelFile, setSigelFile] = useState(null);
  const [sitaeFile, setSitaeFile] = useState(null);
  const [bolaoFile, setBolaoFile] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('cnpj', cnpj);
    formData.append('sigel', sigelFile);
    formData.append('sitae', sitaeFile);
    formData.append('bolao', bolaoFile);

    try {
      const response = await fetch('http://62.72.9.100:3000/envio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Envio bem-sucedido!');
        alert("Enviado com sucesso");
        // Faça algo após o envio bem-sucedido, como redirecionar ou exibir uma mensagem
      } else {
        console.error('Erro ao enviar dados.');
      }
      
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleChange = (event) => {
    // Remover qualquer caractere não numérico do CNPJ
    const cnpjValue = event.target.value.replace(/\D/g, '');

    // Adicionar a máscara ao CNPJ
    const cnpjWithMask = cnpjValue.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );

    setCnpj(cnpjWithMask);
  };


  return (
    <FormContainer>
      <Form onSubmit={handleFormSubmit}>
        <label htmlFor="cnpj">CNPJ:</label>
       {/*  <input
          type="text"
          id="cnpj"
          name="cnpj"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        /> */}
       <InputMask
          mask="99.999.999/9999-99"
          maskPlaceholder=""
          id="cnpj"
          name="cnpj"
          placeholder="Digite o CNPJ"
          value={cnpj}
          onChange={handleChange}
        />
        <label htmlFor="sigel">Sigel:</label>
        <input
          type="file"
          id="sigel"
          name="sigel"
          accept=".pdf"
          onChange={(e) => setSigelFile(e.target.files[0])}
        />

        <label htmlFor="sitae">Sitae:</label>
        <input
          type="file"
          id="sitae"
          name="sitae"
          accept=".pdf"
          onChange={(e) => setSitaeFile(e.target.files[0])}
        />

        <label htmlFor="bolao">Boloão:</label>
        <input
          type="file"
          id="bolao"
          name="bolao"
          accept=".pdf"
          onChange={(e) => setBolaoFile(e.target.files[0])}
        />

        <button type="submit">Enviar</button>
      </Form>
    </FormContainer>
  );
};

export default Formulario;
