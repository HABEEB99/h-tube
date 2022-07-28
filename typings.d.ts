export interface PostProp {
	_id: string;

	_createdAt: string;

	category: string;

	caption: string;

	title: string;

	slug: {
		current: string;
	};

	userId: string;

	video: {
		_id: string;
		asset: {
			_id: string;
			url: string;
		};
	};

	postedBy: {
		_id: string;
		userName: string;
		picture: string;
	};

	comments: [
		{
			_key: string;
			comment: string;
			postedBy: {
				_id: string;
				userName: string;
				picture: string;
			};
		},
	];

	likes: [string];
}
