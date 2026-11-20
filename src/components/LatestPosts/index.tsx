import React from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';

type Post = {title: string; description: string; permalink: string; date: string};

export default function LatestPosts({count = 3}: {count?: number}) {
  const posts = (usePluginData('latest-posts') as Post[]) ?? [];
  return (
    <div className="row">
      {posts.slice(0, count).map((post) => (
        <div key={post.permalink} className="col col--4" style={{marginBottom: '1rem'}}>
          <div className="card" style={{height: '100%'}}>
            <div className="card__header">
              <small>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </small>
              <h3 style={{marginBottom: 0}}>{post.title}</h3>
            </div>
            <div className="card__body">
              <p>{post.description}</p>
            </div>
            <div className="card__footer">
              <Link className="button button--primary button--sm" to={post.permalink}>
                Read post
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
