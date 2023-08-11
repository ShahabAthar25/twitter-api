module.exports = (text) => {
  const hashtagsRegex = /#\w+/g;
  const mentionsRegex = /@\w+/g;

  const hashtags = (text.match(hashtagsRegex) || []).map((tag) => tag.slice(1));
  const mentions = (text.match(mentionsRegex) || []).map((mention) =>
    mention.slice(1)
  );

  return {
    hashTags: hashtags || [],
    mentions: mentions || [],
  };
};
