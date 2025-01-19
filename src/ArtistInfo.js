import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import styles from './ArtistInfo.module.css';

function ArtistInfo() {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const storage = getStorage();
        const imageRef = ref(storage, 'website/profile_pic2.png');

        getDownloadURL(imageRef)
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                console.error("Fehler beim Abrufen der Bild-URL:", error);
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                {imageUrl && <img src={imageUrl} alt="Künstler" className={styles.image} />}
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.heading}>Über den Künstler - Test </h1>
                <p className={styles.paragraph}>Der Künstler dieser atemberaubenden Werke ist Max Mustermann, ein leidenschaftlicher Fotograf, der sich auf Landschaftsfotografie spezialisiert hat. Seine Werke fangen die Schönheit der Natur ein und zeigen seine außergewöhnliche Fähigkeit, Licht und Farben perfekt in Szene zu setzen.</p>
                <h2 className={styles.subheading}>Wichtige Werke</h2>
                <ul className={styles.list}>
                    <li>Sonnenuntergang am Strand</li>
                    <li>Berglandschaft im Winter</li>
                    <li>Wald im Herbst</li>
                </ul>
                <h2 className={styles.subheading}>Kontakt</h2>
                <p className={styles.paragraph}>Website: <a href="https://example.com" className={styles.link}>www.example.com</a></p>
                <p className={styles.paragraph}>Email: max.mustermann@example.com</p>
            </div>
        </div>
    );
}

export default ArtistInfo;
