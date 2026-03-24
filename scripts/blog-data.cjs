const fs = require("fs");
const path = require("path");

const GENERATED_BLOG_DATA_PATH = path.join(
  __dirname,
  "../client/src/generated/blog-posts.json"
);

function loadGeneratedBlogPosts() {
  if (!fs.existsSync(GENERATED_BLOG_DATA_PATH)) {
    throw new Error(
      `Generated blog data was not found at ${GENERATED_BLOG_DATA_PATH}. Run "npm run generate:blog" first.`
    );
  }

  return JSON.parse(fs.readFileSync(GENERATED_BLOG_DATA_PATH, "utf8"));
}

module.exports = {
  GENERATED_BLOG_DATA_PATH,
  loadGeneratedBlogPosts,
};
