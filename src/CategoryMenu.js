// CategoryMenu.js
import React, { useState } from 'react';
import styles from './CategoryMenu.module.css';

function CategoryMenu({ categories, onCategorySelect, selectedCategory }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
    // Schließe das Filter-Menü nach der Auswahl auf kleinen Bildschirmen
    setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className={styles.container}>
      {/* Header für kleine Bildschirme */}
      <div className={styles.mobileHeader}>
        <span className={styles.title}>Wähle deine Kategorie</span>
        <button className={styles.filterButton} onClick={toggleFilter}>
          Filter
        </button>
      </div>
      {/* Kategorienliste */}
      <h2 className={styles.heading}>Categories</h2>
      <ul className={`${styles.list} ${isFilterOpen ? styles.show : ''}`}>
        {categories.map((category) => (
          <li
            key={category}
            className={`${styles.listItem} ${
              selectedCategory === category ? styles.active : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryMenu;
