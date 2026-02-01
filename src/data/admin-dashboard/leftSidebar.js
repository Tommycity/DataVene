export const sidebarData = [
  {
    title: "Dashboard",
    icon: "FaTachometerAlt",
    link: "/dashboard",
  },

  {
    title: "Blogs",
    icon: "FaBoxes",
    link: "/blogs",
    children: [
      {
        title: "BlogPosts",
        link: "/all-blogs",
      },
      {
        title: "Add BlogPost",
        link: "/add-blogpost",
      },
    ],
  },
  {
    title: "Project",
    link: "/projects",
    icon: "FaShoppingCart",
    children: [
      {
        title: "All Projects",
        link: "/all-projects",
      },
      {
        title: "Add Project",
        link: "/add-project",
      },
    ],
  },
  {
    title: "Skill",
    link: "/Skills",
    icon: "FaShoppingCart",
    children: [
      {
        title: "All Skills",
        link: "/all-Skills",
      },
      {
        title: "Add Skill",
        link: "/add-Skill",
      },
    ],
  },
  {
    title: "About",
    icon: "FaShoppingBag",
    // icon: "FaHouseUser",
    link: "/about",
    children: [
      {
        title: "About List",
        link: "/about-list",
      },
      {
        title: "Add About",
        link: "/add-about",
      },
    ],
  },
  
  {
    title: "Settings",
    icon: "FaShoppingBag",
    link: "/setting",
    children: [
      {
        title: "Warehouse",
        link: "/setting/warehouse",
      },
    ],
  },
];