const generateSlug = (name) => {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
};

module.exports = { generateSlug };
