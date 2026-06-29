import { useState } from 'react';

function Card({ card, otherColumns, onDelete, onMove, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);

  function handleTitleSave() {
    if (editTitle.trim() === '') return;
    onUpdate({ title: editTitle.trim() });
    setIsEditing(false);
  }

  function getDueDateStyle() {
    if (!card.due_date) return null;
    const today = new Date();
    const due = new Date(card.due_date);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    if (due < today) return { color: '#e53935', fontWeight: '600' }; // overdue
    if ((due - today) <= 2 * 24 * 60 * 60 * 1000) return { color: '#f57c00' }; // due soon
    return { color: '#2e7d32' }; // upcoming
  }

  function formatDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  return (
    <div style={{
      background: 'white',
      padding: '10px 14px',
      borderRadius: '14px',
      marginBottom: '8px',
      border: '1.5px solid #ffd6e8',
      boxShadow: '0 2px 8px rgba(255, 105, 180, 0.1)',
    }}>

      {/* Title row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isEditing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleSave();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            onBlur={handleTitleSave}
            autoFocus
            style={{
              flex: 1,
              fontSize: '14px',
              color: '#ad1457',
              border: '1.5px solid #ff69b4',
              borderRadius: '8px',
              padding: '4px 8px',
              outline: 'none',
            }}
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            style={{ fontSize: '14px', color: '#ad1457', cursor: 'pointer', flex: 1 }}
            title="Click to edit"
          >
            🌸 {card.title}
          </span>
        )}

        <button
          onClick={onDelete}
          style={{
            background: '#ffe4f0',
            border: 'none',
            cursor: 'pointer',
            color: '#ff69b4',
            fontSize: '14px',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginLeft: '6px',
          }}
        >
          ×
        </button>
      </div>

      {/* Due date row */}
      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontSize: '11px', color: '#c2185b' }}>📅</span>
        <input
          type="date"
          value={card.due_date || ''}
          onChange={(e) => onUpdate({ due_date: e.target.value || null })}
          style={{
            fontSize: '11px',
            border: '1px solid #ffd6e8',
            borderRadius: '8px',
            padding: '2px 6px',
            color: '#ad1457',
            background: '#fff0f5',
            outline: 'none',
            cursor: 'pointer',
          }}
        />
        {card.due_date && (
          <span style={{ fontSize: '11px', ...getDueDateStyle() }}>
            {(() => {
              const today = new Date();
              const due = new Date(card.due_date);
              today.setHours(0,0,0,0); due.setHours(0,0,0,0);
              if (due < today) return '⚠️ Overdue';
              if ((due - today) <= 2 * 24 * 60 * 60 * 1000) return '⏰ Due soon';
              return `✅ ${formatDate(card.due_date)}`;
            })()}
          </span>
        )}
      </div>

      {/* Move buttons */}
      <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
        {otherColumns.map(col => (
          <button
            key={col.id}
            onClick={() => onMove(col.id)}
            style={{
              fontSize: '11px',
              padding: '3px 10px',
              borderRadius: '20px',
              border: '1.5px solid #ffb6d9',
              background: '#fff0f5',
              color: '#d63384',
              cursor: 'pointer',
            }}
          >
            → {col.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Card;