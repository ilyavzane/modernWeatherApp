const API_KEY = "4cLPWVOq4L4KIX7dAfW0VGMk66IIKRgY";

export async function getCityData(cityName) {
  const link = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const cityDataObj = {};

  try {
    const getCity = await fetch(
      `${link}?apikey=${API_KEY}&q=${cityName}&details=${true}`
    );

    if (getCity.ok) {
      const cityData = await getCity.json();

      if (cityData.length === 0) {
        throw new Error("No data found for the city.");
      }

      const { Key, TimeZone, EnglishName, GeoPosition } = cityData[0];

      cityDataObj["cityKey"] = Key;
      cityDataObj["timeZoneCode"] = TimeZone.Code;
      cityDataObj["timeZoneName"] = TimeZone.Name;
      cityDataObj["cityName"] = EnglishName;
      cityDataObj["geoPosition"] = {
        latitude: GeoPosition.Latitude,
        longitude: GeoPosition.Longitude,
      };

      return cityDataObj;
    } else {
      throw new Error("Network error");
    }
  } catch (error) {
    console.log("getCityData Error: ", error);
  }
}

export async function getCurrentWeatherData(cityCode) {
  try {
      const currentWeatherObj = {};
      const link = `http://dataservice.accuweather.com/currentconditions/v1/${cityCode}`;


    const getWether = await fetch(`${link}?apikey=${API_KEY}&details=true`);

    const weatherData = await getWether.json();

    const {
      WeatherText,
      WeatherIcon,
      Temperature,
      RealFeelTemperature,
      RelativeHumidity,
      Wind,
      CloudCover,
      TemperatureSummary,
      LocalObservationDateTime,
    } = weatherData[0];

    currentWeatherObj["weatherText"] = WeatherText;
    currentWeatherObj["weatherIcon"] = WeatherIcon;
    currentWeatherObj["temperature"] = Temperature.Metric.Value;
    currentWeatherObj["feelTemperature"] = RealFeelTemperature.Metric.Value;
    currentWeatherObj["humidity"] = RelativeHumidity;
    currentWeatherObj["windSpeed"] = Wind.Speed.Metric.Value;
    currentWeatherObj["cloudCover"] = CloudCover;
    currentWeatherObj["time"] = LocalObservationDateTime;
    currentWeatherObj["maxTempPastHours"] = TemperatureSummary.Past24HourRange.Maximum;
    currentWeatherObj["minTempPastHours"] = TemperatureSummary.Past24HourRange.Minimum;

    console.log(currentWeatherObj)

    return currentWeatherObj;
  } catch (error) {
    console.log("getCurrentWeatherData Error: ", error);
  }
}
