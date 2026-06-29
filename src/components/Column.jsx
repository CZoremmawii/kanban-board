import { useState } from 'react';
import Card from './Card';

function Column({ column, allColumns, onAddCard, onDeleteCard, onMoveCard, onUpdateCard}){
  const [inputValue, setInputValue] = useState('');

  function handleAdd() {
    if (inputValue.trim() === '') return;
    onAddCard(column.id, inputValue.trim());
    setInputValue('');
  }

  const otherColumns = allColumns.filter(col => col.id !== column.id);

  return (
    <div style={{
     background: '#fff0f5',
     borderRadius: '20px',
     padding: '16px',
     width: '100%',
     maxWidth: '320px',
     minWidth: '260px',
     minHeight: '400px',
     border: '2px solid #ffb6d9',
     boxShadow: '0 4px 15px rgba(255, 105, 180, 0.15)',
     flex: '1 1 260px',
    }}>

      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '22px' }}>🎀</span>
        <h3 style={{
          margin: '4px 0 0',
          color: '#d63384',
          fontSize: '15px',
          fontWeight: '700',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          {column.title}
        </h3>
        <div style={{ height: '2px', background: 'linear-gradient(to right, #ffb6d9, #ff69b4, #ffb6d9)', borderRadius: '2px', marginTop: '8px' }} />
      </div>

      {column.cards.map(card => (
        <Card
          key={card.id}
          card={card}
          otherColumns={otherColumns}
          onDelete={() => onDeleteCard(column.id, card.id)}
          onMove={(toColumnId) => onMoveCard(column.id, toColumnId, card.id)}
          onUpdate={(updates) => onUpdateCard(card.id, updates)}
        />
      ))}

      <div style={{ marginTop: '12px', display: 'flex', gap: '6px' }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="✨ Add a card..."
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '20px',
            border: '1.5px solid #ffb6d9',
            background: '#fff',
            color: '#c2185b',
            outline: 'none',
            fontSize: '13px',
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: '8px 14px',
            borderRadius: '20px',
            border: 'none',
            background: '#ff69b4',
            color: 'white',
            cursor: 'pointer',
            fontSize: '18px',
            lineHeight: 1,
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Column;