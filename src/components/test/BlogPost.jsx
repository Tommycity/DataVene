// src/pages/BlogPost.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`YOUR_API_URL/blog/${id}`);
        const data = await response.json();

        if (data.success) {
          setBlog(data.data);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Blog post not found</h2>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <article className="blog-post-container">
        {/* Cover Image */}
        {blog.avatarImg && (
          <img src={blog.avatarImg} alt={blog.blogTitle} className="cover-image" />
        )}

        {/* Title */}
        <h1 className="blog-title">{blog.blogTitle}</h1>

        {/* Subtitle */}
        {blog.subTitle && <p className="blog-subtitle">{blog.subTitle}</p>}

        {/* Author & Date */}
        <div className="blog-meta">
          <p className="author-name">{blog.author}</p>
          <p className="post-date">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="post-actions">
          <button className="action-btn">♥</button>
          <button className="action-btn">💬</button>
          <button className="action-btn">🔄</button>
          <button className="share-btn">Share</button>
        </div>

        {/* Content Image */}
        {blog.blogContent.avatarImg && (
          <img
            src={blog.blogContent.avatarImg}
            alt="Content"
            className="content-image"
          />
        )}

        {/* Blog Content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.blogContent.blogSubContent }}
        />

        {/* Footer Actions */}
        <div className="post-actions">
          <button className="action-btn">♥</button>
          <button className="action-btn">💬</button>
          <button className="action-btn">🔄</button>
          <button className="share-btn">Share</button>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;