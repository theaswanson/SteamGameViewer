import React, { CSSProperties, useEffect, useState } from 'react';
import './App.css';
import { AppInfo } from './models';
import { getAppInfo } from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';

const price = (cost: number) => {
  if (cost === 0) {
    return "Free";
  }

  return `$${cost.toFixed(2)}`;
}

const rating = (rating: number) => {
  return `${(rating * 100).toFixed(0)}%`;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [appInfo, setAppInfo] = useState<AppInfo | undefined>(undefined);
  const [releaseDate, setReleaseDate] = useState<Date | undefined>(undefined);
  const [backgroundStyle, setBackgroundStyle] = useState<CSSProperties | undefined>(undefined);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

  async function loadAppInfo() {
    setLoading(true);
    try {
      const data = await getAppInfo(440);
      setAppInfo(data);
      setReleaseDate(data ? new Date(data.releaseYear, data.releaseMonth - 1, data.releaseDay) : undefined);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppInfo();
  }, []);

  useEffect(() => {
    setBackgroundStyle(appInfo ? { background: `url("${appInfo.screenshotUrls[backgroundImageIndex]}") center center / cover no-repeat rgba(0, 0, 0, 0.5)`, backgroundSize: 'cover', backgroundBlendMode: 'multiply' } : undefined);
  }, [appInfo, backgroundImageIndex]);

  const nextBackgroundImage = () => {
    let nextIndex: number;
    if (backgroundImageIndex + 1 === appInfo?.screenshotUrls.length) {
      nextIndex = 0;
    } else {
      nextIndex = backgroundImageIndex + 1;
    }
    setBackgroundImageIndex(nextIndex);
  };

  const previousBackgroundImage = () => {
    let nextIndex: number;
    if (backgroundImageIndex === 0) {
      nextIndex = appInfo!.screenshotUrls.length - 1;
    } else {
      nextIndex = backgroundImageIndex - 1;
    }
    setBackgroundImageIndex(nextIndex);
  };

  useEffect(() => {
    console.log(backgroundStyle);
  }, [backgroundStyle]);

  return loading ? (<div>Loading...</div>) : (
    appInfo ? (
      <div className="App" style={backgroundStyle}>
        <div className="contents">
          <img src={appInfo.libraryImageUrl} className="box-art" alt="Box art" />
          <div className="info">
            <div className='info-content'>
              <div className='header'>
                <h1>{appInfo.title}</h1>
                <p>{appInfo.description}</p>
              </div>
              <div className='details'>
                <div className='detail'>
                  <FontAwesomeIcon icon={faCalendar} size="xl" />
                  <p>{releaseDate?.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className='detail'>
                  <FontAwesomeIcon icon={faUser} size="xl" />
                  <p>{appInfo.developer}</p>
                </div>
                <div className='detail'>
                  <FontAwesomeIcon icon={faThumbsUp} size="xl" />
                  <p>{rating(appInfo.rating)}</p>
                </div>
                <div className='prices'>
                  <p>{price(appInfo.currentPrice)}</p>
                  {appInfo.currentPrice !== appInfo.retailPrice && (
                    <p className='retail-price'>{price(appInfo.retailPrice)}</p>
                  )}
                </div>
              </div>
            </div>
            <div className='info-actions'>
              <button onClick={nextBackgroundImage}>Next</button>
              <button onClick={previousBackgroundImage}>Previous</button>
            </div>
          </div>
        </div>
      </div>
    ) : (<div>Loading failed.</div>)
  );
}

export default App;
