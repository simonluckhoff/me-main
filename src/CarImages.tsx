import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, listAll } from "firebase/storage";
import { Grid } from "react-loader-spinner";
import "./styles/gridLoader.css";

interface Props {
	bucketFolder: string;
}

export default function CarImages({ bucketFolder }: Props) {
	const [photoUrls, setPhotoUrls] = useState<string[]>([]);
	const [error, setError] = useState<undefined | string>();
	const [displayReady, setDisplayReady] = useState(false);

	useEffect(() => {
		getImages();
	}, [bucketFolder]);

	// const displayImages = (urls: string[]): JSX.Element[] => {
	// 	const imagePerCol = Math.round(urls.length / 4);
	// 	const colArr: string[][] = [];

	// 	urls.forEach((url, index) => {
	// 		let count = imagePerCol;
	// 		let tempArr: string[] = [];

	// 		// add set of images to temp array to
	// 		if (index >= count) {
	// 			count = count + imagePerCol;
	// 			colArr.push(tempArr);
	// 			tempArr = [];
	// 		}
	// 		// add set to column array when limit is reached
	// 		else {
	// 			tempArr.push(url);
	// 		}

	// 		if (index === urls.length - 1) colArr.push(tempArr);
	// 	});

	// 	console.log(colArr);

	// 	return colArr.map((col) => {
	// 		return (
	// 			<div className="col">
	// 				{col.map((url) => {
	// 					return <img key={url} src={url} />;
	// 				})}
	// 			</div>
	// 		);
	// 	});
	// };

	const getImages = () => {
		const listRef = ref(storage, bucketFolder);
		let photoUrls: string[] = [];

		listAll(listRef)
			.then((res) => {
				res.items.forEach((itemRef) => {
					const encodedStr = encodeURIComponent(itemRef.fullPath);
					const url = import.meta.env.PUBLIC_BUCKET_URL + encodedStr + "?alt=media";
					photoUrls.push(url);
				});
				setPhotoUrls(photoUrls);
				setDisplayReady(true);
			})
			.catch((error) => {
				console.error(`Error getting images for ${bucketFolder}:`, error);
			});
	};

	if (error) return <p className="error">Oops! There was a server side error.</p>;

	if (photoUrls.length > 0) {
		return photoUrls.map((url) => {
			return <img key={url} src={url} />;
		});
	}

	return (
		<Grid
			visible={true}
			height="50"
			width="50"
			color="#4fa94d"
			ariaLabel="grid-loading"
			radius="12.5"
			wrapperStyle={{}}
			wrapperClass="grid-wrapper"
		/>
	);
}
