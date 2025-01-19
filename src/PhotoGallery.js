// PhotoGallery.js
import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { storage, db } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import LazyLoad from 'react-lazyload';
import CategoryMenu from './CategoryMenu';
import styles from './PhotoGallery.module.css'; // Importiere das CSS-Modul

function PhotoGallery() {
  const [images, setImages] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Galleries'); // State für die ausgewählte Kategorie

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = ref(storage, 'images');
        const result = await listAll(imagesRef);

        if (!result.items || result.items.length === 0) {
          console.warn('Keine Bilder im angegebenen Pfad gefunden.');
          return;
        }

        const imagePromises = result.items.map(async (itemRef) => {
          try {
            if (!itemRef.name) {
              console.warn('itemRef hat keinen Namen, möglicherweise ist es kein gültiges Objekt:', itemRef);
              return null;
            }

            const url = await getDownloadURL(itemRef);
            const fileName = itemRef.name;
            const imageNumber = fileName.split('.')[0];
            const docRef = doc(db, 'descriptions', imageNumber);
            const docSnap = await getDoc(docRef);
            let description = '';
            let category = '';

            if (docSnap.exists()) {
              description = docSnap.data().description;
              category = docSnap.data().category || ''; // Kategorie hinzufügen, falls vorhanden
            } else {
              description = 'Keine Beschreibung verfügbar';
            }

            return {
              url: url,
              description: description,
              category: category, // Kategorie speichern
            };
          } catch (error) {
            console.error('Fehler beim Verarbeiten des Bildes:', error);
            return null;
          }
        });

        const imageData = (await Promise.all(imagePromises)).filter((image) => image !== null);
        setImages(imageData);
      } catch (error) {
        console.error('Fehler beim Laden der Bilder:', error);
      }
    };

    fetchImages();
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  // Funktion zum Filtern der Bilder basierend auf der ausgewählten Kategorie
  const filteredImages = images.filter((image) => {
    if (selectedCategory === 'All Galleries') {
      return true; // Alle Bilder anzeigen
    }
    if (!image.category) {
      return false; // Bilder ohne Kategorie nur unter "All Galleries" anzeigen
    }
    return image.category === selectedCategory;
  });

  return (
    <div className={styles.photoGalleryContainer}>
      <CategoryMenu
        categories={['All Galleries', 'Landscape', 'Crazy', 'Flowers']}
        onCategorySelect={(category) => setSelectedCategory(category)}
        selectedCategory={selectedCategory}
      />
      <div className={styles.galleryContainer}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredImages.map((image, index) => (
            <div key={index} className={styles.imageItem}>
              <LazyLoad
                height={200}
                offset={100}
                placeholder={<div style={{ height: '200px', backgroundColor: '#f0f0f0' }}>Lädt...</div>}
              >
                <img
                  src={image.url}
                  alt={image.description}
                  className={styles.fixedHeightImg} // Verwende das Modul
                  onClick={() => {
                    setPhotoIndex(index);
                    setIsOpen(true);
                  }}
                />
              </LazyLoad>
              <p>{image.description}</p>
            </div>
          ))}
        </Masonry>

        {isOpen && filteredImages.length > 0 && (
          <Lightbox
            mainSrc={filteredImages[photoIndex].url}
            nextSrc={filteredImages[(photoIndex + 1) % filteredImages.length].url}
            prevSrc={filteredImages[(photoIndex + filteredImages.length - 1) % filteredImages.length].url}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + filteredImages.length - 1) % filteredImages.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % filteredImages.length)
            }
            imageTitle={filteredImages[photoIndex].description}
            reactModalProps={{
              appElement: document.getElementById('root'),
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PhotoGallery;
