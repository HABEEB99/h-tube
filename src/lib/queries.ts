export const postsQuery = `*[_type == 'post']{
    _id,
    _createdAt,
    category,
    title,
    slug,
    caption,
    video{
    asset->{
    _id,
    url
  }
  },
  
  userId,
  
  postedBy->{
    _id,
    userName,
    picture
  },
  
  likes,
  comments[]{
         comment,
         _key,
          postedBy->{
           _id,
          userName,
          picture
       },
   },
  }`;

export const postDetailsQuery = (id: string | string[]) => {
	const query = `*[_type == "post" && _id == '${id}']{
        _id,
        _createdAt,
        category,
        title,
        slug,
        caption,
        video{
        asset->{
        _id,
        url
      }
      },
      
      userId,
      
      postedBy->{
        _id,
        userName,
        picture
      },
      
      likes,
      comments[]{
             comment,
             _key,
              postedBy->{
               _id,
              userName,
              picture
           },
       },
      }`;
	return query;
};

// export const postQuery = `*[_type == 'post' && slug.current == $slug][0]{
//     _id,
//     _createdAt,
//     category,
//     title,
//     slug,
//     caption,
//     video{
//     asset->{
//     _id,
//     url
//   }
//   },

//   userId,

//   postedBy->{
//     _id,
//     userName,
//     picture
//   },

//   likes,
//   comments[]{
//          comment,
//          _key,
//           postedBy->{
//            _id,
//           userName,
//           picture
//        },
//    },
//   }`;
