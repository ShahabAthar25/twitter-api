module.exports = (text) => {
  const hashtagsRegex = /#\w+/g;
  const mentionsRegex = /@\w+/g;

  const hashtags = text.match(hashtagsRegex);
  const mentions = text.match(mentionsRegex);

  return {
    hashtags: hashtags || [],
    mentions: mentions || [],
  };
};
