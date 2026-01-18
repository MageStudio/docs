import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Mage Documentation",
  description: "Documentation for Mage Engine and Mage Studio",

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Leckerli+One&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
        rel: "stylesheet",
      },
    ],
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-434GQWY0J2",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-434GQWY0J2');`,
    ],
  ],

  themeConfig: {
    logo: "/img/logo.png",
    siteTitle: "mage",

    nav: [
      { text: "Engine", link: "/engine/" },
      { text: "Editor", link: "/editor/" },
      { text: "GitHub", link: "https://github.com/MageStudio/Mage" },
    ],

    sidebar: {
      "/engine/": [
        {
          text: "Getting Started",
          collapsed: false,
          items: [
            {
              text: "1. Install",
              link: "/engine/getting-started/installing-mage-engine",
            },
            {
              text: "2. Project Setup",
              link: "/engine/getting-started/setting-up-your-project",
            },
            {
              text: "3. Creating the first Level",
              link: "/engine/getting-started/creating-first-level",
            },
            {
              text: "4. Hello Cube",
              link: "/engine/getting-started/hello-cube",
            },
            { text: "5. Camera", link: "/engine/getting-started/camera" },
            { text: "6. Scripts", link: "/engine/getting-started/scripts" },
            {
              text: "7. Handling Input",
              link: "/engine/getting-started/handling-input",
            },
            {
              text: "8. Applying Textures",
              link: "/engine/getting-started/applying-textures",
            },
            {
              text: "9. Lights and Skybox",
              link: "/engine/getting-started/lights_and_skybox",
            },
            { text: "10. Physics", link: "/engine/getting-started/physics" },
            {
              text: "11. Driving Around",
              link: "/engine/getting-started/driving_around",
            },
            { text: "12. UI", link: "/engine/getting-started/ui" },
            { text: "13. The End?", link: "/engine/getting-started/the_end" },
          ],
        },
        {
          text: "Advanced",
          collapsed: false,
          items: [
            { text: "Configuration", link: "/engine/advanced/configuration" },
            {
              text: "Core",
              collapsed: true,
              items: [
                { text: "Level", link: "/engine/advanced/core/level" },
                { text: "Entity", link: "/engine/advanced/core/entity" },
                { text: "Element", link: "/engine/advanced/core/element" },
                { text: "Stats", link: "/engine/advanced/core/stats" },
                {
                  text: "Base Elements",
                  collapsed: true,
                  items: [
                    { text: "Cube", link: "/engine/advanced/core/base/cube" },
                    { text: "Box", link: "/engine/advanced/core/base/box" },
                    {
                      text: "Sphere",
                      link: "/engine/advanced/core/base/sphere",
                    },
                    {
                      text: "Cylinder",
                      link: "/engine/advanced/core/base/cylinder",
                    },
                    { text: "Plane", link: "/engine/advanced/core/base/plane" },
                    { text: "Line", link: "/engine/advanced/core/base/line" },
                    {
                      text: "CurvedLine",
                      link: "/engine/advanced/core/base/curvedline",
                    },
                    { text: "Grid", link: "/engine/advanced/core/base/grid" },
                    {
                      text: "Sprite",
                      link: "/engine/advanced/core/base/sprite",
                    },
                    {
                      text: "AnimatedSprite",
                      link: "/engine/advanced/core/base/animatedsprite",
                    },
                  ],
                },
              ],
            },
            {
              text: "Input",
              collapsed: true,
              items: [
                { text: "Mouse", link: "/engine/advanced/input/mouse" },
                { text: "Keyboard", link: "/engine/advanced/input/keyboard" },
                { text: "Gamepad", link: "/engine/advanced/input/gamepad" },
                { text: "Mobile", link: "/engine/advanced/input/mobile" },
              ],
            },
            { text: "UI", link: "/engine/advanced/ui" },
            {
              text: "State Management",
              link: "/engine/advanced/state_management",
            },
            {
              text: "Lights",
              collapsed: true,
              items: [
                {
                  text: "AmbientLight",
                  link: "/engine/advanced/lights/ambientlight",
                },
                { text: "SunLight", link: "/engine/advanced/lights/sunlight" },
                {
                  text: "HemisphereLight",
                  link: "/engine/advanced/lights/hemispherelight",
                },
                {
                  text: "PointLight",
                  link: "/engine/advanced/lights/pointlight",
                },
              ],
            },
            {
              text: "Assets",
              collapsed: true,
              items: [
                {
                  text: "Loading Assets",
                  link: "/engine/advanced/assets/loading",
                },
                { text: "Audio", link: "/engine/advanced/assets/audio" },
                {
                  text: "Images and Textures",
                  link: "/engine/advanced/assets/images_and_textures",
                },
                { text: "Models", link: "/engine/advanced/assets/models" },
                { text: "Video", link: "/engine/advanced/assets/video" },
              ],
            },
            {
              text: "Controls",
              collapsed: true,
              items: [
                {
                  text: "First Person",
                  link: "/engine/advanced/controls/first",
                },
                {
                  text: "Third Person",
                  link: "/engine/advanced/controls/third",
                },
                { text: "Orbit", link: "/engine/advanced/controls/orbit" },
                {
                  text: "Transform",
                  link: "/engine/advanced/controls/transform",
                },
                { text: "Fly", link: "/engine/advanced/controls/fly" },
              ],
            },
            {
              text: "Scripting",
              collapsed: true,
              items: [
                { text: "Scripts", link: "/engine/advanced/scripting/scripts" },
                {
                  text: "Builtin Scripts",
                  collapsed: true,
                  items: [
                    {
                      text: "BaseCar",
                      link: "/engine/advanced/scripting/builtin/basecar",
                    },
                    {
                      text: "SmoothCarFollow",
                      link: "/engine/advanced/scripting/builtin/smoothcarfollow",
                    },
                    {
                      text: "Trails",
                      link: "/engine/advanced/scripting/builtin/trails",
                    },
                  ],
                },
              ],
            },
            {
              text: "Effects",
              collapsed: true,
              items: [
                {
                  text: "PostProcessing",
                  link: "/engine/advanced/effects/postprocessing",
                },
                {
                  text: "Particles",
                  link: "/engine/advanced/effects/particles",
                },
                {
                  text: "Scenery",
                  collapsed: true,
                  items: [
                    {
                      text: "Sky",
                      link: "/engine/advanced/effects/scenery/sky",
                    },
                  ],
                },
              ],
            },
            {
              text: "Utilities",
              collapsed: true,
              items: [
                { text: "Math", link: "/engine/utilities/math" },
                { text: "Features", link: "/engine/utilities/features" },
                { text: "Workers", link: "/engine/utilities/workers" },
              ],
            },
            { text: "Router", link: "/engine/advanced/router" },
            { text: "GameRunner", link: "/engine/advanced/gamerunner" },
            { text: "Animations", link: "/engine/advanced/animations" },
            { text: "State Machines", link: "/engine/advanced/state_machines" },
            { text: "Physics", link: "/engine/advanced/physics" },
            { text: "Bundling", link: "/engine/advanced/bundling" },
            { text: "Deploying", link: "/engine/advanced/deploy" },
          ],
        },
        {
          text: "Changelog",
          link: "/engine/changelog",
        },
      ],
      "/editor/": [
        {
          text: "Editor",
          items: [
            { text: "Introduction", link: "/editor/" },
            { text: "Changelog", link: "/editor/changelog" },
          ],
        },
      ],
    },

    search: {
      provider: "local",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/MageStudio/Mage" },
    ],

    footer: {
      copyright: "Copyright © 2026 Mage Studio",
    },
  },
});
