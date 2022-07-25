export default {
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		{
			name: 'category',
			title: 'Category',
			type: 'string',
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},

		{
			name: 'caption',
			title: 'Caption',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
		},

		{
			name: 'video',
			title: 'Video',
			type: 'file',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'userId',
			title: 'UserId',
			type: 'string',
		},
		{
			name: 'postedBy',
			title: 'PostedBy',
			type: 'postedBy',
		},
		{
			name: 'likes',
			title: 'Likes',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'user' }],
				},
			],
		},
		{
			name: 'comments',
			title: 'Comments',
			type: 'array',
			of: [{ type: 'comment' }],
		},
	],
};
