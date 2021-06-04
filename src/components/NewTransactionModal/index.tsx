import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { api } from '../../services/api';

import { Container, TransactionTypeContainer, TransactionTypeButton } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const transaction = {
      title,
      value,
      type,
      category
    };

    api.post('/transactions', transaction);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" className="react-modal-close"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input 
          type="text" 
          placeholder="Título" 
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input 
          type="number" 
          placeholder="Valor" 
          value={value}
          onChange={event => setValue(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <TransactionTypeButton 
            type="button"
            isActive={type === 'deposit'}
            activeColor = 'green'
            onClick={() => setType('deposit')}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </TransactionTypeButton>

          <TransactionTypeButton 
            type="button"
            isActive={type === 'withdraw'}
            activeColor = 'red'
            onClick={() => setType('withdraw')}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </TransactionTypeButton>
        </TransactionTypeContainer>

        <input 
          type="text" 
          placeholder="Categoria" 
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}