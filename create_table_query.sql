

-- Birim tablosunu oluştur
CREATE TABLE birim (
    id SERIAL PRIMARY KEY,
    birim_turu VARCHAR(50) NOT NULL CHECK (birim_turu IN ('adet', 'koli', 'kilogram')),
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tedarikci tablosunu oluştur
CREATE TABLE tedarikci (
    id SERIAL PRIMARY KEY,
    tedarikci_adi VARCHAR(100) NOT NULL,
    minimum_parti_buyuklugu INTEGER NOT NULL,
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Malzeme tablosunu oluştur
CREATE TABLE malzeme (
    id SERIAL PRIMARY KEY,
    malzeme_adi VARCHAR(50) NOT NULL CHECK (malzeme_adi IN ('gözlük', 'çerçeve', 'cam', 'kulp', 'menteşe', 'civata')),
    stok_seviyesi INTEGER NOT NULL,
    kritik_stok_seviyesi INTEGER NOT NULL,
    birim_id INTEGER NOT NULL REFERENCES birim(id),
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Stok işlemi tablosunu oluştur
CREATE TABLE stok_islemi (
    id SERIAL PRIMARY KEY,
    malzeme_id INTEGER NOT NULL REFERENCES malzeme(id),
    islem_tarihi TIMESTAMP NOT NULL,
    stok_miktari INTEGER NOT NULL,
    islem_turu INTEGER NOT NULL CHECK (islem_turu IN (0, 1)), -- 0: giriş, 1: çıkış
    tedarikci_id INTEGER NOT NULL REFERENCES tedarikci(id),
    birim_id INTEGER NOT NULL REFERENCES birim(id),
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Güncelleme tarihini otomatik güncelleyen trigger fonksiyonu
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedat = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Her tablo için trigger oluştur
CREATE TRIGGER update_malzeme_timestamp
    BEFORE UPDATE ON malzeme
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_stok_islemi_timestamp
    BEFORE UPDATE ON stok_islemi
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_tedarikci_timestamp
    BEFORE UPDATE ON tedarikci
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_birim_timestamp
    BEFORE UPDATE ON birim
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Birim tablosuna 5 adet örnek veri ekleme
INSERT INTO birim (birim_turu) VALUES
    ('adet'),
    ('koli'),

-- Tedarikçi tablosuna 5 adet örnek veri ekleme
INSERT INTO tedarikci (tedarikci_adi, minimum_parti_buyuklugu) VALUES
    ('Gözlük Dünyası A.Ş.', 100),
    ('Optik Merkez Ltd.', 50),
    ('Lens Tedarik ve Ticaret', 75),
    ('Çerçeve Toptan A.Ş.', 200),
    ('Optik Malzeme Sanayi', 150),
    ('Lenssora Glasses - Giriş', 0); -- sadece stok işlemlerinde giriş işlemi için kullanılacak

ALTER TABLE stok_islemi DROP CONSTRAINT stok_islemi_malzeme_id_fkey;

-- Cascade ile yeni constraint ekleyin
ALTER TABLE stok_islemi ADD CONSTRAINT stok_islemi_malzeme_id_fkey 
    FOREIGN KEY (malzeme_id) REFERENCES malzeme(id) 
    ON DELETE CASCADE;