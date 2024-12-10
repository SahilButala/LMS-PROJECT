
export const RegisterFormControls = [
  {
    name: "name",
    label: "name",
    placeholder: "Enter your name here",
    type: "text",
    componentType: "input",
  },
  {
    name: "email",
    label: "email",
    placeholder: "Enter your email here",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password here",
    type: "password",
    componentType: "input",
  },
];
export const SigneUpFormControls = [
  {
    name: "email",
    label: "email",
    placeholder: "Enter your email here",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password here",
    type: "password",
    componentType: "input",
  },
];
export const SigneInData = {
  email: "",
  password: "",
};
export const RegisterInData = {
  name: "",
  email: "",
  password: "",
};
// languages
export const languageOptions = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "chinese", label: "Chinese" },
  { id: "japanese", label: "Japanese" },
  { id: "korean", label: "Korean" },
  { id: "portuguese", label: "Portuguese" },
  { id: "arabic", label: "Arabic" },
  { id: "russian", label: "Russian" },
];
// levels of course
export const courseLevelOptions = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];
// course categories
export const courseCategories = [
  { id: "web-development", label: "Web Development" ,
    image : "https://thumbs.dreamstime.com/b/web-development-icon-trendy-flat-vector-white-background-programming-collection-illustration-can-be-use-mobile-eps-130326341.jpg"
  },
  { id: "backend-development", label: "Backend Development" ,
    image : "https://c8.alamy.com/comp/2DB193X/back-end-icon-simple-element-from-website-development-collection-filled-back-end-icon-for-templates-infographics-and-more-2DB193X.jpg"
  },
  { id: "data-science", label: "Data Science", 
    image : "https://img.freepik.com/premium-vector/data-science-logo-template_567288-95.jpg"
   },
  { id: "machine-learning", label: "Machine Learning" ,
    image : "https://www.vlrtraining.in/wp-content/uploads/2020/10/logo-deep-learning.png"
  },
  { id: "artificial-intelligence", label: "Artificial Intelligence" ,
    image : "https://thumbs.dreamstime.com/b/artificial-intelligence-ai-vector-logo-human-brain-machine-learning-concept-neural-deep-data-mining-another-modern-computer-149634765.jpg"
  },
  { id: "cloud-computing", label: "Cloud Computing" ,
    image : "https://static.vecteezy.com/system/resources/previews/006/030/600/non_2x/abstract-cloud-logo-blue-shape-cloud-computing-isolated-on-white-background-usable-for-business-and-technology-logos-flat-logo-design-template-element-vector.jpg"
  },
  { id: "cyber-security", label: "Cyber Security",  
    image : "https://static.vecteezy.com/system/resources/previews/004/394/859/non_2x/cyber-security-logo-concept-vector.jpg"
  },
  { id: "mobile-development", label: "Mobile Development" ,
    image : "https://www.a2solutions.ae/wp-content/uploads/2017/11/mobile-apps.png"
  },
  { id: "game-development", label: "Game Development",
    image : "https://c8.alamy.com/comp/2CB34D7/game-development-icon-simple-creative-element-filled-game-development-icon-for-templates-infographics-and-more-2CB34D7.jpg"
   },
  { id: "software-engineering", label: "Software Engineering" ,
    image : "https://static.vecteezy.com/system/resources/thumbnails/040/867/093/small_2x/technology-logo-computer-and-data-related-business-hi-tech-and-innovative-vector.jpg"
  },
];

// landing page controls
export const LandingPageFormControls = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter course title",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseCategories,
  },
  {
    name: "level",
    label: "Level",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseLevelOptions,
  },
  {
    name: "primaryLanguage",
    label: "Primary Language",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: languageOptions,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    componentType: "input",
    type: "text",
    placeholder: "Enter course subtitle",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course description",
  },
  {
    name: "pricing",
    label: "Pricing",
    componentType: "input",
    type: "number",
    placeholder: "Enter course pricing",
  },
  {
    name: "objectives",
    label: "Objectives",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course objectives",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    componentType: "textarea",
    placeholder: "Welcome message for students",
  },
];

// landing page data

export const LandingInitialFormData = {
  title: "",
  category: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
  image: "",
};

export const CurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
  },
];


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  primaryLanguage: languageOptions,
};