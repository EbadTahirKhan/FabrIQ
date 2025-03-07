// sidebarData.js
export const sidebarItems = {
  businessPanel: [
    {
      type: "heading",
      text: "QUICK LINKS",
    },
    {
      type: "link",
      text: "Dashboard",
      icon: "FaHome",
      href: "/dashboard",
      className:
        "text-neutral-800 mb-2 mr-5 px-3 font-semibold outline outline-slate-400 rounded-se-full p-1 hover:text-blue-500 hover:outline-blue-500",
    },
    {
      type: "link",
      text: "New Product",
      icon: "FaPlus",
      href: "/new-product",
      className:
        "text-neutral-800 mb-3 px-3 font-semibold hover:text-gray-800 hover:outline-blue-500 bg-blue-500 text-white rounded-se-full p-1",
    },
    {
      type: "heading",
      text: "CATALOG",
    },
    {
      type: "link",
      text: "Products",
      icon: "FaArchive",
      href: "/products",
      className:
        "text-neutral-800 mb-3 px-3 font-semibold outline outline-slate-400 rounded-se-xl p-1 hover:text-blue-500 hover:outline-blue-500",
    },
    {
      type: "heading",
      text: "SALE",
    },
    {
      type: "link",
      text: "Orders",
      icon: "FaBox",
      href: "/orders",
      className:
        "text-neutral-800 mb-3 px-3 font-semibold outline outline-slate-400 rounded-ee-xl p-1 hover:text-blue-500 hover:outline-blue-500",
    },
    {
      type: "heading",
      text: "CUSTOMER MANAGEMENT",
    },
    {
      type: "link",
      text: "Customers",
      icon: "FaUserFriends",
      href: "/customers",
      className:
        "text-neutral-800 mb-3 mr-3 lg:mr-7 px-3 font-semibold outline outline-slate-400 rounded-ee-full p-1 hover:text-blue-500 hover:outline-blue-500",
    },
    {
      type: "link",
      text: "Settings",
      icon: "FaCog",
      href: "/settings",
      className: "text-2x text-neutral-800 mt-7 -ml-3 hover:text-blue-500",
    },
  ],
};
