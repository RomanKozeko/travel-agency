import React from 'react';
import Button from 'material-ui/Button';

const MenuForm = ({ saveMenu, menuItems, isSaving }) => {
  const handleSave = e => {
    e.preventDefault();
    saveMenu(menuItems);
  };

  return (
    <div>
      {menuItems.length > 1 && (
        <form action="" onSubmit={handleSave}>
          <Button type="submit" color="primary" disabled={isSaving}>
            {isSaving ? 'Сохраняю...' : 'Сохранить порядок'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default MenuForm;
