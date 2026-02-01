// Helper function to detect platform from URL
const detectPlatform = (url) => {
  const lowerUrl = url.toLowerCase();
  
  // Platform detection patterns
  const platforms = {
    github: { name: "GitHub", icon: "🔗" },
    gitlab: { name: "GitLab", icon: "🦊" },
    bitbucket: { name: "Bitbucket", icon: "🪣" },
    figma: { name: "Figma", icon: "🎨" },
    powerbi: { name: "Power BI", icon: "📊" },
    tableau: { name: "Tableau", icon: "📈" },
    "google.com/drive": { name: "Google Drive", icon: "📁" },
    "docs.google": { name: "Google Docs", icon: "📝" },
    linkedin: { name: "LinkedIn", icon: "💼" },
    kaggle: { name: "Kaggle", icon: "🏆" },
    jupyter: { name: "Jupyter", icon: "📓" },
    colab: { name: "Google Colab", icon: "🔬" },
    databricks: { name: "Databricks", icon: "🧮" },
    snowflake: { name: "Snowflake", icon: "❄️" },
    "aws.amazon": { name: "AWS", icon: "☁️" },
    azure: { name: "Azure", icon: "☁️" },
    "cloud.google": { name: "Google Cloud", icon: "☁️" },
    notion: { name: "Notion", icon: "📋" },
    youtube: { name: "YouTube", icon: "📺" },
    medium: { name: "Medium", icon: "✍️" },
    stackoverflow: { name: "Stack Overflow", icon: "💬" },
  };
  
  // Check each platform
  for (const [key, value] of Object.entries(platforms)) {
    if (lowerUrl.includes(key)) {
      return value;
    }
  }
  
  // Default: extract domain name
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    const name = domain.split('.')[0];
    return { 
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      icon: "🔗" 
    };
  } catch (e) {
    return { name: "View Link", icon: "🔗" };
  }
};

// Component for rendering smart link buttons
const SmartLinkButtons = ({ links }) => {
  const handleLinkClick = (url) => {
    // Ensure URL has protocol
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap gap-4">
      {links?.map((link, index) => {
        const platform = detectPlatform(link);
        
        return (
          <button
            key={index}
            onClick={() => handleLinkClick(link)}
            className="border border-primary-deep rounded-full text-lg py-[12px] px-[32px] text-primary-deep w-fit hover:bg-primary-deep hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <span>{platform.icon}</span>
            <span>{platform.name}</span>
          </button>
        );
      })}
    </div>
  );
};

// Usage example:
// <SmartLinkButtons links={data?.projectLink} />

export default SmartLinkButtons;