import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import './Form.css';
//import axios from "axios";

const installMents = [
  {
    value: 1,
    text: 'Contado',
  },
  {
    value: 3,
    text: 'Tres cuotas',
  },
  {
    value: 6,
    text: 'Seis cuotas',
  },
  {
    value: 10,
    text: 'Diez cuotas',
  },
  {
    value: 12,
    text: 'Doce cuotas',
  },
  {
    value: 18,
    text: 'Dieciocho cuotas',
  },
  {
    value: 24,
    text: 'Veinticuatro cuotas',
  },
];

export const AccountSetup = (props) => {
  const { values, inputChange, total, nextStep } = props;

  const [errors, setErrors] = useState({});

  const continueStep = (e) => {
    e.preventDefault();
    const newValues = { ...values };
    delete newValues.cuotas;

    if (
      Object.entries(newValues)
        .map((i) => i[1])
        .filter((i) => !i).length === 0 &&
      Object.keys(errors).length === 0
    ) {
      nextStep();
    } else {
      const errorData = {};
      if (!values.cardname) {
        errorData.name = 'This field is required';
      }
      if (!values.cardnumber) {
        errorData.number = 'This field is required';
      }
      if (!values.codigo) {
        errorData.codigo = 'This field is required';
      }
      if (!values.date) {
        errorData.date = 'This field is required';
      }

      if (Object.keys(errorData).length > 0) {
        setErrors(errorData);
      }
    }
  };

  const cardNameChangeHandler = (e) => {
    const value = e.target.value;

    inputChange('cardname', value);

    if (!value) {
      setErrors((p) => ({ ...p, name: 'This field is required' }));
      return;
    }

    setErrors((p) => {
      const newPrevProps = { ...p };
      delete newPrevProps.name;
      return {
        ...newPrevProps,
      };
    });
  };
  const cardNumberChangeHandler = (e) => {
    const value = e.target.value;

    inputChange('cardnumber', value);

    if (isNaN(value)) {
      setErrors((p) => ({ ...p, number: 'This must be number' }));
      return;
    }

    if (value.length >= 19) {
      setErrors((p) => ({
        ...p,
        number: 'This must not be greater than 19 chars',
      }));
      return;
    }
    setErrors((p) => {
      const newPrevProps = { ...p };
      delete newPrevProps.number;
      return {
        ...newPrevProps,
      };
    });
  };
  const cardCodigoChangeHandler = (e) => {
    const value = e.target.value;

    inputChange('codigo', value);

    if (isNaN(value)) {
      setErrors((p) => ({ ...p, codigo: 'This must be number' }));
      return;
    }
    if (value.length >= 4) {
      setErrors((p) => ({
        ...p,
        codigo: 'This must not be greater than 4 chars',
      }));
      return;
    }
    setErrors((p) => {
      const newPrevProps = { ...p };
      delete newPrevProps.codigo;
      return {
        ...newPrevProps,
      };
    });
  };
  const cardDateChangeHandler = (e) => {
    const value = e.target.value;

    inputChange('date', value);
    if (!value) {
      setErrors((p) => ({
        ...p,
        date: 'This field is required',
      }));
      return;
    }
    if (!value.includes('/') || value.length !== 5) {
      setErrors((p) => ({
        ...p,
        date: 'Invalid date! Please formate your date',
      }));
      return;
    }

    const dateArray = value.split('/');
    const month = parseInt(dateArray[0]);
    const year = parseInt(dateArray[1]);

    if (isNaN(month) || isNaN(year) || month > 12) {
      setErrors((p) => ({
        ...p,
        date: 'Invalid date! Please formate your date',
      }));
      return;
    }

    setErrors((p) => {
      const newPrevProps = { ...p };
      delete newPrevProps.date;
      return {
        ...newPrevProps,
      };
    });
  };

  return (
    <div className='form-container'>
      <h3 className='mb-5 text-center'>Datos de Pago</h3>
      <div className='form.group'>
        <label htmlFor='cardname'>Nombre del titular de la tarjeta</label>
        <input
          type='text'
          className='form-control'
          name='cardname'
          onChange={cardNameChangeHandler}
          value={values.cardname}
        />
        {errors?.name && <ErrorMessage>{errors?.name}</ErrorMessage>}
      </div>
      <div className='form.group'>
        <label htmlFor='cardnumber'>Número de Tarjeta</label>
        <input
          type='number'
          className='form-control'
          name='cardnumber'
          onChange={cardNumberChangeHandler}
          value={values.cardnumber}
        />
        {errors?.number && <ErrorMessage>{errors?.number}</ErrorMessage>}
      </div>
      <div className='form.group'>
        <label htmlFor='codigo'>Código de Seguridad (CVV)</label>
        <input
          type='number'
          className='form-control'
          name='codigo'
          onChange={cardCodigoChangeHandler}
          value={values.codigo}
        />
        {errors?.codigo && <ErrorMessage>{errors?.codigo}</ErrorMessage>}
      </div>
      <div className='form.group'>
        <label htmlFor='date'>Fecha de Expiración</label>
        <input
          type='text'
          className='form-control'
          name='date'
          placeholder='mm/yy'
          onChange={cardDateChangeHandler}
          value={values.date}
        />
        {errors?.date && <ErrorMessage>{errors?.date}</ErrorMessage>}
      </div>
      <div className='form.group'>
        <label htmlFor='date'>
          Elige tu cantidad de cuotas para pagar tus artículos
        </label>
        <select
          class='form-select'
          value={values.cuotas}
          aria-label='Default select example'
          onChange={(e) => inputChange('cuotas', e.target.value)}
        >
          {total > 1000 ? (
            installMents.map((item) => (
              <option value={item.value} key={Math.random()}>
                {item.text}
              </option>
            ))
          ) : (
            <option value='1'>Contado</option>
          )}
        </select>
      </div>

      <br />
      <div className='text-right'>
        <button className='bTnProperty' onClick={continueStep}>
          Continuar
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const total = state.cart.total;
  return { total };
};
export default connect(mapStateToProps)(AccountSetup);

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
`;
