const setFileUrl = doc => {
  if (doc.file) {
    const fileUrl = `${process.env.BASE_URL}/${doc.file}`;
    doc.file = fileUrl;
  }
};

export const renameFile = (Schema, schemaType) => {
  // add url link to our files when getting them from database
  // init doesn't work with create req so we add save

  Schema.post('init', doc => {
    setFileUrl(doc);
  });

  Schema.post('save', doc => {
    setFileUrl(doc);
  });
};
