import React, { CSSProperties, useEffect, useState } from 'react';
import './App.css';
import { AppInfo } from './models';
import { getAppInfo } from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircle, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

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
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [appInfo, setAppInfo] = useState<AppInfo | undefined>(undefined);
	const [backgroundStyle, setBackgroundStyle] = useState<CSSProperties | undefined>(undefined);
	const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | undefined>(undefined);

	async function loadAppInfo() {
		setLoading(true);
		try {
			const data = id ? await getAppInfo(parseInt(id)) : undefined;
			setAppInfo(data);
			setBackgroundImageUrl(data ? data.screenshotUrls[0] : undefined);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		loadAppInfo();
	}, []);

	useEffect(() => {
		setBackgroundStyle(backgroundImageUrl ? { background: `url("${backgroundImageUrl}") center center / cover no-repeat rgba(0, 0, 0, 0.5)`, backgroundBlendMode: 'multiply' } : undefined);
	}, [backgroundImageUrl]);

	const selectBackgroundImage = (url: string) => {
		setBackgroundImageUrl(url);
	};

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
									<p>{appInfo.releaseDate}</p>
								</div>
								<div className='detail'>
									<FontAwesomeIcon icon={faUser} size="xl" />
									<p>{appInfo.developer}</p>
								</div>
								{appInfo.rating && <div className='detail'>
									<FontAwesomeIcon icon={faThumbsUp} size="xl" />
									<p>{rating(appInfo.rating)}</p>
								</div>}
								{appInfo.currentPrice !== undefined && <div className='prices'>
									<p>{price(appInfo.currentPrice)}</p>
									{appInfo.currentPrice !== appInfo.retailPrice && (
										<p className='retail-price'>{price(appInfo.retailPrice)}</p>
									)}
								</div>}
							</div>
						</div>
						<div className='info-actions'>
							{appInfo.screenshotUrls.length > 1 && appInfo.screenshotUrls.map((url) => {
								const style = { color: url === backgroundImageUrl ? 'white' : 'grey', cursor: 'pointer' };
								return <FontAwesomeIcon key={url} icon={faCircle} style={style} size='lg' onClick={() => selectBackgroundImage(url)} />
							})}
						</div>
					</div>
				</div>
			</div>
		) : (<div>Loading failed.</div>)
	);
}

export default App;
