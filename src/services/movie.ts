import api from '../utils/axios';

interface Genre {
	genre_id: number;
	genre_name: string;
	genre_poster: string;
}

interface GenresResponse {
	success: boolean;
	message: string;
	data: {
		genres: Genre[];
	};
}

export const movieService = {
	async getAllGenres(): Promise<GenresResponse> {
		const response = await api.get<GenresResponse>('/movie/genres/all');
		return response.data;
	},
}; 