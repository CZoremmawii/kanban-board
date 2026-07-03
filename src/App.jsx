import { useState, useEffect } from 'react';
import axios from 'axios';
import Column from './components/Column';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/columns')
      .then(res => {
        setColumns(res.data);
        setLoading(false);
      });
      .catch(()=>{
        setColumns([]);
        setLoading(false);
      })
  }, []);

  async function addCard(columnId, cardTitle) {
    const res = await axios.post('/cards', {
      column_id: columnId,
      title: cardTitle,
    });
    setColumns(columns.map(col => {
      if (col.id !== columnId) return col;
      return { ...col, cards: [...col.cards, res.data] };
    }));
  }

  async function deleteCard(columnId, cardId) {
    await axios.delete(`/cards/${cardId}`);
    setColumns(columns.map(col => {
      if (col.id !== columnId) return col;
      return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
    }));
  }

  async function moveCard(fromColumnId, toColumnId, cardId) {
    await axios.patch(`/cards/${cardId}/move`, {
      column_id: toColumnId,
    });
    const fromColumn = columns.find(col => col.id === fromColumnId);
    const card = fromColumn.cards.find(c => c.id === cardId);
    setColumns(columns.map(col => {
      if (col.id === fromColumnId) {
        return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
      }
      if (col.id === toColumnId) {
        return { ...col, cards: [...col.cards, card] };
      }
      return col;
    }));
  }

  async function updateCard(cardId, updates) {
    const res = await axios.patch(`/cards/${cardId}`, updates);
    setColumns(columns.map(col => ({
      ...col,
      cards: col.cards.map(c => c.id === cardId ? res.data : c),
    })));
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffe4f0, #ffd6e8)',
        fontSize: '24px',
      }}>
        🎀 Loading...
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      padding: '24px 16px',
      fontFamily: '"Segoe UI", sans-serif',
      background: 'linear-gradient(135deg, #ffe4f0, #ffd6e8)',
      minHeight: '100vh',
      justifyContent: 'center',
    }}>
      {columns.map(col => (
        <Column
          key={col.id}
          column={col}
          allColumns={columns}
          onAddCard={addCard}
          onDeleteCard={deleteCard}
          onMoveCard={moveCard}
          onUpdateCard={updateCard}
        />
      ))}
    </div>
  );
}

export default App;
