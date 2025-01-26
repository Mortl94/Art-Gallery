import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import styles from './ArtistInfo.module.css';

function ArtistInfo() {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const storage = getStorage();
        const imageRef = ref(storage, 'website/profile_pic.png');

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
            {/* Header mit Profilbild */}
            <div className={styles.header}>
                {imageUrl && (
                    <img src={imageUrl} alt="Künstler" className={styles.profileImage} />
                )}
                <h1 className={styles.mainHeading}>Über den Künstler</h1>
            </div>

            {/* Abschnitt: Zur Person */}
            <div className={styles.section}>
                <h2 className={styles.subheading}>Zur Person</h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}>geboren am 29.08.1988 in Passau</li>
                    <li className={styles.listItem}>2014-2019: Studium der Malerei und Grafik an der Staatlichen Akademie der Bildenden Künste Karlsruhe</li>
                    <li className={styles.listItem}>lebt und arbeitet in Passau</li>
                    <li className={styles.listItem}>Mitglied des Berufsverbands Bildender Künstler Niederbayern und der Gemeinschaft Bildender Künstler Straubing</li>
                </ul>
            </div>

            {/* Abschnitt: Einzelausstellungen */}
            <div className={styles.section}>
                <h2 className={styles.subheading}>Einzelausstellungen</h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}>2018: Figuration und Landschaft; Kulturmodell Bräugasse, Passau</li>
                    <li className={styles.listItem}>2019: Figuration und Landschaft II; Liebenweinturm, Burghausen</li>
                    <li className={styles.listItem}>2019/20: "Kontemplationen"; Spectrum Kirche, Passau</li>
                    <li className={styles.listItem}>2022: "Stadt, Land, Fluss"; Heimatgeschichtlicher Arbeits- und Freundeskreis Sandbach</li>
                    <li className={styles.listItem}>2023: Straubinger Kulturförderpreis; Weytterturm, Straubing</li>
                    <li className={styles.listItem}>2025: "Schaufenster" Simader, Passau</li>
                </ul>
            </div>

            {/* Abschnitt: Gemeinschaftsausstellungen */}
            <div className={styles.section}>
                <h2 className={styles.subheading}>Gemeinschaftsausstellungen</h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}>seit 2017: regelmäßige Teilnahme an den Halbjahresausstellungen der GBK Straubing</li>
                    <li className={styles.listItem}>seit 2020: regelmäßige Teilnahme an den Jahresausstellungen BBK Niederbayern</li>
                    <li className={styles.listItem}>2021: "Junge Kunst", Kunstverein Passau</li>
                    <li className={styles.listItem}>2021/22: "Peter Kobbe und Sebastian Gessenharter"; Kunstsammlung Ostbayern, Hengersberg</li>
                </ul>
            </div>

            {/* Abschnitt: Auszeichnungen */}
            <div className={styles.section}>
                <h2 className={styles.subheading}>Auszeichnungen</h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}>2020: "Junge Kunst" – länderübergreifendes Kunstprojekt der Sparkasse Passau</li>
                    <li className={styles.listItem}>2021: Straubinger Kulturförderpreis der Dr. Franz und Astrid Ritter Stiftung</li>
                </ul>
            </div>

            {/* Abschnitt: Kontakt */}
            <div className={styles.section}>
                <h2 className={styles.subheading}>Kontakt</h2>
                <p className={styles.contact}>Email: gessenhart@yahoo.com</p>
                <p className={styles.contact}>Tel.: 01796841185</p>
            </div>
        </div>
    );
}

export default ArtistInfo;
