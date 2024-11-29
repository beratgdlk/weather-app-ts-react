import { useEffect, useState, useRef } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
}

const WeatherApp = () => {
  const [city, setCity] = useState<string>("İstanbul");
  const [weather, setWeather] = useState<WeatherData | null>(null); // Hava durumu verisi için tip belirleyin
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef= useRef<HTMLInputElement>(null)

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null); // Hata durumunu sıfırla
    try {
      const apiKey = "YOUR_API_KEY"; // API anahtarınızı buraya ekleyin
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error("Hava durumu verisi alınamadı");
      }
      const data = await response.json();
      setWeather(data); // Hava durumu verisini ayarla
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Hata mesajını ayarla
      } else {
        setError("Bilinmeyen bir hata oluştu."); // Bilinmeyen hata durumu
      }
    } finally {
      setLoading(false); // Yükleme durumunu kapat
    }
  };

  const handleSearch = () => {
    fetchWeather(city); // Şehir ismi ile hava durumu verisini al
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchWeather(city);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    fetchData();
  }, [city]); // city değiştiğinde fetchWeather çağrılır

  return (
    <div>
      <input 
        // Bu input, kullanıcıdan şehir ismini girmesini sağlar.
        ref={inputRef}
        type="text"
        value={city}
        // onChange event'i gerçekleştiğinde, şehir ismini günceller
        onChange={(e) => setCity(e.target.value)}
        placeholder="Şehir ismi girin"
      />
      <button onClick={handleSearch}>Hava Durumunu Ara</button>
      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Sıcaklık: {weather.main.temp} °C</p>
          <p>Nem:{weather.main.humidity} % </p>
          <p>Hava Durumu: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;