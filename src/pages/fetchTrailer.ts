import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyABP-6S3gmbz-MdmZsdbAaxMxdnH6JHA2g";

export const fetchTrailerId = async (
	title: string,
	releaseYear: string
): Promise<string | null> => {
	try {
		const query = `${title} official trailer ${releaseYear}`;
		const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
			params: {
				part: "snippet",
				q: query,
				key: YOUTUBE_API_KEY,
				maxResults: 1,
				type: "video",
				videoEmbeddable: "true",
			},
		});

		return response.data.items[0]?.id?.videoId || null;
	} catch (error) {
		console.error("Error fetching trailer:", error);
		return null;
	}
};
