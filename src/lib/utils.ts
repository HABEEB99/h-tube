import axios from 'axios';
import jwt_decode from 'jwt-decode';

type UserDetails = {
	given_name: String;
	name: string;
	email: string;
	picture: string;
	sub: string;
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
	const decodedJwt: UserDetails = jwt_decode(response.credential);
	console.log(decodedJwt);
	const { given_name, name, email, picture, sub } = decodedJwt;

	const user = {
		_id: sub,
		_type: 'user',
		userName: given_name,
		fullName: name,
		email: email,
		picture: picture,
	};

	addUser(user);

	await axios.post(`${BASE_URL}/api/signin`, user);
};
