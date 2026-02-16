// src/pages/admin/CreateBlog.jsx
import { useState } from 'react';
import SubstackStyleEditor from './SubstackStyleEditor';

const CreateBlogPost = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      htmlContent: htmlContent,
      author: author,
    };

    console.log('📤 Sending to backend:', dataToSend);

    try {
      const response = await fetch('YOUR_API_URL/blog/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('✅ Blog created successfully!');
        setHtmlContent('');
        setAuthor('');
      } else {
        alert('❌ Error: ' + (result.message || 'Failed to create blog'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Failed to create blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>
        Create Blog Post
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Author Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
            Author Name *
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name..."
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
            required
          />
        </div>

        {/* Rich Text Editor */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
            Blog Content *
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
            Start with Heading 1 for title, Heading 2 for subtitle, then add your content with images, code blocks, etc.
          </p>
          <SubstackStyleEditor content={htmlContent} onChange={setHtmlContent} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !htmlContent || !author}
          style={{
            padding: '15px 40px',
            fontSize: '16px',
            fontWeight: '600',
            background: isSubmitting ? '#ccc' : '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
        </button>
      </form>

      {/* Debug Preview */}
      <details style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
          📋 Preview Data Being Sent to Backend
        </summary>
        <pre style={{ fontSize: '12px', overflow: 'auto', marginTop: '15px' }}>
          {JSON.stringify({ htmlContent, author }, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default CreateBlogPost;