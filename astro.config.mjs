import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// import starlightLinksValidator from 'starlight-links-validator';
// import starlightUtils from '@lorenzo_lewis/starlight-utils';
// import markdoc from '@astrojs/markdoc';
import remarkExternalLinks from 'remark-external-links';
import vercel from '@astrojs/vercel/serverless';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [
    starlight({
      title: 'NUS GenAI Policy Project',
      customCss: [
        './src/styles/custom.css'
      ],
/*       sidebar: [
        {
          label: 'Home',
          link: 'index.md',
        },
        {
          label: 'GenAI Policy',
          link: 'gen-ai-policy.md',
        },
      ], */
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/js/nutshell.js',
            defer: true,
          }
        },
        {
          tag: 'script',
          attrs: {
            src: '/nutshell-config.js',
            defer: true,
          }
        },
		{
			tag: 'script',
			attrs: {
				src: 'https://cloud.umami.is/script.js',
				'data-website-id': 'ad46b4c6-2325-432f-b07f-63da639d28dd',
				defer: true,
				},
			},
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [
      [remarkExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🡕' }
        }
      ],
    ],
  },
});
