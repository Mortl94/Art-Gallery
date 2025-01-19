// Admin.js
import React, { useState, useEffect } from 'react';
import { storage, db } from './firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

function Admin() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]); // Optional: Für die Anzeige

  const auth = getAuth();

  useEffect(() => {
    if (user) {
      fetchUploadedImages();
    }
  }, [user]);

  const handleLogin = async () => {
    const email = prompt('Email:');
    const password = prompt('Passwort:');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Anmeldung fehlgeschlagen:', error);
      alert('Anmeldung fehlgeschlagen');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Fehler beim Abmelden:', error);
      alert('Fehler beim Abmelden');
    }
  };

  const getNextImageNumber = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'descriptions'));
      const numbers = querySnapshot.docs.map((doc) => parseInt(doc.id));
      const maxNumber = Math.max(0, ...numbers);
      return (maxNumber + 1).toString();
    } catch (error) {
      console.error('Fehler beim Festlegen der Bildnummer:', error);
      alert('Fehler beim Festlegen der Bildnummer');
      throw error;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Bitte ein Bild auswählen.');
      return;
    }

    if (!description) {
      alert('Bitte eine Beschreibung eingeben.');
      return;
    }

    console.log('Upload gestartet');
    setIsUploading(true);
    setProgress(0);

    try {
      const imageNumber = await getNextImageNumber();
      console.log('Nächste Bildnummer:', imageNumber);

      // Pfad für das Bild in Firebase Storage
      const fileExtension = file.name.split('.').pop();
      const fileName = `${imageNumber}.${fileExtension}`;
      const storageRef = ref(storage, `images/${fileName}`);
      console.log('Speichere Bild unter:', `images/${fileName}`);

      // Datei hochladen mit Fortschrittsanzeige
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Fortschritt berechnen
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log('Upload Fortschritt:', progress);
        },
        (error) => {
          console.error('Fehler beim Hochladen:', error);
          alert('Fehler beim Hochladen');
          setIsUploading(false);
        },
        async () => {
          console.log('Upload abgeschlossen');

          // Beschreibung in Firestore speichern
          try {
            await setDoc(doc(db, 'descriptions', imageNumber), {
              description: description,
            });
            console.log('Beschreibung gespeichert für Bildnummer:', imageNumber);

            alert('Bild erfolgreich hochgeladen!');
            // Zustände zurücksetzen
            setFile(null);
            setDescription('');
            setProgress(0);
            setIsUploading(false);
            // Hochgeladene Bilder aktualisieren
            fetchUploadedImages();
          } catch (error) {
            console.error('Fehler beim Speichern der Beschreibung:', error);
            alert('Fehler beim Speichern der Beschreibung');
            setIsUploading(false);
          }
        }
      );
    } catch (error) {
      console.error('Fehler beim Hochladen:', error);
      alert('Fehler beim Hochladen');
      setIsUploading(false);
    }
  };

  const fetchUploadedImages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'descriptions'));
      const imagesData = querySnapshot.docs.map((doc) => ({
        imageNumber: doc.id,
        description: doc.data().description,
      }));
      // Bilder nach Bildnummer sortieren
      imagesData.sort((a, b) => parseInt(a.imageNumber) - parseInt(b.imageNumber));
      setUploadedImages(imagesData);
    } catch (error) {
      console.error('Fehler beim Laden der Bilder:', error);
    }
  };

  if (!user) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Anmeldung erforderlich</h1>
        <button onClick={handleLogin}>Anmelden</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Bild hochladen</h1>
      <button onClick={handleLogout} style={{ float: 'right' }}>
        Abmelden
      </button>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Bild auswählen:</strong>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: 'block', marginTop: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Beschreibung:</strong>
        </label>
        <textarea
          placeholder="Beschreibung eingeben"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', height: '80px', marginTop: '5px' }}
        />
      </div>
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? `Hochladen... (${Math.round(progress)}%)` : 'Hochladen'}
      </button>

      {isUploading && (
        <div style={{ marginTop: '10px' }}>
          <progress value={progress} max="100" style={{ width: '100%' }} />
        </div>
      )}

      <hr style={{ margin: '40px 0' }} />

      {/* Optional: Anzeige der hochgeladenen Bilder */}
      <div>
        <h2>Hochgeladene Bilder</h2>
        {uploadedImages.length === 0 ? (
          <p>Keine Bilder hochgeladen.</p>
        ) : (
          <ul>
            {uploadedImages.map((image) => (
              <li key={image.imageNumber}>
                <strong>Bildnummer:</strong> {image.imageNumber} <br />
                <strong>Beschreibung:</strong> {image.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Admin;
