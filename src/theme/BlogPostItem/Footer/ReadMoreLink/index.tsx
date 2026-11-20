import React from 'react';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/BlogPostItem/Footer/ReadMoreLink';

// Swizzled (wrapper-free override): the default label is the generic "Read more",
// which Lighthouse/SEO tools flag as non-descriptive link text. Include the post title.
export default function BlogPostItemFooterReadMoreLink(props: Props): React.JSX.Element {
  const {blogPostTitle, ...linkProps} = props;
  return (
    <Link {...linkProps}>
      <b>Continue reading: {blogPostTitle}</b>
    </Link>
  );
}
